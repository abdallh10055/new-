import React from 'react';
import {AbsoluteFill, Img, staticFile, useCurrentFrame} from 'remotion';
import {audioSecAt, C, CHANNEL, FONT, FPS, H, W} from '../config';
import {CHAPTERS, chapterAt} from '../timeline';
import {ease, sp, map, clamp} from '../lib/anim';
import {SfxF} from './Sfx';

/** Elegant progress bar with chapter ticks (bottom). */
export const ProgressBar: React.FC<{total: number}> = ({total}) => {
  const f = useCurrentFrame();
  const startF = (36.7 + 4) * FPS;
  const p = clamp((f - startF) / (total - startF));
  const i = chapterAt(audioSecAt(f));
  const col = CHAPTERS[i].color;
  const vis = map(f, startF, startF + 25, 0, 1);
  const endFade = map(f, total - 80, total - 40, 1, 0);
  return (
    <div style={{position: 'absolute', left: 0, right: 0, bottom: 0, height: 10, opacity: vis * endFade}}>
      <div style={{position: 'absolute', inset: 0, background: '#ffffff12'}} />
      <div style={{position: 'absolute', right: 0, top: 0, bottom: 0, width: `${p * 100}%`, background: `linear-gradient(270deg, ${col}, ${C.blue})`, boxShadow: `0 0 18px ${col}`}} />
      {CHAPTERS.slice(1).map((c) => {
        const x = ((c.start + 4) * FPS - startF) / (total - startF);
        return <div key={c.id} style={{position: 'absolute', right: `${x * 100}%`, top: -4, width: 3, height: 18, background: x < p ? '#fff' : '#ffffff55', borderRadius: 2}} />;
      })}
      <div style={{position: 'absolute', right: `${p * 100}%`, top: -5, width: 20, height: 20, borderRadius: '50%', background: '#fff', boxShadow: `0 0 20px 6px ${col}`, transform: 'translateX(50%)'}} />
    </div>
  );
};

/** Chapter chip (top-right) that swaps with a slide when the chapter changes. */
export const ChapterChip: React.FC<{total: number}> = ({total}) => {
  const f = useCurrentFrame();
  const a = audioSecAt(f);
  const i = chapterAt(a);
  const c = CHAPTERS[i];
  const cf = (c.start >= 36.7 ? c.start + 4 : c.start) * FPS;
  const el = f - cf;
  const startF = (36.7 + 4) * FPS;
  const vis = map(f, startF + 10, startF + 35, 0, 1) * map(f, total - 100, total - 60, 1, 0);
  const p = ease(el / 24);
  return (
    <div dir="rtl" style={{position: 'absolute', top: 44, right: 56, opacity: vis, transform: `translateY(${(1 - p) * -16}px)`, display: 'flex', alignItems: 'center', gap: 14,
      padding: '10px 26px 10px 22px', borderRadius: 999, background: '#0a1a3acc', border: `1.5px solid ${c.color}88`, boxShadow: `0 0 28px ${c.color}33`, fontFamily: FONT, fontWeight: 700, fontSize: 30, color: C.text}}>
      <span style={{width: 14, height: 14, borderRadius: '50%', background: c.color, boxShadow: `0 0 14px ${c.color}`}} />
      {c.label}
    </div>
  );
};

/** Small channel watermark (top-left). */
export const Watermark: React.FC<{total: number}> = ({total}) => {
  const f = useCurrentFrame();
  const startF = (36.7 + 4) * FPS;
  const vis = map(f, startF + 30, startF + 60, 0, 0.9) * map(f, total - 100, total - 60, 1, 0);
  return <Img src={staticFile('img/emblem.png')} style={{position: 'absolute', top: 30, left: 50, height: 92, opacity: vis}} />;
};

/** Lower third with channel name – shown at absolute audio seconds. */
export const LowerThird: React.FC<{at: number; dur?: number}> = ({at, dur = 5.5}) => {
  const f = useCurrentFrame();
  const s = Math.round(at * FPS) + (at >= 36.7 ? 4 * FPS : 0);
  const el = f - s;
  if (el < 0 || el > dur * FPS) return null;
  const pin = ease(el / 22), pout = ease((el - (dur * FPS - 18)) / 18);
  const w = 760 * pin;
  return (
    <>
    <SfxF name="whoosh_soft" frame={s} vol={0.35} />
    <div style={{position: 'absolute', left: 60, bottom: 90, width: 760, height: 120, opacity: 1 - pout, transform: `translateX(${-pout * 300}px)`}}>
      <div style={{position: 'absolute', left: 0, top: 0, width: w, height: 120, borderRadius: 18, overflow: 'hidden', background: 'linear-gradient(90deg,#0b1d4aee,#0a1630dd)', border: `1.5px solid ${C.cyan}77`, boxShadow: `0 0 40px ${C.cyan}33`}}>
        <div style={{position: 'absolute', left: 0, top: 0, bottom: 0, width: 8, background: `linear-gradient(${C.cyan},${C.blue})`}} />
        <div style={{position: 'absolute', left: -60 + el * 22, top: 0, width: 50, height: '100%', background: '#ffffff30', transform: 'skewX(-20deg)'}} />
        <div dir="rtl" style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', gap: 22, padding: '0 28px 0 28px', fontFamily: FONT, opacity: ease((el - 12) / 14), width: 760}}>
          <Img src={staticFile('img/emblem.png')} style={{height: 96}} />
          <div>
            <div style={{fontSize: 46, fontWeight: 800, color: C.text, lineHeight: 1.1}}>{CHANNEL.owner}</div>
            <div style={{fontSize: 30, fontWeight: 600, color: C.cyan}}>قناة {CHANNEL.ar} | {CHANNEL.en}</div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

/** Mid-roll subscribe toast (bottom-right). */
export const SubToast: React.FC<{at: number}> = ({at}) => {
  const f = useCurrentFrame();
  const s = Math.round(at * FPS) + 4 * FPS;
  const el = f - s; const dur = 120;
  if (el < 0 || el > dur) return null;
  const pin = sp(el, 12, 150), pout = ease((el - (dur - 16)) / 16);
  const click = el > 48;
  return (
    <>
    <SfxF name="pop" frame={s} vol={0.4} /><SfxF name="click" frame={s + 48} vol={0.5} /><SfxF name="bell" frame={s + 54} vol={0.35} />
    <div dir="rtl" style={{position: 'absolute', right: 56, bottom: 84, transform: `translateY(${(1 - pin) * 140 + pout * 160}px) scale(${click && el < 56 ? 0.94 : 1})`, opacity: 1 - pout,
      display: 'flex', alignItems: 'center', gap: 18, padding: '16px 26px', borderRadius: 20, background: '#0a1630ee', border: `1.5px solid ${C.red}99`, fontFamily: FONT, boxShadow: `0 0 40px ${C.red}44`}}>
      <Img src={staticFile('img/emblem.png')} style={{height: 70}} />
      <div style={{fontSize: 30, fontWeight: 700, color: C.text}}>استفدت؟</div>
      <div style={{fontSize: 30, fontWeight: 800, color: '#fff', background: click ? '#2a3a5a' : C.red, padding: '8px 26px', borderRadius: 12, transition: 'none'}}>{click ? 'تم الاشتراك ✓' : 'اشترك'}</div>
      <div style={{fontSize: 38, transform: `rotate(${click ? Math.sin((el - 54) * 0.8) * 22 * Math.max(0, 1 - (el - 54) / 40) : 0}deg)`}}>🔔</div>
    </div>
    </>
  );
};
