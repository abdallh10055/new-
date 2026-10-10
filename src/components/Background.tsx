import React from 'react';
import {AbsoluteFill, interpolateColors, useCurrentFrame} from 'remotion';
import {noise2D} from '@remotion/noise';
import {audioSecAt, C, FPS, H, W} from '../config';
import {CHAPTERS, chapterAt} from '../timeline';
import {rand} from '../lib/anim';

const N = 64;
export const Background: React.FC = () => {
  const f = useCurrentFrame();
  const t = f / FPS;
  const a = audioSecAt(f);
  const i = chapterAt(a);
  const cur = CHAPTERS[i];
  const prev = CHAPTERS[Math.max(0, i - 1)];
  const k = Math.min(1, (a - cur.start) / 2.5);
  const c1 = interpolateColors(k, [0, 1], [prev.color, cur.color]);
  const c2 = interpolateColors(k, [0, 1], [prev.color2, cur.color2]);
  const blob = (seed: number, size: number, col: string, op: number) => {
    const x = W / 2 + noise2D('bx' + seed, t * 0.07, seed) * W * 0.42;
    const y = H / 2 + noise2D('by' + seed, seed, t * 0.07) * H * 0.4;
    return <div key={seed} style={{position: 'absolute', left: x - size / 2, top: y - size / 2, width: size, height: size, borderRadius: '50%',
      background: `radial-gradient(circle, ${col} 0%, transparent 68%)`, opacity: op}} />;
  };
  return (
    <AbsoluteFill style={{background: `radial-gradient(120% 90% at 50% 20%, ${C.bg2} 0%, ${C.bg1} 45%, ${C.bg0} 100%)`}}>
      {blob(1, 1300, c1, 0.2)}{blob(2, 1100, c2, 0.17)}{blob(3, 900, C.violet, 0.1)}
      <AbsoluteFill style={{
        backgroundImage: `linear-gradient(${C.cyan}14 1px, transparent 1px), linear-gradient(90deg, ${C.cyan}14 1px, transparent 1px)`,
        backgroundSize: '96px 96px', backgroundPosition: `${(t * 6) % 96}px ${(t * 3) % 96}px`,
        WebkitMaskImage: 'radial-gradient(70% 70% at 50% 50%, #000 0%, transparent 100%)', maskImage: 'radial-gradient(70% 70% at 50% 50%, #000 0%, transparent 100%)', opacity: 0.55}} />
      {Array.from({length: N}).map((_, j) => {
        const sp = 8 + rand(j) * 26, x = rand(j + 50) * W, size = 2 + rand(j + 9) * 4;
        const y = H + 20 - ((t * sp + rand(j + 77) * H * 1.3) % (H + 40));
        const dx = noise2D('p' + j, t * 0.3, j) * 40;
        const tw = 0.35 + 0.65 * Math.abs(Math.sin(t * (0.6 + rand(j + 3)) + j));
        return <div key={j} style={{position: 'absolute', left: x + dx, top: y, width: size, height: size, borderRadius: '50%', background: j % 5 === 0 ? c1 : '#bfeaff', opacity: tw * (size > 4 ? 0.5 : 0.35), boxShadow: size > 4 ? `0 0 12px ${c1}` : undefined}} />;
      })}
      <AbsoluteFill style={{background: 'radial-gradient(90% 90% at 50% 50%, transparent 55%, #000a 100%)'}} />
    </AbsoluteFill>
  );
};
