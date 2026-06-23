import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { DEFAULT_PARAMS, type ShaderParams } from './shaderParams';

/**
 * VØID hero shader — the centerpiece.
 *
 * A single full-bleed fragment shader, hand-written GLSL, compositing the
 * Paper-Design-style layered stack into one oxblood field:
 *   1. Swirl       — a polar spiral of two-tone bands (angle * bandCount,
 *                    twisted by a bounded radial term).
 *   2. ChromaFlow  — slow directional wine bleed drifting across the field.
 *   3. FlutedGlass — angled reeded-glass ribs that refract the swirl, with
 *                    per-channel chromatic aberration, cylinder shading, and a
 *                    specular stroke down each rib.
 *   4. FilmGrain   — heavy animated grain, regenerated per frame.
 * The result is framed into the center of the viewport (inset), leaving a
 * black "void" margin around it.
 *
 * Every visual constant is driven by a uniform so the dev control panel
 * (ShaderControls) can tune it live. Bake tuned values into DEFAULT_PARAMS.
 *
 * Performance & resilience: pixel ratio capped (lower on mobile); rAF pauses
 * via IntersectionObserver when scrolled away; reduced motion renders one still
 * frame; WebGL failure drops the canvas so the parent gradient shows through.
 */

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  varying vec2 vUv;
  uniform float uTime;
  uniform vec2  uResolution;

  uniform float uInset, uFeather, uScale;
  uniform float uBands, uTwist, uSwirlSpeed, uCenterX, uCenterY;
  uniform float uFreq, uAngle, uRefraction, uAberration, uFluteSpeed, uHighlight, uRibShade;
  uniform float uBleed, uExposure, uGrain, uVignette;

  const float PI     = 3.14159265359;
  const float TWO_PI = 6.28318530718;

  // ---- Oxblood palette (normalized sRGB, matching the brand hexes) ----
  const vec3 BG           = vec3(0.0392, 0.0196, 0.0235); // #0a0506 near-black
  const vec3 OXBLOOD_DEEP = vec3(0.3608, 0.0627, 0.0941); // #5c1018 deep oxblood
  const vec3 WINE         = vec3(0.4784, 0.0784, 0.1255); // #7a1420 wine accent

  float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  // ---- Swirl: a polar spiral of two-tone bands. The center sits off-canvas
  // so we read sweeping arcs, not a bullseye. Bounded radial term -> no
  // singularity / moiré at the center. ----
  float swirlShape(vec2 p) {
    float l = length(p) + 1e-4;
    float a = atan(p.y, p.x);
    float offset = uBands * a / TWO_PI + uTwist * 0.9 / (l + 0.45) - uTime * uSwirlSpeed;
    float s = fract(offset);
    s = 1.0 - abs(2.0 * s - 1.0);   // triangle wave 0->1->0
    return smoothstep(0.0, 1.0, s); // softness
  }

  // Map the band shape to the oxblood ramp, biased dark and expensive.
  vec3 swirlColor(float s) {
    vec3 c = mix(BG, OXBLOOD_DEEP, smoothstep(0.16, 0.74, s));
    c = mix(c, WINE, smoothstep(0.74, 0.99, s));
    c = mix(vec3(0.0), c, smoothstep(0.02, 0.46, s)); // crush the floors
    return c;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    vec2 suv = uv;
    suv.x *= aspect;

    // Zoom the pattern around the screen center.
    vec2 sc = vec2(aspect * 0.5, 0.5);
    suv = (suv - sc) / uScale + sc;

    vec2 p = suv - vec2(aspect * uCenterX, uCenterY);

    // ---- FlutedGlass: reeded ribs, angled, drifting slowly ----
    float ang = radians(uAngle);
    mat2 R  = mat2(cos(ang), -sin(ang), sin(ang), cos(ang));
    mat2 Ri = mat2(cos(ang),  sin(ang), -sin(ang), cos(ang));
    float fx    = (R * suv).x * uFreq + uTime * uFluteSpeed;
    float local = fract(fx) - 0.5;                  // -0.5..0.5 within each rib
    float bend  = -sin(local * PI) * uRefraction * 0.013;
    vec2 ddir   = Ri * vec2(1.0, 0.0);              // rib normal in suv space

    // ---- Chromatic aberration: per-channel refracted samples ----
    float ab = uAberration;
    float sR = swirlShape(p + ddir * bend * (1.0 + ab * 0.5));
    float sG = swirlShape(p + ddir * bend);
    float sB = swirlShape(p + ddir * bend * (1.0 - ab * 0.5));
    vec3 col = vec3(swirlColor(sR).r, swirlColor(sG).g, swirlColor(sB).b);

    // ---- ChromaFlow: slow directional wine bleed ----
    vec2 flowDir = normalize(vec2(0.3, -1.0));
    float bleed = swirlShape(p + flowDir * 0.22 + vec2(0.0, uTime * 0.015));
    col += OXBLOOD_DEEP * smoothstep(0.5, 0.95, bleed) * uBleed;

    // ---- Glass cylinder shading: bright rib centers, dark seams ----
    col *= mix(1.0 - uRibShade, 1.0 + uRibShade * 0.45, cos(local * PI));
    // Thin specular stroke down each rib. Use hl*hl, not pow() (negative base
    // is undefined / NaN in GLSL ES).
    float hl = (local - 0.14) / 0.085;
    col += WINE * exp(-hl * hl) * uHighlight;

    // ---- Vignette + exposure ----
    float vig = smoothstep(1.3, 0.18, length(uv - 0.5));
    col *= mix(uVignette, 1.0, vig);
    col *= uExposure;

    // ---- Inset frame: black void margin around the centered field ----
    vec2 dEdge = min(uv, 1.0 - uv);
    float edge = min(dEdge.x, dEdge.y);
    float mask = smoothstep(uInset - uFeather, uInset + uFeather, edge);
    col *= mask;

    // ---- FilmGrain: heavy, animated, regenerated per frame (inside frame) ----
    float grain = hash(gl_FragCoord.xy + fract(uTime) * 137.0) - 0.5;
    col += grain * uGrain * mask;

    col = max(col, 0.0);
    gl_FragColor = vec4(col, 1.0);
  }
`;

type UniformMap = { [key: string]: THREE.IUniform };

/** Push the React params object into the live THREE uniforms. */
function applyParams(u: UniformMap, p: ShaderParams) {
  u.uInset.value = p.inset;
  u.uFeather.value = p.feather;
  u.uScale.value = p.scale;
  u.uBands.value = p.bands;
  u.uTwist.value = p.twist;
  u.uSwirlSpeed.value = p.swirlSpeed;
  u.uCenterX.value = p.centerX;
  u.uCenterY.value = p.centerY;
  u.uFreq.value = p.freq;
  u.uAngle.value = p.angle;
  u.uRefraction.value = p.refraction;
  u.uAberration.value = p.aberration;
  u.uFluteSpeed.value = p.fluteSpeed;
  u.uHighlight.value = p.highlight;
  u.uRibShade.value = p.ribShade;
  u.uBleed.value = p.bleed;
  u.uExposure.value = p.exposure;
  u.uGrain.value = p.grain;
  u.uVignette.value = p.vignette;
}

interface ShaderProps {
  /** When true, render a single still frame and never animate. */
  reducedMotion: boolean;
  /** Live tunable parameters. Defaults to DEFAULT_PARAMS. */
  params?: ShaderParams;
}

function isMobile(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(max-width: 768px), (pointer: coarse)').matches;
}

export default function Shader({ reducedMotion, params = DEFAULT_PARAMS }: ShaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const uniformsRef = useRef<UniformMap | null>(null);
  const renderOnceRef = useRef<(() => void) | null>(null);
  // Keep latest params readable inside the mount effect without re-running it.
  const paramsRef = useRef(params);
  paramsRef.current = params;

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: false,
        alpha: false,
        powerPreference: 'high-performance',
        failIfMajorPerformanceCaveat: false,
      });
    } catch {
      setFailed(true);
      return;
    }

    const mobile = isMobile();
    const maxRatio = mobile ? 1.25 : 1.75;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, maxRatio));
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.domElement.style.display = 'block';
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const geometry = new THREE.PlaneGeometry(2, 2);

    // Build the uniform map, seeded from the current params.
    const uniforms: UniformMap = {
      uTime: { value: 0 },
      uResolution: {
        value: new THREE.Vector2(container.clientWidth, container.clientHeight),
      },
      uInset: { value: 0 },
      uFeather: { value: 0 },
      uScale: { value: 1 },
      uBands: { value: 0 },
      uTwist: { value: 0 },
      uSwirlSpeed: { value: 0 },
      uCenterX: { value: 0 },
      uCenterY: { value: 0 },
      uFreq: { value: 0 },
      uAngle: { value: 0 },
      uRefraction: { value: 0 },
      uAberration: { value: 0 },
      uFluteSpeed: { value: 0 },
      uHighlight: { value: 0 },
      uRibShade: { value: 0 },
      uBleed: { value: 0 },
      uExposure: { value: 0 },
      uGrain: { value: 0 },
      uVignette: { value: 0 },
    };
    applyParams(uniforms, paramsRef.current);
    uniformsRef.current = uniforms;

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      depthTest: false,
      depthWrite: false,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const resize = () => {
      const w = container.clientWidth;
      const h = container.clientHeight;
      renderer.setSize(w, h);
      uniforms.uResolution.value.set(w, h);
      if (reducedMotion) renderOnceRef.current?.();
    };
    window.addEventListener('resize', resize);

    let visible = true;
    const io = new IntersectionObserver(
      ([entry]) => {
        const wasVisible = visible;
        visible = entry.isIntersecting;
        if (visible && !wasVisible && !reducedMotion) loop();
      },
      { threshold: 0 }
    );
    io.observe(container);

    const onContextLost = (e: Event) => {
      e.preventDefault();
      cancelAnimationFrame(raf);
    };
    renderer.domElement.addEventListener('webglcontextlost', onContextLost);

    let raf = 0;
    const start = performance.now();

    const renderFrame = (elapsedSeconds: number) => {
      uniforms.uTime.value = elapsedSeconds;
      renderer.render(scene, camera);
    };
    // Lets the params effect re-render a still frame when motion is reduced.
    renderOnceRef.current = () => renderFrame(uniforms.uTime.value || 12.0);

    const loop = () => {
      if (!visible) return;
      renderFrame((performance.now() - start) / 1000);
      raf = requestAnimationFrame(loop);
    };

    if (reducedMotion) {
      renderFrame(12.0);
    } else {
      loop();
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      io.disconnect();
      renderer.domElement.removeEventListener('webglcontextlost', onContextLost);
      uniformsRef.current = null;
      renderOnceRef.current = null;
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [reducedMotion]);

  // Live-update uniforms when params change (no renderer teardown).
  useEffect(() => {
    if (!uniformsRef.current) return;
    applyParams(uniformsRef.current, params);
    if (reducedMotion) renderOnceRef.current?.();
  }, [params, reducedMotion]);

  if (failed) return null;

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className="absolute inset-0 h-full w-full"
    />
  );
}
