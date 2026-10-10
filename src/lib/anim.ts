import {Easing, interpolate, spring} from 'remotion';
import {FPS} from '../config';
export const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
export const eo = Easing.bezier(0.16, 1, 0.3, 1);        // expo-like out
export const eio = Easing.bezier(0.76, 0, 0.24, 1);      // strong in-out
export const ease = (x: number) => eo(clamp(x));
export const prog = (elapsed: number, dur: number) => clamp(elapsed / dur);
export const sp = (elapsed: number, damping = 13, stiffness = 140, mass = 0.8) =>
  elapsed < 0 ? 0 : spring({frame: elapsed, fps: FPS, config: {damping, stiffness, mass}});
export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const map = (v: number, a: number, b: number, c: number, d: number, e: (x: number) => number = eo) =>
  interpolate(v, [a, b], [c, d], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: e});
export const rand = (seed: number) => { const x = Math.sin(seed * 127.1 + 311.7) * 43758.5453; return x - Math.floor(x); };
export const sec = (s: number) => Math.round(s * FPS);
