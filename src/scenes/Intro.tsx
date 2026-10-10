import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame} from 'remotion';
import {C, FONT, H, W} from '../config';
import {ease, prog, sp, rand, map} from '../lib/anim';
import {SfxF} from '../components/Sfx';
import {Pulse} from '../components/ui';

/** 4-second logo sting (video-only gap). Cut points: riser -> impact at frame 48. */
export const Intro: React.FC = () => {
  const f = useCurrentFrame();
  const cx = W / 2, cy = 400, R = 250;
  const hit = 48;
  const conv = ease(prog(f, hit));
  const push = 1 + f * 0.0006;
  const el = f - hit;
  const em = sp(el, 10, 120, 0.9);
  const flash = el >= 0 ? Math.max(0, 1 - el / 12) : 0;
  const wm = ease(prog(el - 10, 22)), wm2 = ease(prog(el - 26, 22));
  const out = ease(prog(f - 104, 16));
  return (
    <AbsoluteFill style={{background: `radial-gradient(70% 70% at 50% 40%, #0b2a66, ${C.bg0})`, opacity: 1 - out * 0.0}}>
      <SfxF name="logo_sting" frame={0} vol={0.8} />
      <AbsoluteFill style={{transform: `scale(${push})`, transformOrigin: '50% 40%'}}>
        {Array.from({length: 70}).map((_, i) => {
          const a0 = rand(i) * Math.PI * 2, r0 = 700 + rand(i + 9) * 800, a1 = a0 + conv * 3.2;
          const r = R + (r0 - R) * (1 - conv) + (conv >= 1 ? 0 : 0);
          const x = cx + Math.cos(a1) * r, y = cy + Math.sin(a1) * r * 0.9;
          const vis = el < 0 ? 1 : Math.max(0, 1 - el / 10);
          return <div key={i} style={{position: 'absolute', left: x, top: y, width: 6 + rand(i + 3) * 8, height: 6 + rand(i + 3) * 8, borderRadius: '50%', background: i % 3 ? C.cyan : '#fff', boxShadow: `0 0 16px ${C.cyan}`, opacity: vis * (0.3 + conv * 0.7)}} />;
        })}
        {el >= 0 && (
          <div style={{position: 'absolute', left: cx - 190, top: cy - 200}}>
            <Img src={staticFile('img/emblem.png')} style={{height: 400, opacity: Math.min(1, el / 4), transform: `scale(${0.55 + em * 0.45}) rotate(${(1 - em) * -25}deg)`, filter: `drop-shadow(0 0 ${30 + flash * 60}px ${C.cyan})`}} />
            <div style={{position: 'absolute', left: 190, top: 200}}><Pulse color={C.cyan} size={560} n={2} period={60} /></div>
          </div>
        )}
        {el >= 0 && [0, 8, 16].map((d, i) => {
          const r = ease(prog(el - d, 34)) * 1400;
          return <div key={i} style={{position: 'absolute', left: cx - r, top: cy - r, width: r * 2, height: r * 2, borderRadius: '50%', border: `${10 - i * 3}px solid ${C.cyan}`, opacity: 1 - prog(el - d, 34)}} />;
        })}
        <div style={{position: 'absolute', left: cx - 330, top: 640, width: 660, overflow: 'hidden', clipPath: `inset(0 ${(1 - wm) * 50}% 0 ${(1 - wm) * 50}%)`, opacity: wm}}>
          <Img src={staticFile('img/wordmark.png')} style={{width: 660, filter: `drop-shadow(0 0 20px ${C.cyan}88)`}} />
        </div>
        <div dir="rtl" style={{position: 'absolute', left: 0, right: 0, top: 930, textAlign: 'center', fontFamily: FONT, fontSize: 40, fontWeight: 600, color: C.mute, opacity: wm2, transform: `translateY(${(1 - wm2) * 20}px)`}}>عبدالله قريطم</div>
      </AbsoluteFill>
      <AbsoluteFill style={{background: '#fff', opacity: flash * 0.55}} />
    </AbsoluteFill>
  );
};
