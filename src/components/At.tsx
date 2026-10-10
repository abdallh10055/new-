import React from 'react';
import {useCue} from '../lib/ctx';
import {ease, sp, prog, lerp} from '../lib/anim';
import {Sfx, SfxName} from './Sfx';

export type AnimKind = 'up' | 'down' | 'left' | 'right' | 'pop' | 'fade' | 'blur' | 'zoom' | 'flip' | 'drop' | 'wipe' | 'none';
interface P {
  sec: number; out?: number; anim?: AnimKind; delay?: number; dur?: number; dist?: number;
  sfx?: SfxName; sfxVol?: number; style?: React.CSSProperties; children?: React.ReactNode; exit?: AnimKind;
}
/** Enters at audio-second `sec` (optionally exits at `out`). The workhorse of every scene. */
export const At: React.FC<P> = ({sec: s, out, anim = 'up', delay = 0, dur = 22, dist = 70, sfx, sfxVol, style, children, exit = 'fade'}) => {
  const el = useCue(s) - delay;
  const ex = out !== undefined ? useCue(out) : -999;
  const EX = 14;
  const showSfx = sfx ? <Sfx name={sfx} at={s} offset={delay} vol={sfxVol ?? 0.5} /> : null;
  if (el < 0 || ex > EX) return <>{showSfx}</>;
  let p = ease(prog(el, dur));
  let o = p, tx = 0, ty = 0, sc = 1, rot = 0, bl = 0, rx = 0, clip: string | undefined;
  switch (anim) {
    case 'up': ty = (1 - p) * dist; break;
    case 'down': ty = -(1 - p) * dist; break;
    case 'left': tx = -(1 - p) * dist; break;
    case 'right': tx = (1 - p) * dist; break;
    case 'pop': { const q = sp(el, 11, 170, 0.7); sc = lerp(0.2, 1, q); o = Math.min(1, el / 5); break; }
    case 'zoom': sc = lerp(1.5, 1, p); bl = (1 - p) * 14; break;
    case 'blur': bl = (1 - p) * 22; ty = (1 - p) * 24; break;
    case 'flip': rx = (1 - p) * -90; o = Math.min(1, p * 2); break;
    case 'drop': { const q = sp(el, 9, 120, 1); ty = -(1 - q) * dist * 2.2; o = Math.min(1, el / 4); rot = (1 - q) * -6; break; }
    case 'wipe': clip = `inset(0 0 0 ${(1 - p) * 100}%)`; o = 1; break;
    default: break;
  }
  if (ex > 0) {
    const q = ease(ex / EX); o *= 1 - q;
    if (exit === 'zoom') sc *= 1 + q * 0.25;
    else if (exit === 'up') ty -= q * 50;
    else if (exit === 'down') ty += q * 50;
    else if (exit === 'left') tx -= q * 120;
    else if (exit === 'right') tx += q * 120;
    else if (exit === 'blur') bl += q * 18;
    else sc *= 1 - q * 0.04;
  }
  const t = `translate(${tx}px, ${ty}px) scale(${sc}) rotate(${rot}deg)` + (anim === 'flip' ? ` perspective(900px) rotateX(${rx}deg)` : '');
  return (
    <>
      {showSfx}
      <div style={{opacity: o, transform: t, filter: bl > 0.3 ? `blur(${bl}px)` : undefined, clipPath: clip, willChange: 'transform, opacity', ...style}}>{children}</div>
    </>
  );
};
/** Full-size timed sub-scene: mounted only between `sec` and `out`. */
export const Beat: React.FC<Omit<P, 'style'> & {style?: React.CSSProperties; center?: boolean}> = ({style, center = true, ...rest}) => (
  <At {...rest} style={{position: 'absolute', inset: 0, ...(center ? {display: 'flex', alignItems: 'center', justifyContent: 'center'} : {}), ...style}} />
);
