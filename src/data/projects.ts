import {
  seleneShader,
  vestaShader,
  heliosShader,
  type ShaderConfig,
} from '../shaders/shaderConfigs';

/**
 * The Work index. Each project is a celestial body born out of the void, with
 * its own Paper-Design shader background. To add one: append an entry and give
 * it a shader config in shaders/shaderConfigs.ts.
 */
export interface Project {
  name: string;
  meta: string[]; // rendered as stacked lines on the right
  shader: ShaderConfig; // its celestial-body background
}

export const projects: Project[] = [
  {
    name: 'Selene',
    meta: ['Fintech rebrand', '+ design system'],
    shader: seleneShader,
  },
  {
    name: 'Vesta',
    meta: ['Editorial CMS', '+ web platform'],
    shader: vestaShader,
  },
  {
    name: 'Helios',
    meta: ['Brand identity', '+ motion'],
    shader: heliosShader,
  },
];
