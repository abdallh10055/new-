import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame} from 'remotion';
import {C, H, W} from '../config';
import {Trans} from '../timeline';
import {eio, ease, clamp, rand} from '../lib/anim';
import {SfxF, SfxName} from './Sfx';

export const TRANS_LEN = 28;
const HALF = TRANS_LEN / 2;
const grad = `linear-gradient(135deg, ${C.bg1}, #0b2a66 55%, ${C.blue})`;
const sfxFor: Record<Trans, SfxName> = {iris: 'whoosh_big', slats: 'whoosh', diagonal: 'whoosh', glitch: 'glitch', mosaic: 'whoosh_soft', ring: 'impact', sweep: 'swish_up', hex: 'whoosh_big', doors: 'whoosh', none: 'tick'};

export const Transition: React.FC<{type: Trans; at: number}> = ({type, at}) => {
  const f = useCurrentFrame();
  if (type === 'none') return null;
  const a = eio(clamp(f / HALF)), b = eio(clamp((f - HALF) / HALF));
  const cover = f < HALF ? a : 1 - b;
  const sfx = <SfxF name={sfxFor[type]} frame={at - 6} vol={type === 'ring' ? 0.5 : 0.55} />;
  let body: React.ReactNode = null;
  switch (type) {
    case 'iris': {
      const R = 1500;
      body = (
        <svg width={W} height={H} style={{position: 'absolute', inset: 0}}>
          <defs>
            <linearGradient id="ig" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor={C.bg1} /><stop offset="1" stopColor="#0b3a8a" /></linearGradient>
            <mask id="im"><rect width={W} height={H} fill="#fff" />{f >= HALF && <circle cx={W / 2} cy={H / 2} r={b * R} fill="#000" />}</mask>
          </defs>
          {f < HALF ? <circle cx={W / 2} cy={H / 2} r={a * R} fill="url(#ig)" /> : <rect width={W} height={H} fill="url(#ig)" mask="url(#im)" />}
          <circle cx={W / 2} cy={H / 2} r={(f < HALF ? a : b) * R} fill="none" stroke={C.cyan} strokeWidth={10} opacity={0.9} />
          <circle cx={W / 2} cy={H / 2} r={Math.max(0, (f < HALF ? a : b) * R - 40)} fill="none" stroke="#fff" strokeWidth={3} opacity={0.5} />
        </svg>
      );
      break;
    }
    case 'slats': {
      const n = 10, w = W / n + 1;
      body = Array.from({length: n}).map((_, i) => {
        const d = i / n * 0.45;
        const pa = eio(clamp((f / HALF - d) / (1 - 0.45))), pb = eio(clamp(((f - HALF) / HALF - d) / (1 - 0.45)));
        const s = f < HALF ? pa : 1 - pb;
        return <div key={i} style={{position: 'absolute', left: W - (i + 1) * (W / n), top: 0, width: w, height: H, background: i % 2 ? grad : `linear-gradient(135deg, #0b2a66, ${C.cyan}66)`, transform: `scaleY(${s})`, transformOrigin: f < HALF ? 'top' : 'bottom', borderLeft: `2px solid ${C.cyan}88`}} />;
      });
      break;
    }
    case 'diagonal': {
      const n = 8, h = H * 1.6 / n + 1;
      body = (
        <div style={{position: 'absolute', left: -W * 0.3, top: -H * 0.3, width: W * 1.6, height: H * 1.6, transform: 'rotate(-14deg)'}}>
          {Array.from({length: n}).map((_, i) => {
            const d = i / n * 0.4; const dir = i % 2 ? 1 : -1;
            const pa = eio(clamp((f / HALF - d) / 0.6)), pb = eio(clamp(((f - HALF) / HALF - d) / 0.6));
            const x = f < HALF ? (1 - pa) * dir * 100 : -pb * dir * 100;
            return <div key={i} style={{position: 'absolute', left: 0, top: i * (h - 1), width: '100%', height: h, background: i % 3 === 0 ? `linear-gradient(90deg, ${C.blue}, ${C.cyan})` : grad, transform: `translateX(${x}%)`, borderTop: '3px solid #ffffff55'}} />;
          })}
        </div>
      );
      break;
    }
    case 'glitch': {
      const op = Math.sin(clamp(f / TRANS_LEN) * Math.PI);
      body = (
        <>
          {Array.from({length: 16}).map((_, i) => {
            const s = f * 17 + i * 31; const y = rand(s) * H, hh = 8 + rand(s + 1) * 120, off = (rand(s + 2) - 0.5) * 360;
            return <div key={i} style={{position: 'absolute', left: off, top: y, width: W, height: hh, background: i % 3 === 0 ? '#ff2d9255' : i % 3 === 1 ? '#22d3ee66' : '#ffffff44', mixBlendMode: 'screen', opacity: op}} />;
          })}
          <AbsoluteFill style={{background: C.bg0, opacity: cover * 0.96}} />
          <AbsoluteFill style={{background: 'repeating-linear-gradient(0deg, #ffffff10 0 2px, transparent 2px 6px)', opacity: op}} />
          <AbsoluteFill style={{background: '#fff', opacity: f === HALF || f === HALF - 1 ? 0.7 : 0}} />
        </>
      );
      break;
    }
    case 'mosaic': {
      const cx = 16, cy = 9, cw = W / cx, ch = H / cy;
      body = Array.from({length: cx * cy}).map((_, i) => {
        const x = i % cx, y = Math.floor(i / cx); const d = (rand(i) * 0.6);
        const pa = eio(clamp((f / HALF - d) / 0.4)), pb = eio(clamp(((f - HALF) / HALF - d) / 0.4));
        const s = f < HALF ? pa : 1 - pb;
        return <div key={i} style={{position: 'absolute', left: x * cw - 1, top: y * ch - 1, width: cw + 2, height: ch + 2, transform: `scale(${s})`, background: (x + y) % 2 ? '#0b2a66' : '#0a1d4d', border: `1px solid ${C.cyan}55`}} />;
      });
      break;
    }
    case 'ring': {
      const t = f / TRANS_LEN;
      body = (
        <>
          <AbsoluteFill style={{background: `radial-gradient(circle at 50% 50%, #ffffffcc 0%, ${C.cyan}88 18%, ${C.bg1} 60%)`, opacity: Math.pow(cover, 1.5)}} />
          {[0, 0.12, 0.24].map((d, i) => {
            const r = ease(clamp((t - d) / 0.75)) * 1700;
            return <div key={i} style={{position: 'absolute', left: W / 2 - r, top: H / 2 - r, width: r * 2, height: r * 2, borderRadius: '50%', border: `${14 - i * 4}px solid ${i ? C.blue : C.cyan}`, opacity: 1 - clamp((t - d) / 0.75), boxShadow: `0 0 50px ${C.cyan}`}} />;
          })}
          {Array.from({length: 24}).map((_, i) => <div key={i} style={{position: 'absolute', left: W / 2, top: H / 2, width: 1500, height: 3, background: `linear-gradient(90deg, #fff, transparent)`, transformOrigin: '0 50%', transform: `rotate(${i * 15}deg) scaleX(${cover})`, opacity: 0.7}} />)}
        </>
      );
      break;
    }
    case 'sweep': {
      const x = f < HALF ? (1 - a) * 120 : -b * 120;
      body = (
        <div style={{position: 'absolute', left: '-20%', top: '-20%', width: '140%', height: '140%', transform: `translateX(${x}%) skewX(-18deg)`, background: `linear-gradient(90deg, ${C.cyan}, #0b2a66 12%, ${C.bg1} 60%, #0b2a66 88%, ${C.cyan})`, boxShadow: `0 0 120px ${C.cyan}`}}>
          <Img src={staticFile('img/emblem.png')} style={{position: 'absolute', left: '50%', top: '50%', height: 380, transform: 'translate(-50%,-50%) skewX(18deg)', opacity: 0.9}} />
        </div>
      );
      break;
    }
    case 'hex': {
      const R = 1400; const r = (f < HALF ? a : b) * R;
      const pts = Array.from({length: 6}).map((_, i) => `${W / 2 + Math.cos(i * Math.PI / 3 + Math.PI / 6) * r},${H / 2 + Math.sin(i * Math.PI / 3 + Math.PI / 6) * r}`).join(' ');
      body = (
        <svg width={W} height={H} style={{position: 'absolute', inset: 0}}>
          <defs>
            <linearGradient id="hg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stopColor="#0b2a66" /><stop offset="1" stopColor={C.bg0} /></linearGradient>
            <mask id="hm"><rect width={W} height={H} fill="#fff" /><polygon points={pts} fill="#000" /></mask>
          </defs>
          {f < HALF ? <polygon points={pts} fill="url(#hg)" /> : <rect width={W} height={H} fill="url(#hg)" mask="url(#hm)" />}
          <polygon points={pts} fill="none" stroke={C.cyan} strokeWidth={8} />
        </svg>
      );
      break;
    }
    case 'doors': {
      const x = f < HALF ? (1 - a) * 100 : b * 100;
      const c = f < HALF ? 0 : 1;
      body = (
        <>
          <div style={{position: 'absolute', left: 0, top: 0, width: W / 2 + 1, height: H, background: grad, transform: `translateX(${-x}%)`, borderRight: `6px solid ${C.cyan}`, boxShadow: `0 0 60px ${C.cyan}88`}} />
          <div style={{position: 'absolute', right: 0, top: 0, width: W / 2 + 1, height: H, background: grad, transform: `translateX(${x}%)`, borderLeft: `6px solid ${C.cyan}`, boxShadow: `0 0 60px ${C.cyan}88`}} />
          <Img src={staticFile('img/emblem.png')} style={{position: 'absolute', left: W / 2 - 160, top: H / 2 - 168, height: 336, opacity: cover > 0.95 ? 1 : 0, transform: `scale(${0.9 + cover * 0.1 + c * 0})`}} />
        </>
      );
      break;
    }
  }
  return <AbsoluteFill style={{pointerEvents: 'none'}}>{sfx}{body}</AbsoluteFill>;
};
