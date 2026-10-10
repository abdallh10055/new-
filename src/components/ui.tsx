import React from 'react';
import {Img, staticFile, useCurrentFrame} from 'remotion';
import type {LucideIcon} from 'lucide-react';
import {C, FONT, FONT_LATIN, FPS, H, W} from '../config';
import {useCue, useScene} from '../lib/ctx';
import {ease, prog, sp, map, clamp, rand} from '../lib/anim';

type CSS = React.CSSProperties;
/** Arabic text block. dir=rtl, no letter-spacing (keeps Arabic joined). */
export const T: React.FC<{size?: number; w?: number; color?: string; align?: 'center' | 'right' | 'left'; style?: CSS; children?: React.ReactNode; latin?: boolean; lh?: number}> = ({size = 64, w = 700, color = C.text, align = 'center', style, children, latin, lh = 1.35}) => (
  <div dir={latin ? 'ltr' : 'rtl'} style={{fontFamily: latin ? FONT_LATIN : FONT, fontSize: size, fontWeight: w, color, textAlign: align, lineHeight: lh, ...style}}>{children}</div>
);
export const Glass: React.FC<{w?: number | string; h?: number | string; accent?: string; pad?: number; r?: number; style?: CSS; children?: React.ReactNode; strong?: boolean}> = ({w, h, accent, pad = 36, r = 30, style, children, strong}) => {
  const a = accent ?? useScene().accent;
  return (
    <div style={{width: w, height: h, padding: pad, borderRadius: r, background: strong ? `linear-gradient(145deg, #12306cf2, #0a1a40f5)` : 'linear-gradient(145deg, #16327299, #0a1a42d9)', border: `2px solid ${a}66`,
      boxShadow: `0 24px 70px #0009, 0 0 50px ${a}26, inset 0 1px 0 #ffffff26`, boxSizing: 'border-box', ...style}}>{children}</div>
  );
};
export const Ico: React.FC<{I: LucideIcon; size?: number; color?: string; sw?: number; glow?: boolean; style?: CSS}> = ({I, size = 90, color = C.cyan, sw = 1.8, glow = true, style}) => (
  <I size={size} color={color} strokeWidth={sw} style={{filter: glow ? `drop-shadow(0 0 ${size * 0.14}px ${color})` : undefined, ...style}} />
);
/** Icon in rounded glowing tile */
export const IconTile: React.FC<{I: LucideIcon; size?: number; color?: string; style?: CSS}> = ({I, size = 150, color = C.cyan, style}) => (
  <div style={{width: size, height: size, borderRadius: size * 0.28, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `linear-gradient(145deg, ${color}33, ${color}0d)`, border: `2px solid ${color}88`, boxShadow: `0 0 ${size * 0.35}px ${color}44, inset 0 0 ${size * 0.25}px ${color}22`, ...style}}>
    <Ico I={I} size={size * 0.52} color={color} />
  </div>
);
/** Inline highlighter that grows from the right (RTL) at cue. */
export const Hl: React.FC<{sec: number; color?: string; children: React.ReactNode; dur?: number; text?: string}> = ({sec, color = C.amber, children, dur = 16, text}) => {
  const p = ease(prog(useCue(sec), dur));
  return <span style={{backgroundImage: `linear-gradient(${color}55,${color}55)`, backgroundSize: `${p * 100}% 46%`, backgroundPosition: 'right 88%', backgroundRepeat: 'no-repeat', color: p > 0.3 ? (text ?? '#fff') : undefined, padding: '0 8px', borderRadius: 6}}>{children}</span>;
};
export const Col: React.FC<{sec: number; color?: string; children: React.ReactNode}> = ({sec, color = C.amber, children}) => {
  const p = ease(prog(useCue(sec), 10));
  return <span style={{color: p > 0.01 ? color : undefined, textShadow: p > 0.5 ? `0 0 28px ${color}88` : undefined}}>{children}</span>;
};
/** Word-by-word reveal; words may carry a highlight colour. */
export const Words: React.FC<{sec: number; words: (string | [string, string])[]; size?: number; w?: number; gap?: number; color?: string; align?: 'center' | 'right'; style?: CSS; anim?: 'up' | 'blur' | 'scale'}> = ({sec, words, size = 72, w = 800, gap = 4, color = C.text, align = 'center', style, anim = 'blur'}) => {
  const el0 = useCue(sec);
  return (
    <div dir="rtl" style={{fontFamily: FONT, fontSize: size, fontWeight: w, color, textAlign: align, lineHeight: 1.4, display: 'flex', flexWrap: 'wrap', justifyContent: align === 'center' ? 'center' : 'flex-start', columnGap: size * 0.28, maxWidth: 1640, margin: '0 auto', ...style}}>
      {words.map((wd, i) => {
        const [txt, col] = Array.isArray(wd) ? wd : [wd, undefined];
        const el = el0 - i * gap; const p = ease(prog(el, 18));
        return <span key={i} style={{display: 'inline-block', opacity: p, transform: anim === 'scale' ? `scale(${0.6 + p * 0.4})` : `translateY(${(1 - p) * 34}px)`, filter: anim === 'blur' && p < 1 ? `blur(${(1 - p) * 12}px)` : undefined, color: col, textShadow: col ? `0 0 30px ${col}77` : undefined}}>{txt}</span>;
      })}
    </div>
  );
};
/** Typewriter via right-to-left clip reveal (keeps Arabic shaping intact) + blinking cursor. */
export const Typewriter: React.FC<{sec: number; text: string; size?: number; w?: number; color?: string; dur?: number; cursor?: string; style?: CSS; align?: 'right' | 'center'}> = ({sec, text, size = 60, w = 700, color = C.text, dur = 50, cursor = C.cyan, style, align = 'right'}) => {
  const el = useCue(sec); const p = clamp(el / dur);
  if (el < 0) return null;
  return (
    <div style={{position: 'relative', display: 'inline-block', ...style}}>
      <div dir="rtl" style={{fontFamily: FONT, fontSize: size, fontWeight: w, color, textAlign: align, lineHeight: 1.4, whiteSpace: 'pre-line', clipPath: `inset(-10% 0 -10% ${(1 - p) * 100}%)`}}>{text}</div>
      {p < 1 || Math.floor(el / 8) % 2 === 0 ? <div style={{position: 'absolute', top: '12%', bottom: '12%', width: 5, right: `${p * 100}%`, background: cursor, boxShadow: `0 0 14px ${cursor}`, borderRadius: 3}} /> : null}
    </div>
  );
};
export const CountUp: React.FC<{sec: number; from?: number; to: number; dur?: number; suffix?: string; size?: number; color?: string; style?: CSS}> = ({sec, from = 0, to, dur = 40, suffix = '', size = 200, color = C.text, style}) => {
  const el = useCue(sec); const v = Math.round(from + (to - from) * ease(prog(el, dur)));
  if (el < 0) return null;
  return <T latin size={size} w={800} color={color} style={style}>{v}{suffix}</T>;
};
export const GlitchText: React.FC<{children: string; size?: number; color?: string; sec?: number; intensity?: number; style?: CSS}> = ({children, size = 120, color = C.text, sec = 0, intensity = 1, style}) => {
  const f = useCurrentFrame(); const el = useCue(sec); const active = (f % 40 < 5 || el < 10) ? intensity : 0;
  const o = active ? (rand(f) - 0.5) * 18 : 0;
  const base: CSS = {position: 'absolute', inset: 0, whiteSpace: 'nowrap'};
  return (
    <div style={{position: 'relative', ...style}}>
      <T size={size} color="transparent" style={{whiteSpace: 'nowrap'}}>{children}</T>
      {active ? <div style={{...base, transform: `translateX(${o}px)`, mixBlendMode: 'screen', opacity: 0.8}}><T size={size} color="#ff2d92" style={{whiteSpace: 'nowrap'}}>{children}</T></div> : null}
      {active ? <div style={{...base, transform: `translateX(${-o}px)`, mixBlendMode: 'screen', opacity: 0.8}}><T size={size} color={C.cyan} style={{whiteSpace: 'nowrap'}}>{children}</T></div> : null}
      <div style={base}><T size={size} color={color} style={{whiteSpace: 'nowrap'}}>{children}</T></div>
    </div>
  );
};
/** Gradient-text with moving shine. */
export const Shine: React.FC<{children: React.ReactNode; size?: number; colors?: [string, string]; style?: CSS; w?: number}> = ({children, size = 120, colors = [C.cyan, '#ffffff'], style, w = 900}) => {
  const f = useCurrentFrame();
  const x = (f * 2.2) % 300 - 100;
  return <div dir="rtl" style={{fontFamily: FONT, fontSize: size, fontWeight: w, lineHeight: 1.3, textAlign: 'center', backgroundImage: `linear-gradient(110deg, ${colors[0]} ${x - 30}%, ${colors[1]} ${x}%, ${colors[0]} ${x + 30}%)`, WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent', filter: `drop-shadow(0 0 24px ${colors[0]}66)`, ...style}}>{children}</div>;
};
export const Stamp: React.FC<{text: string; color?: string; rot?: number; size?: number}> = ({text, color = C.red, rot = -8, size = 64}) => (
  <div dir="rtl" style={{fontFamily: FONT, fontSize: size, fontWeight: 900, color, border: `7px solid ${color}`, borderRadius: 18, padding: '4px 34px', transform: `rotate(${rot}deg)`, background: `${color}18`, boxShadow: `0 0 40px ${color}55, inset 0 0 30px ${color}22`, textShadow: `0 0 18px ${color}`, whiteSpace: 'nowrap'}}>{text}</div>
);
/** Pulsing expanding rings centred on its parent. */
export const Pulse: React.FC<{color?: string; size?: number; n?: number; period?: number; style?: CSS}> = ({color = C.cyan, size = 400, n = 3, period = 70, style}) => {
  const f = useCurrentFrame();
  return (
    <div style={{position: 'absolute', width: size, height: size, left: '50%', top: '50%', marginLeft: -size / 2, marginTop: -size / 2, pointerEvents: 'none', ...style}}>
      {Array.from({length: n}).map((_, i) => {
        const p = ((f + i * period / n) % period) / period;
        return <div key={i} style={{position: 'absolute', inset: 0, borderRadius: '50%', border: `4px solid ${color}`, transform: `scale(${0.3 + p * 1.2})`, opacity: (1 - p) * 0.7}} />;
      })}
    </div>
  );
};
/** Draws a line (or curve) between two points at a cue, with flowing dots. Place inside a full-scene absolute container. */
export const Link: React.FC<{sec: number; x1: number; y1: number; x2: number; y2: number; color?: string; dur?: number; arrow?: boolean; curve?: number; width?: number; out?: number}> = ({sec, x1, y1, x2, y2, color = C.cyan, dur = 22, arrow = true, curve = 0, width = 6, out}) => {
  const f = useCurrentFrame(); const el = useCue(sec); const p = ease(prog(el, dur)); const eo = useCue(out ?? 1e6);
  if (el < 0 || eo > 0) return null;
  const mx = (x1 + x2) / 2 + curve, my = (y1 + y2) / 2 - curve;
  const d = `M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`;
  const ang = Math.atan2(y2 - my, x2 - mx) * 180 / Math.PI;
  const len = Math.hypot(x2 - x1, y2 - y1) * 1.2;
  return (
    <svg width={W} height={H} style={{position: 'absolute', left: 0, top: 0, overflow: 'visible', pointerEvents: 'none'}}>
      <path d={d} fill="none" stroke={color} strokeOpacity={0.25} strokeWidth={width} strokeLinecap="round" pathLength={1} strokeDasharray={1} strokeDashoffset={1 - p} />
      <path d={d} fill="none" stroke={color} strokeWidth={width} strokeLinecap="round" strokeDasharray="2 40" strokeDashoffset={-f * 1.8} opacity={p > 0.98 ? 1 : 0} style={{filter: `drop-shadow(0 0 8px ${color})`}} />
      {arrow && p > 0.9 ? <polygon points="0,-18 34,0 0,18" fill={color} transform={`translate(${x2} ${y2}) rotate(${ang})`} style={{filter: `drop-shadow(0 0 8px ${color})`}} /> : null}
    </svg>
  );
};
/** Big numbered section title with sweeping line + geometric frame. */
export const SectionTitle: React.FC<{sec: number; out?: number; num: string; kicker: string; title: string; sub?: string; I: LucideIcon; color?: string}> = ({sec, num, kicker, title, sub, I, color}) => {
  const {accent} = useScene(); const col = color ?? accent;
  const el = useCue(sec); const f = useCurrentFrame();
  if (el < 0) return null;
  const p = ease(prog(el, 26)), p2 = ease(prog(el - 8, 30)), p3 = ease(prog(el - 16, 26));
  return (
    <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
      <div style={{position: 'absolute', right: 150, top: 120, fontFamily: FONT_LATIN, fontWeight: 900, fontSize: 520, lineHeight: 1, color: 'transparent', WebkitTextStroke: `4px ${col}55`, opacity: p, transform: `translateX(${(1 - p) * 200}px)`}}>{num}</div>
      <div style={{position: 'absolute', left: 170, top: '50%', marginTop: -190, opacity: p, transform: `rotate(${f * 0.15}deg) scale(${0.6 + p * 0.4})`}}>
        <svg width={380} height={380} viewBox="0 0 380 380"><polygon points="190,10 360,100 360,280 190,370 20,280 20,100" fill="none" stroke={col} strokeWidth={4} opacity={0.5} /><polygon points="190,50 325,120 325,260 190,330 55,260 55,120" fill="none" stroke={col} strokeWidth={2} strokeDasharray="10 14" opacity={0.7} /></svg>
        <div style={{position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `rotate(${-f * 0.15}deg)`}}><Ico I={I} size={150} color={col} /></div>
      </div>
      <div style={{position: 'absolute', right: 180, width: 1150}}>
        <T size={46} w={700} color={col} align="right" style={{opacity: p, transform: `translateX(${(1 - p) * 80}px)`}}>{kicker}</T>
        <div style={{height: 6, width: `${p2 * 100}%`, background: `linear-gradient(270deg, ${col}, transparent)`, margin: '10px 0 18px', borderRadius: 3}} />
        <T size={108} w={900} align="right" lh={1.2} style={{opacity: p2, transform: `translateY(${(1 - p2) * 50}px)`, textShadow: `0 0 50px ${col}55`}}>{title}</T>
        {sub ? <T size={46} w={500} color={C.mute} align="right" style={{opacity: p3, marginTop: 16, transform: `translateY(${(1 - p3) * 30}px)`}} latin={/^[A-Za-z]/.test(sub)}>{sub}</T> : null}
      </div>
    </div>
  );
};
export const Logo: React.FC<{h?: number; style?: CSS}> = ({h = 300, style}) => <Img src={staticFile('img/emblem.png')} style={{height: h, ...style}} />;
