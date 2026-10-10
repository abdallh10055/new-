import React, {createContext, useContext} from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {noise2D} from '@remotion/noise';
import {useScene, cueFrame} from '../lib/ctx';
import {eio, ease, lerp, clamp} from '../lib/anim';
import {FPS} from '../config';

export interface Punch {at: number; until?: number; s: number; fx?: number; fy?: number; rot?: number; rise?: number}
interface CamKey {s?: number; x?: number; y?: number; rot?: number}
const CamCtx = createContext({x: 0, y: 0, s: 1});
/** Ken Burns drift + cue-driven punch-in/pan + subtle handheld shake. */
export const Camera: React.FC<{from?: CamKey; to?: CamKey; punches?: Punch[]; shake?: number; children: React.ReactNode}> = ({
  from = {s: 1.0, x: 0, y: 0}, to = {s: 1.06, x: -16, y: -8}, punches = [], shake = 1, children,
}) => {
  const f = useCurrentFrame();
  const {start, dur} = useScene();
  const k = eio(clamp(f / dur));
  let s = lerp(from.s ?? 1, to.s ?? 1, k), x = lerp(from.x ?? 0, to.x ?? 0, k), y = lerp(from.y ?? 0, to.y ?? 0, k), rot = lerp(from.rot ?? 0, to.rot ?? 0, k);
  for (const p of punches) {
    const a = cueFrame(p.at, start); const rise = p.rise ?? 16; const u = cueFrame(p.until ?? p.at + 3.2, start);
    const w = ease((f - a) / rise) * (1 - ease((f - u) / 20));
    if (w <= 0) continue;
    const ds = (p.s - 1) * w;
    s += ds; x += -(p.fx ?? 0) * ds; y += -(p.fy ?? 0) * ds; rot += (p.rot ?? 0) * w;
  }
  const t = f / FPS;
  const nx = noise2D('cx', t * 0.6, 0) * 5 * shake, ny = noise2D('cy', 0, t * 0.6) * 4 * shake, nr = noise2D('cr', t * 0.4, 3) * 0.18 * shake;
  return (
    <CamCtx.Provider value={{x, y, s}}>
      <AbsoluteFill style={{transform: `translate(${x + nx}px, ${y + ny}px) scale(${s}) rotate(${rot + nr}deg)`, transformOrigin: '50% 50%'}}>{children}</AbsoluteFill>
    </CamCtx.Provider>
  );
};
/** Parallax layer: z<1 = far (moves less), z>1 = near. */
export const Depth: React.FC<{z: number; children: React.ReactNode; style?: React.CSSProperties}> = ({z, children, style}) => {
  const {x, y, s} = useContext(CamCtx);
  return (
    <div style={{position: 'absolute', inset: 0, transform: `translate(${-(1 - z) * x}px, ${-(1 - z) * y}px) scale(${Math.pow(s, z - 1)})`, ...style}}>{children}</div>
  );
};
