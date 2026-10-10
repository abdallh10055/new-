import React from 'react';
import {useCurrentFrame} from 'remotion';
import type {LucideIcon} from 'lucide-react';
import {C, FONT} from '../config';
import {useCue, useScene} from '../lib/ctx';
import {ease, prog, sp, clamp, rand} from '../lib/anim';
import {Glass, Ico, IconTile, T} from './ui';

type CSS = React.CSSProperties;
/** Justice scales; tilt in degrees (positive = right pan lower). */
export const Scales: React.FC<{tilt: number; size?: number; color?: string; left?: React.ReactNode; right?: React.ReactNode; style?: CSS}> = ({tilt, size = 700, color = C.cyan, left, right, style}) => {
  const L = 260, cx = 350, cy = 140; const r = tilt * Math.PI / 180;
  const lx = cx - L * Math.cos(r), ly = cy - L * Math.sin(r), rx = cx + L * Math.cos(r), ry = cy + L * Math.sin(r);
  const pan = (x: number, y: number) => <path d={`M ${x - 105} ${y + 175} Q ${x} ${y + 245} ${x + 105} ${y + 175} Z`} fill={`${color}33`} stroke={color} strokeWidth={4} />;
  const rope = (x: number, y: number) => <><line x1={x} y1={y} x2={x - 105} y2={y + 175} stroke={color} strokeWidth={3} /><line x1={x} y1={y} x2={x + 105} y2={y + 175} stroke={color} strokeWidth={3} /></>;
  return (
    <div style={{position: 'relative', width: 700, height: 520, transform: `scale(${size / 700})`, transformOrigin: 'center', ...style}}>
      <svg width={700} height={520} style={{position: 'absolute', inset: 0, overflow: 'visible', filter: `drop-shadow(0 0 14px ${color}88)`}}>
        <line x1={cx} y1={cy} x2={cx} y2={470} stroke={color} strokeWidth={10} strokeLinecap="round" />
        <path d={`M ${cx - 110} 490 L ${cx + 110} 490`} stroke={color} strokeWidth={14} strokeLinecap="round" />
        <line x1={lx} y1={ly} x2={rx} y2={ry} stroke={color} strokeWidth={12} strokeLinecap="round" />
        <circle cx={cx} cy={cy} r={20} fill={C.bg0} stroke={color} strokeWidth={6} />
        {rope(lx, ly)}{pan(lx, ly)}{rope(rx, ry)}{pan(rx, ry)}
      </svg>
      <div style={{position: 'absolute', left: lx - 90, top: ly + 40, width: 180, height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{left}</div>
      <div style={{position: 'absolute', left: rx - 90, top: ry + 40, width: 180, height: 150, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{right}</div>
    </div>
  );
};
/** Rotating 3-D "black box" cube. open 0..1 = box becomes transparent and glows (XAI). */
export const BlackBox: React.FC<{size?: number; open?: number; color?: string; speed?: number; label?: string}> = ({size = 360, open = 0, color = C.cyan, speed = 1.2, label = '؟'}) => {
  const f = useCurrentFrame(); const h = size / 2;
  const face = (t: string): CSS => ({position: 'absolute', width: size, height: size, transform: t, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `rgba(4,8,20,${0.96 - open * 0.9})`, border: `4px solid ${color}`, boxShadow: `inset 0 0 ${60 + open * 60}px ${color}${open > 0.3 ? '99' : '33'}`, fontFamily: FONT, fontWeight: 900, fontSize: size * 0.5, color: `${color}${open > 0.3 ? '00' : 'aa'}`, textShadow: `0 0 30px ${color}`, backfaceVisibility: 'visible'});
  return (
    <div style={{width: size, height: size, perspective: 1400}}>
      <div style={{position: 'relative', width: size, height: size, transformStyle: 'preserve-3d', transform: `rotateX(-22deg) rotateY(${f * speed}deg)`}}>
        {[`translateZ(${h}px)`, `rotateY(180deg) translateZ(${h}px)`, `rotateY(90deg) translateZ(${h}px)`, `rotateY(-90deg) translateZ(${h}px)`, `rotateX(90deg) translateZ(${h}px)`, `rotateX(-90deg) translateZ(${h}px)`].map((t, i) => <div key={i} style={face(t)}>{i < 4 ? label : ''}</div>)}
        <div style={{position: 'absolute', left: h - 60, top: h - 60, width: 120, height: 120, borderRadius: '50%', background: `radial-gradient(circle, #fff, ${color} 40%, transparent 70%)`, opacity: open, transform: 'translateZ(0)'}} />
      </div>
    </div>
  );
};
/** Grid of 100 "people". first `a` are colour A, the rest colour B. n = how many are visible. */
export const People: React.FC<{n: number; a?: number; ca?: string; cb?: string; cell?: number; cols?: number; hot?: boolean}> = ({n, a = 95, ca = C.amber, cb = C.cyan, cell = 54, cols = 20, hot}) => (
  <div style={{display: 'grid', gridTemplateColumns: `repeat(${cols}, ${cell}px)`, gap: 6, direction: 'ltr'}}>
    {Array.from({length: 100}).map((_, i) => {
      const vis = i < n; const col = i < a ? ca : cb; const isB = i >= a;
      return (
        <svg key={i} width={cell} height={cell} viewBox="0 0 40 40" style={{opacity: vis ? 1 : 0.07, transform: vis ? 'none' : 'scale(0.7)', filter: vis && (isB && hot) ? `drop-shadow(0 0 8px ${col})` : undefined}}>
          <circle cx="20" cy="12" r="7" fill={vis ? col : '#5f7896'} /><path d="M6 36 Q6 21 20 21 Q34 21 34 36 Z" fill={vis ? col : '#5f7896'} />
        </svg>
      );
    })}
  </div>
);
export const Bubble: React.FC<{sec: number; me?: boolean; children: React.ReactNode; color?: string; w?: number; size?: number; out?: number}> = ({sec, me, children, color, w = 820, size = 52}) => {
  const el = useCue(sec); if (el < 0) return null;
  const q = sp(el, 12, 170, 0.7); const col = color ?? (me ? C.blue : C.cyan);
  return (
    <div style={{display: 'flex', justifyContent: me ? 'flex-start' : 'flex-end', width: '100%', transform: `scale(${0.6 + q * 0.4}) translateY(${(1 - q) * 30}px)`, opacity: Math.min(1, el / 6), transformOrigin: me ? 'left' : 'right'}}>
      <div dir="rtl" style={{maxWidth: w, padding: '22px 34px', borderRadius: 30, borderBottomLeftRadius: me ? 6 : 30, borderBottomRightRadius: me ? 30 : 6, background: me ? `linear-gradient(135deg, ${C.blue}, #1d4ed8)` : 'linear-gradient(135deg,#0f2a5c,#12356f)', border: me ? 'none' : `2px solid ${col}88`, fontFamily: FONT, fontWeight: 700, fontSize: size, color: '#fff', boxShadow: `0 10px 40px #0007, 0 0 30px ${col}33`}}>{children}</div>
    </div>
  );
};
/** Typing dots bubble */
export const Typing: React.FC = () => {
  const f = useCurrentFrame();
  return <div style={{display: 'flex', gap: 12, padding: '26px 34px', borderRadius: 30, background: '#0f2a5c', border: `2px solid ${C.cyan}88`, width: 'fit-content', marginLeft: 'auto'}}>{[0, 1, 2].map((i) => <div key={i} style={{width: 18, height: 18, borderRadius: '50%', background: C.cyan, opacity: 0.4 + 0.6 * Math.abs(Math.sin(f * 0.25 - i * 0.7)), transform: `translateY(${Math.sin(f * 0.25 - i * 0.7) * -6}px)`}} />)}</div>;
};
/** Card with icon tile + title + optional sub-text. */
export const PointCard: React.FC<{I: LucideIcon; title: string; sub?: string; color?: string; w?: number | string; h?: number | string; size?: number; dirRow?: boolean; subSize?: number}> = ({I, title, sub, color = C.cyan, w = 520, h, size = 52, dirRow = false, subSize}) => (
  <Glass accent={color} w={w} h={h} pad={30} style={{display: 'flex', flexDirection: dirRow ? 'row' : 'column', alignItems: 'center', justifyContent: 'center', gap: 22, textAlign: 'center'}}>
    <IconTile I={I} color={color} size={dirRow ? 120 : 140} />
    <div style={{flex: dirRow ? 1 : undefined}}>
      <T size={size} w={800} color={C.text} align={dirRow ? 'right' : 'center'}>{title}</T>
      {sub ? <T size={subSize ?? size * 0.64} w={500} color={C.mute} align={dirRow ? 'right' : 'center'} style={{marginTop: 8}}>{sub}</T> : null}
    </div>
  </Glass>
);
/** Looping equaliser-like waveform bars */
export const Wave: React.FC<{n?: number; w?: number; h?: number; color?: string; level?: number}> = ({n = 40, w = 700, h = 160, color = C.cyan, level = 0.6}) => {
  const f = useCurrentFrame();
  return (
    <div style={{display: 'flex', alignItems: 'center', gap: 6, width: w, height: h, justifyContent: 'center'}}>
      {Array.from({length: n}).map((_, i) => {
        const v = (0.25 + 0.75 * Math.abs(Math.sin(f * 0.22 + i * 0.7) * Math.cos(f * 0.13 + i * 0.31))) * level;
        return <div key={i} style={{width: w / n - 6, height: Math.max(8, v * h), borderRadius: 6, background: color, boxShadow: `0 0 12px ${color}`}} />;
      })}
    </div>
  );
};
/** Chip */
export const Chip: React.FC<{children: React.ReactNode; color?: string; size?: number; style?: CSS}> = ({children, color = C.cyan, size = 44, style}) => (
  <div dir="rtl" style={{fontFamily: FONT, fontWeight: 700, fontSize: size, color: C.text, padding: '10px 30px', borderRadius: 999, background: `${color}22`, border: `2px solid ${color}aa`, boxShadow: `0 0 24px ${color}33`, whiteSpace: 'nowrap', ...style}}>{children}</div>
);
/** Vertical-stack layout helper for rows of cards placed with absolute centre */
export const Row: React.FC<{gap?: number; children: React.ReactNode; style?: CSS}> = ({gap = 40, children, style}) => <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap, direction: 'rtl', ...style}}>{children}</div>;
export const Cap: React.FC<{sec: number; out?: number; children: React.ReactNode; size?: number; color?: string; y?: number}> = ({children, size = 54, color = C.text, y = 0}) => (
  <div style={{position: 'absolute', left: 0, right: 0, bottom: 140 + y, display: 'flex', justifyContent: 'center'}}><T size={size} w={700} color={color}>{children}</T></div>
);
