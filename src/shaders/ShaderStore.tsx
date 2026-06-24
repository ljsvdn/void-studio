import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { allShaderConfigs, type ParamValue, type ParamValues } from './shaderConfigs';

/**
 * Holds live params for every shader so a single dev tuner can drive them all.
 * In production the params just stay at their config defaults (the tuner is
 * stripped out), so this is effectively static there.
 */
interface Store {
  params: Record<string, ParamValues>;
  setParam: (id: string, key: string, value: ParamValue) => void;
  reset: (id: string) => void;
}

const ShaderCtx = createContext<Store | null>(null);

const buildDefaults = (): Record<string, ParamValues> =>
  Object.fromEntries(allShaderConfigs.map((c) => [c.id, { ...c.params }]));

export function ShaderProvider({ children }: { children: ReactNode }) {
  const [params, setParams] = useState<Record<string, ParamValues>>(buildDefaults);

  const store = useMemo<Store>(
    () => ({
      params,
      setParam: (id, key, value) =>
        setParams((prev) => ({ ...prev, [id]: { ...prev[id], [key]: value } })),
      reset: (id) => {
        const cfg = allShaderConfigs.find((c) => c.id === id);
        if (cfg) setParams((prev) => ({ ...prev, [id]: { ...cfg.params } }));
      },
    }),
    [params]
  );

  return <ShaderCtx.Provider value={store}>{children}</ShaderCtx.Provider>;
}

export function useShaderStore(): Store {
  const ctx = useContext(ShaderCtx);
  if (!ctx) throw new Error('useShaderStore must be used within ShaderProvider');
  return ctx;
}

export function useShaderParams(id: string): ParamValues {
  return useShaderStore().params[id];
}
