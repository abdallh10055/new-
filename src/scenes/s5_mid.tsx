import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Scale, Lock, Eye, Gavel, UserRound, Cpu, X, Check, BookOpen, ShieldCheck, Cctv, MessageCircle, Share2, Globe, Camera as Cam, Database, Server, SquareDashed, ShieldAlert, ListChecks, Search, Layers, TriangleAlert, Box, CircleHelp, Star} from 'lucide-react';
import {C, FONT} from '../config';
import {At, Beat} from '../components/At';
import {Camera} from '../components/Camera';
import {Sfx} from '../components/Sfx';
import {BlackBox, Bubble, Chip, PointCard} from '../components/widgets';
import {Col, CountUp, GlitchText, Glass, Hl, Ico, IconTile, Link, SectionTitle, Shine, Stamp, T, Typewriter, Words} from '../components/ui';
import {useCue} from '../lib/ctx';
import {ease, prog, map, rand} from '../lib/anim';
import {X3, X4, place} from './s3_core';

export const Title: React.FC<{sec: number; out: number; num: string; kicker: string; title: string; sub?: string; I: any; color?: string}> = ({sec, out, ...r}) => (
  <At sec={sec} out={out} anim="none" exit="zoom" style={{position: 'absolute', inset: 0}}>
    <Sfx name="impact" at={sec + 0.1} vol={0.5} /><Sfx name="whoosh" at={sec} vol={0.4} />
    <SectionTitle sec={sec} {...r} />
  </At>
);
export const Top: React.FC<{sec: number; out: number; children: React.ReactNode; y?: number}> = ({sec, out, children, y = 140}) => (
  <At sec={sec} out={out} anim="down" style={{position: 'absolute', left: 0, right: 0, top: y, display: 'flex', justifyContent: 'center'}}>{children}</At>
);

export const BlackBox2: React.FC = () => {
  const inb = useCue(559.0);
  const cardX = 1450 - ease(prog(useCue(557.0), 28)) * 20 - ease(prog(inb, 22)) * 230;
  const questions = [
    {I: Scale, t: 'العدالة', q: 'هل القرار عادل؟', c: C.cyan, at: 572.6},
    {I: Lock, t: 'الخصوصية', q: 'هل تم انتهاك بياناته الشخصية؟', c: C.violet, at: 576.8},
    {I: Eye, t: 'الشفافية', q: 'ليه النظام طلّع القرار ده؟ هل شرح لنا؟', c: C.green, at: 581.0},
    {I: Gavel, t: 'المساءلة', q: 'مين المسؤول لو حصل غلط؟', c: C.amber, at: 588.4},
  ];
  return (
    <AbsoluteFill>
      <Camera from={{s: 1}} to={{s: 1.05}} punches={[{at: 557.2, s: 1.05, fx: 400, until: 560}, {at: 564.8, s: 1.06, until: 568}, ...questions.map((q, i) => ({at: q.at, s: 1.06, fx: X4[i] - 960, until: q.at + 3.5}))]}>
        <Top sec={555.1} out={568.3} y={130}><Words sec={555.2} size={72} gap={5} words={['المشكلة', 'الكبيرة:', ['الصندوق', C.cyan], ['الأسود', C.cyan]]} /></Top>
        <At sec={557.0} out={560.0} anim="right" dist={140} sfx="whoosh" style={{position: 'absolute', left: cardX - 160, top: 400, opacity: inb > 14 ? 0 : 1}}><Glass accent={C.green} w={320} pad={20} style={{textAlign: 'center'}}><Ico I={UserRound} size={100} color={C.green} /><T size={38} w={800}>متقدم كفء جدًا</T><div style={{display: 'flex', justifyContent: 'center', gap: 4}}>{[0, 1, 2, 3, 4].map((i) => <Star key={i} size={30} color={C.amber} fill={C.amber} />)}</div></Glass></At>
        <At sec={558.4} out={568.3} anim="zoom" dur={30} sfx="sub_drop" style={place(960, 300, 340)}><BlackBox size={340} speed={-1.4} /></At>
        <Link sec={560.0} out={568.3} x1={780} y1={520} x2={640} y2={520} color={C.red} />
        <At sec={560.6} out={568.3} anim="drop" sfx="error" style={place(430, 430, 300)}><Stamp text="مرفوض ✗" size={72} rot={-6} /></At>
        <At sec={563.4} out={568.3} anim="right" sfx="pop" style={{position: 'absolute', left: 1150, top: 740, width: 600}}><Bubble sec={563.4} me size={46}>ليه رفضتني؟</Bubble></At>
        <At sec={565.0} out={568.3} anim="left" sfx="glitch" style={{position: 'absolute', left: 260, top: 740}}><Glass accent={C.red} pad={22}><GlitchText size={90} color={C.red} sec={565.0}>مفيش إجابة واضحة</GlitchText></Glass></At>
        <At sec={568.6} anim="down" style={{position: 'absolute', left: 0, right: 0, top: 150, display: 'flex', justifyContent: 'center'}}><Chip color={C.red} size={56}>تساؤلات خطيرة جدًا عن…</Chip></At>
        {questions.map((q, i) => <At key={i} sec={q.at} anim="drop" sfx="pop" style={place(X4[i], 310, 380)}><PointCard I={q.I} title={q.t} sub={q.q} color={q.c} w={380} h={540} size={64} subSize={38} /></At>)}
      </Camera>
    </AbsoluteFill>
  );
};

const ROWS = [
  {I: CircleHelp, t: 'ما هو التحيز الخوارزمي؟', v: 'انحراف أو خطأ متكرر في مخرجات النظام يؤدي إلى نتائج غير عادلة أو ضارة', c: C.cyan, at: 593.6},
  {I: Layers, t: 'أسبابه', v: 'بيانات تدريب متحيزة · تصميم نظام غير مناسب · طريقة استخدام أو سياق متحيز', c: C.violet, at: 601.2},
  {I: ListChecks, t: 'أمثلته', v: 'حرب أكتوبر · اختيار المعلمين · تقييم الموظفين · تأييد وجهة نظرك إنت بس', c: C.green, at: 611.6},
  {I: TriangleAlert, t: 'خطورته', v: 'يكرر الظلم · صعب اكتشافه · يعطي شرعية زائفة للتمييز', c: C.red, at: 622.4},
  {I: Box, t: 'المشكلة الكبرى', v: 'الصندوق الأسود: صعوبة تفسير سبب اتخاذ النظام لقراره', c: C.amber, at: 636.4},
];
export const Summary: React.FC = () => {
  const f = useCurrentFrame();
  const act = (() => { let a = 0; ROWS.forEach((r, i) => { if (useCue(r.at) >= 0) a = i; }); return a; })();
  return (
    <AbsoluteFill>
      <Camera from={{s: 1.0, y: 0}} to={{s: 1.04, y: -6}}>
        <At sec={593.4} anim="down" sfx="whoosh_soft" style={{position: 'absolute', left: 0, right: 0, top: 120, display: 'flex', justifyContent: 'center'}}><Chip color={C.cyan} size={54}><BookOpen size={50} style={{verticalAlign: 'middle', marginLeft: 14}} />ملخص سريع للمذاكرة</Chip></At>
        {ROWS.map((r, i) => (
          <At key={i} sec={r.at} anim="right" dist={160} sfx="pop" style={{position: 'absolute', left: 150, right: 150, top: 245 + i * 142, opacity: 1}}>
            <div style={{opacity: i === act ? 1 : 0.55, transform: i === act ? 'scale(1.015)' : 'none', transition: 'none'}}>
              <Glass accent={r.c} pad={0} r={26} style={{height: 128, display: 'flex', direction: 'rtl', alignItems: 'center', overflow: 'hidden', boxShadow: i === act ? `0 0 60px ${r.c}66, 0 24px 70px #0009` : undefined, borderColor: i === act ? r.c : undefined}}>
                <div style={{width: 480, height: '100%', background: `${r.c}1f`, display: 'flex', alignItems: 'center', gap: 20, padding: '0 28px', borderLeft: `3px solid ${r.c}`}}>
                  <Ico I={r.I} size={60} color={r.c} /><T size={44} w={900} color={r.c} align="right">{r.t}</T>
                </div>
                <div style={{flex: 1, padding: '0 34px'}}><T size={38} w={600} align="right" lh={1.35}>{r.v}</T></div>
              </Glass>
            </div>
          </At>
        ))}
      </Camera>
    </AbsoluteFill>
  );
};

const Walkers: React.FC<{dim: number}> = ({dim}) => {
  const f = useCurrentFrame();
  return (
    <div style={{position: 'absolute', left: 0, top: 0, width: 1920, height: 1080, opacity: 1 - dim * 0.65}}>
      {Array.from({length: 11}).map((_, i) => {
        const h = 120 + rand(i) * 260; const w = 110 + rand(i + 3) * 80;
        return <div key={i} style={{position: 'absolute', left: 40 + i * 175, top: 700 - h, width: w, height: h, background: 'linear-gradient(180deg,#14306a,#0a1a40)', border: `2px solid ${C.violet}44`, borderRadius: 8}}>{Array.from({length: 6}).map((_, k) => <div key={k} style={{position: 'absolute', left: 14 + (k % 2) * (w / 2 - 6), top: 16 + Math.floor(k / 2) * 36, width: 18, height: 18, background: rand(i * 7 + k) > 0.5 ? `${C.amber}aa` : '#ffffff18'}} />)}</div>;
      })}
      <div style={{position: 'absolute', left: 0, right: 0, top: 700, height: 4, background: `${C.violet}88`}} />
      {Array.from({length: 5}).map((_, i) => {
        const x = ((f * (2.4 + i * 0.5) + i * 420) % 2200) - 150; const y = 560 + (i % 3) * 36;
        const tracked = x > 200 && x < 1700;
        return (
          <div key={i} style={{position: 'absolute', left: x, top: y, width: 110, height: 150}}>
            <UserRound size={110} color="#cfe8ff" strokeWidth={1.6} />
            {tracked ? <div style={{position: 'absolute', left: -10, top: -6, width: 100, height: 96, border: `3px solid ${C.red}`, borderRadius: 8, boxShadow: `0 0 16px ${C.red}`}} /> : null}
            {tracked ? <div style={{position: 'absolute', left: -14, top: 100, fontFamily: 'monospace', fontSize: 22, color: C.red, whiteSpace: 'nowrap'}}>ID·{1000 + i * 137}</div> : null}
            {tracked ? <div style={{position: 'absolute', left: -240, top: 70, width: 240, height: 0, borderTop: `3px dotted ${C.red}88`}} /> : null}
          </div>
        );
      })}
    </div>
  );
};
const Flow: React.FC<{y: number; delay: number; sec: number}> = ({y, delay, sec}) => {
  const f = useCurrentFrame(); const e = useCue(sec); if (e < 0) return null;
  return <>{Array.from({length: 6}).map((_, i) => { const x = 1380 - ((f * 6 + i * 90 + delay) % 560); return <div key={i} style={{position: 'absolute', left: x, top: y - 9, width: 18, height: 18, borderRadius: '50%', background: C.violet, boxShadow: `0 0 14px ${C.violet}`, opacity: map(x, 820, 900, 0, 1) * map(x, 1330, 1380, 1, 0)}} />; })}</>;
};
export const Privacy: React.FC = () => {
  const f = useCurrentFrame();
  const dim = ease(prog(useCue(678.0), 20));
  return (
    <AbsoluteFill>
      <Camera from={{s: 1}} to={{s: 1.05}} punches={[{at: 664.0, s: 1.06, until: 668}, {at: 678.4, s: 1.06, until: 682}, {at: 686.0, s: 1.05, fx: -300, until: 691}]}>
        <Title sec={646.8} out={652.9} num="02" kicker="ثانيًا" title="قضايا الخصوصية" sub="Privacy" I={Lock} color={C.violet} />
        <At sec={653.2} out={657.4} anim="right" sfx="whoosh_soft" style={{position: 'absolute', right: 180, top: 160}}><Chip color={C.violet} size={46}><BookOpen size={42} style={{verticalAlign: 'middle', marginLeft: 12}} />الكتاب بيقول</Chip></At>
        <At sec={654.0} out={657.4} anim="none" style={{position: 'absolute', left: 160, right: 160, top: 350, display: 'flex', justifyContent: 'center'}}><Typewriter sec={654.0} dur={90} size={66} w={800} align="center" text={'أدّى تطوير الذكاء الاصطناعي إلى ظهور\nقضايا جديدة تتعلق بالخصوصية'} /></At>
        {/* example 1 */}
        <Top sec={657.8} out={682.1} y={120}><Chip color={C.violet} size={50}><Cctv size={46} style={{verticalAlign: 'middle', marginLeft: 12}} />مثال ١: التعرف على الوجه في الشوارع</Chip></Top>
        <At sec={658.4} out={682.1} anim="zoom" dur={30} sfx="scan" style={{position: 'absolute', inset: 0}}><Walkers dim={dim} /></At>
        <At sec={659.0} out={682.1} anim="pop" sfx="blip" style={{position: 'absolute', right: 120, top: 230}}><IconTile I={Cctv} size={170} color={C.red} /></At>
        <At sec={669.8} out={678.0} anim="up" style={{position: 'absolute', left: 0, right: 0, top: 800}}><T size={56} w={800}>يراقب الناس ويتتبّعهم… <Col sec={671.4} color={C.red}>رايحين فين وجايين منين</Col></T></At>
        <At sec={678.4} out={682.1} anim="right" sfx="pop" style={place(1330, 770, 520)}><Glass accent={C.green} w={520} pad={22} style={{display: 'flex', alignItems: 'center', gap: 22}}><Ico I={ShieldCheck} size={84} color={C.green} /><T size={54} w={900} color={C.green}>يحمي الأمن؟</T></Glass></At>
        <At sec={680.0} out={682.1} anim="left" sfx="alert" style={place(590, 770, 600)}><Glass accent={C.red} w={600} pad={22} style={{display: 'flex', alignItems: 'center', gap: 22}}><Ico I={Eye} size={84} color={C.red} /><T size={54} w={900} color={C.red}>ولا ينتهك خصوصيتنا؟</T></Glass></At>
        {/* example 2 */}
        <Top sec={682.4} out={694.3} y={120}><Chip color={C.violet} size={50}><Database size={46} style={{verticalAlign: 'middle', marginLeft: 12}} />مثال ٢: شركات بتجمع بياناتنا</Chip></Top>
        {[{I: MessageCircle, y: 340, at: 683.0, c: C.cyan}, {I: Share2, y: 500, at: 683.5, c: C.pink}, {I: Globe, y: 660, at: 684.0, c: C.green}].map((s, i) => (
          <React.Fragment key={i}><At sec={s.at} out={694.2} anim="right" sfx="pop" style={place(1560, s.y - 70, 150)}><IconTile I={s.I} size={140} color={s.c} /></At><Flow y={s.y} delay={i * 40} sec={s.at + 0.6} /></React.Fragment>
        ))}
        <At sec={684.4} out={694.2} anim="zoom" sfx="whoosh_soft" style={place(560, 330, 420)}><Glass accent={C.violet} w={420} h={430} pad={24} style={{textAlign: 'center'}}><Ico I={Server} size={170} color={C.violet} /><CountUp sec={685.0} to={512} dur={150} suffix=" TB" size={78} color={C.violet} /><T size={42} w={700} color={C.mute}>بيانات ضخمة</T></Glass></At>
        <At sec={691.8} out={694.2} anim="pop" sfx="alert" style={place(1310, 790, 520)}><Glass accent={C.amber} w={560} pad={22} style={{display: 'flex', alignItems: 'center', gap: 22}}><SquareDashed size={72} color={C.amber} /><T size={50} w={900}>هل إحنا موافقين؟</T></Glass></At>
        <At sec={693.0} out={694.2} anim="pop" sfx="alert" style={place(640, 790, 560)}><Glass accent={C.red} w={640} pad={22} style={{display: 'flex', alignItems: 'center', gap: 22}}><ShieldAlert size={72} color={C.red} /><T size={50} w={900}>وهل بياناتنا في أمان؟</T></Glass></At>
      </Camera>
    </AbsoluteFill>
  );
};
