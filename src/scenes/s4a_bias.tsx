import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Scale, Database, Settings2, MousePointerClick, BookOpen, Cpu, X, FileText, Brain, School, Bot, UserRound, Check, TrendingDown, TrendingUp, Sparkles, Target} from 'lucide-react';
import {C, FONT} from '../config';
import {At, Beat} from '../components/At';
import {Camera} from '../components/Camera';
import {Sfx} from '../components/Sfx';
import {Bubble, Chip, PointCard, Row} from '../components/widgets';
import {People} from '../components/widgets';
import {Col, CountUp, Glass, Hl, Ico, IconTile, Link, SectionTitle, Shine, Stamp, T, Typewriter, Words} from '../components/ui';
import {useCue} from '../lib/ctx';
import {ease, prog, map, lerp} from '../lib/anim';
import {X3, X4, place, Num} from './s3_core';

const Title: React.FC<{sec: number; out: number; num: string; kicker: string; title: string; sub?: string; I: any; color?: string}> = ({sec, out, ...r}) => (
  <At sec={sec} out={out} anim="none" exit="zoom" style={{position: 'absolute', inset: 0}}>
    <Sfx name="impact" at={sec + 0.1} vol={0.5} /><Sfx name="whoosh" at={sec} vol={0.4} />
    <SectionTitle sec={sec} {...r} />
  </At>
);

export const BiasDef: React.FC = () => {
  const f = useCurrentFrame();
  const dev = ease(prog(useCue(283.4), 120));
  const path = `M 0 120 C 180 120 300 ${120 - 20 * dev} 450 ${120 - 60 * dev} S 800 ${120 - 170 * dev} 1000 ${120 - 230 * dev}`;
  return (
    <AbsoluteFill>
      <Camera from={{s: 1}} to={{s: 1.05}} punches={[{at: 267.4, s: 1.07, until: 270}, {at: 281.0, s: 1.06, fy: -100, until: 285}]}>
        <Title sec={257.1} out={265.2} num="01" kicker="أولاً" title="التحيز الخوارزمي" sub="Algorithmic Bias" I={Scale} />
        <At sec={265.6} out={279.2} anim="down" style={{position: 'absolute', left: 0, right: 0, top: 130, display: 'flex', justifyContent: 'center'}}><Chip color={C.amber} size={50}>التحيز في الذكاء الاصطناعي</Chip></At>
        <At sec={266.4} out={279.2} anim="none" style={{position: 'absolute', left: 0, right: 0, top: 260}}>
          <Words sec={266.5} size={86} gap={8} words={['وجود', ['أخطاء', C.red], ['متكررة', C.red]]} />
          <Words sec={269.4} size={70} gap={7} color={C.mute} words={['تؤدي', 'إلى', 'نتائج', 'أو', 'قرارات', ['غير', C.amber], ['عادلة', C.amber]]} />
        </At>
        <At sec={268.0} out={272.8} anim="none" style={{position: 'absolute', left: 0, right: 0, top: 620, display: 'flex', justifyContent: 'center', gap: 34}}>
          {Array.from({length: 8}).map((_, i) => <At key={i} sec={268.0 + i * 0.35} anim="pop" sfx={i % 2 ? 'tick' : 'blip'} sfxVol={0.3} style={{}}><div style={{width: 96, height: 96, borderRadius: 22, background: `${C.red}22`, border: `3px solid ${C.red}`, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 22px ${C.red}66`}}><X size={60} color={C.red} strokeWidth={3.5} /></div></At>)}
        </At>
        <At sec={273.0} out={279.2} anim="right" sfx="pop" style={place(X3[0], 600, 330)}><PointCard I={Database} title="بيانات خطأ" color={C.red} w={330} h={300} size={46} /></At>
        <Link sec={273.8} out={279.2} x1={1270} y1={750} x2={1150} y2={750} color={C.red} />
        <At sec={274.2} out={279.2} anim="pop" sfx="blip" style={place(X3[1], 630, 240)}><IconTile I={Cpu} size={240} color={C.cyan} /></At>
        <Link sec={275.4} out={279.2} x1={820} y1={750} x2={700} y2={750} color={C.red} />
        <At sec={276.2} out={279.2} anim="left" sfx="error" style={place(X3[2], 600, 330)}><PointCard I={X} title="قرارات خطأ" color={C.red} w={330} h={300} size={46} /></At>
        {/* school book definition */}
        <At sec={279.6} out={291.3} anim="right" sfx="whoosh_soft" style={{position: 'absolute', right: 180, top: 130}}><Chip color={C.cyan} size={46}><BookOpen size={42} style={{verticalAlign: 'middle', marginLeft: 12}} />تعريف كتاب المدرسة</Chip></At>
        <At sec={280.8} out={291.3} anim="none" style={{position: 'absolute', left: 200, right: 200, top: 260, display: 'flex', justifyContent: 'center'}}><Typewriter sec={280.8} dur={85} size={66} w={900} text={'انحراف أو نمط قد يؤدي إلى\nنتائج غير عادلة أو ضارة'} align="center" /></At>
        <At sec={283.0} out={291.3} anim="up" style={{position: 'absolute', left: 460, top: 540, width: 1000}}>
          <Glass accent={C.amber} w={1000} h={330} pad={0}>
            <svg width={1000} height={330} viewBox="0 0 1000 250" style={{overflow: 'visible'}}>
              <line x1={0} y1={120} x2={1000} y2={120} stroke={C.green} strokeWidth={4} strokeDasharray="14 12" />
              <path d={path} fill="none" stroke={C.red} strokeWidth={8} strokeLinecap="round" style={{filter: `drop-shadow(0 0 10px ${C.red})`}} />
              <circle cx={1000 * dev} cy={120 - 230 * Math.pow(dev, 1.0) * (dev > 0 ? 1 : 0)} r={0} />
            </svg>
            <div style={{position: 'absolute', left: 40, top: 30, fontFamily: FONT, fontWeight: 800, fontSize: 38, color: C.green}}>المسار العادل</div>
            <At sec={286.4} anim="pop" sfx="alert" style={{position: 'absolute', right: 40, top: 40}}><Stamp text="انحراف" size={48} rot={-5} /></At>
          </Glass>
        </At>
        <At sec={289.6} out={291.3} anim="pop" sfx="success" style={{position: 'absolute', left: 0, right: 0, top: 910, display: 'flex', justifyContent: 'center'}}><Chip color={C.green} size={48}>✓ نفس التعريف اللي قلناه</Chip></At>
        {/* why? */}
        <At sec={291.5} out={298.5} anim="down" style={{position: 'absolute', left: 0, right: 0, top: 170}}><Words sec={291.6} size={88} words={['ما', 'هي', ['أسباب', C.amber], 'هذا', 'التحيز؟']} /></At>
        <At sec={294.2} out={298.5} anim="up" style={{position: 'absolute', left: 0, right: 0, top: 340}}><T size={64} w={800} color={C.mute}>هناك <Col sec={294.8} color={C.cyan}>ثلاثة أسباب رئيسية</Col></T></At>
        {[{I: Database, t: 'بيانات التدريب', c: C.cyan, at: 296.4}, {I: Settings2, t: 'تصميم النظام', c: C.violet, at: 297.1}, {I: MousePointerClick, t: 'الاستخدام / السياق', c: C.amber, at: 297.8}].map((s, i) => (
          <At key={i} sec={s.at} anim="up" dist={90} sfx="pop" style={place(X3[i], 500, 430)}><div style={{position: 'relative'}}><PointCard I={s.I} title={s.t} color={s.c} w={430} h={330} size={50} /><Num n={String(i + 1)} c={s.c} /></div></At>
        ))}
      </Camera>
    </AbsoluteFill>
  );
};

const Stream: React.FC<{sec: number; out: number}> = ({sec, out}) => {
  const f = useCurrentFrame();
  return (
    <At sec={sec} out={out} anim="none" style={{position: 'absolute', inset: 0}}>
      {Array.from({length: 7}).map((_, i) => {
        const x = 1700 - ((f * 5 + i * 95) % 700); const bad = i % 3 !== 1;
        return <div key={i} style={{position: 'absolute', left: x - 40, top: 500, width: 80, height: 80, borderRadius: 18, background: bad ? `${C.red}33` : `${C.cyan}33`, border: `3px solid ${bad ? C.red : C.cyan}`, display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: map(x, 1000, 1100, 0, 1) * map(x, 1650, 1700, 1, 0)}}>{bad ? <X color={C.red} strokeWidth={4} /> : <Check color={C.cyan} strokeWidth={4} />}</div>;
      })}
    </At>
  );
};

export const Cause1: React.FC = () => {
  const f = useCurrentFrame();
  const sel = (() => { const e = useCue(356.0); if (e < 0) return -1; return e < 3.8 * 30 ? Math.floor(e / 11) % 2 : 1; })();
  const nPeople = Math.round(ease(prog(useCue(340.2), 70)) * 100);
  const gauge = (sec: number, val: number, color: string, label: string, I: any, cx: number) => {
    const p = ease(prog(useCue(sec), 110));
    const v = val === 0 ? lerp(0.9, 0.22, p) : lerp(0.1, 0.88, p);
    return (
      <At sec={377.6} out={388.7} anim="up" style={place(cx, 400, 420)}>
        <Glass accent={color} w={420} h={470} pad={26} style={{textAlign: 'center'}}>
          <div style={{display: 'flex', alignItems: 'flex-end', justifyContent: 'center', gap: 40, height: 290}}>
            <div style={{width: 120, height: 280, borderRadius: 18, background: '#ffffff10', border: `2px solid ${color}66`, overflow: 'hidden', position: 'relative'}}><div style={{position: 'absolute', bottom: 0, left: 0, right: 0, height: `${v * 100}%`, background: `linear-gradient(0deg, ${color}, ${color}66)`, boxShadow: `0 0 30px ${color}`}} /></div>
            <div><Ico I={I} size={80} color={color} /><T latin size={92} w={900} color={color}>{Math.round(v * 100)}%</T></div>
          </div>
          <T size={44} w={800} style={{marginTop: 14}}>{label}</T>
        </Glass>
      </At>
    );
  };
  return (
    <AbsoluteFill>
      <Camera from={{s: 1}} to={{s: 1.05}} punches={[{at: 345.0, s: 1.06, until: 348}, {at: 360.0, s: 1.07, until: 364}, {at: 378.5, s: 1.05, until: 384}]}>
        <Title sec={298.7} out={305.6} num="1" kicker="السبب الأول" title="بيانات التدريب" sub="Data Bias" I={Database} color={C.cyan} />
        {/* concept */}
        <At sec={306.0} out={314.5} anim="down" style={{position: 'absolute', left: 0, right: 0, top: 150}}><Words sec={306.1} size={66} gap={5} words={['يطلع', 'نتائج', ['خاطئة', C.red], 'لأنه', 'اتدرّب', 'على', 'بيانات', ['خاطئة', C.red], 'أو', ['متحيزة', C.red]]} /></At>
        <Stream sec={308.0} out={314.5} />
        <At sec={308.2} out={314.5} anim="pop" sfx="blip" style={place(960, 400, 300)}><IconTile I={Cpu} size={300} color={C.cyan} /></At>
        <At sec={308.8} out={314.5} anim="left" sfx="error" style={place(430, 410, 420)}><PointCard I={X} title="نتائج خاطئة" color={C.red} w={420} h={280} size={52} /></At>
        <At sec={308.4} out={314.5} anim="right" style={place(1560, 650, 300)}><Chip color={C.cyan} size={40}>بيانات التدريب</Chip></At>
        {/* proverb */}
        <Beat sec={314.7} out={318.1} anim="zoom" exit="zoom">
          <Sfx name="shimmer" at={314.8} vol={0.45} /><Sfx name="ding" at={315.0} vol={0.4} />
          <div style={{textAlign: 'center'}}>
            <Shine size={170} colors={[C.amber, '#fff']}>الجزاء من جنس العمل</Shine>
            <At sec={316.2} anim="up" style={{}}><T size={56} w={600} color={C.mute}>النتائج بتعكس اللي اتدرّبت عليه</T></At>
          </div>
        </Beat>
        {/* October war (short) */}
        <At sec={318.3} out={328.2} anim="down" style={{position: 'absolute', left: 0, right: 0, top: 150, display: 'flex', justifyContent: 'center'}}><Chip color={C.amber} size={52}>مثال ١: حرب أكتوبر</Chip></At>
        <At sec={321.9} out={328.2} anim="left" sfx="whoosh_soft" style={{position: 'absolute', left: 140, top: 330}}><Glass accent={C.cyan} w={700} pad={34}><div style={{display: 'flex', alignItems: 'center', gap: 14, justifyContent: 'flex-end'}}><T size={40} w={800} color={C.cyan}>بيانات التدريب</T><Database size={46} color={C.cyan} /></div><div style={{height: 3, background: `${C.cyan}55`, margin: '16px 0'}} /><T size={54} w={800} align="right" lh={1.5}>حرب أكتوبر 1973<br /><Col sec={324.2} color={C.red}>انتهت بدون فائز</Col></T></Glass></At>
        <At sec={325.3} out={328.2} anim="right" sfx="whoosh_soft" style={{position: 'absolute', left: 940, top: 330, width: 840}}><Glass accent={C.blue} pad={30}><Bubble sec={325.4} me size={44}>مين انتصر؟</Bubble><div style={{height: 20}} /><Bubble sec={327.0} color={C.red} size={52}>مفيش فائز!</Bubble></Glass></At>
        {/* teachers */}
        <Beat sec={328.4} out={332.9} anim="zoom" style={{flexDirection: 'column', gap: 40}}>
          <Chip color={C.violet} size={50}>مثال ٢</Chip>
          <Shine size={140} colors={[C.cyan, '#fff']}>اختيار المعلمين</Shine>
          <div style={{display: 'flex', gap: 60}}><At sec={330.2} anim="pop" sfx="pop" style={{}}><Ico I={School} size={120} color={C.amber} /></At><At sec={331.0} anim="pop" sfx="blip" style={{}}><Ico I={Bot} size={120} color={C.cyan} /></At></div>
        </Beat>
        <At sec={333.2} out={351.1} anim="down" style={{position: 'absolute', left: 0, right: 0, top: 140}}>
          <T size={58} w={800} color={C.mute}>ودرّبناه على <Col sec={341.2} color={C.cyan}>١٠٠ نموذج</Col> لمعلّم ناجح</T>
        </At>
        <At sec={339.8} out={351.1} anim="zoom" style={{position: 'absolute', left: 960 - 600, top: 270}}><People n={nPeople} a={useCue(344.4) > 0 ? 95 : 100} ca={useCue(344.4) > 0 ? C.amber : C.cyan} cb={C.cyan} hot={useCue(347.8) > 0} /></At>
        <At sec={345.0} out={351.1} anim="pop" sfx="pop" style={place(1330, 690, 440)}><Glass accent={C.amber} w={440} pad={20} style={{textAlign: 'center'}}><CountUp sec={345.0} to={95} dur={30} size={130} color={C.amber} /><T size={48} w={800} color={C.amber}>معلمة</T></Glass></At>
        <At sec={347.8} out={351.1} anim="pop" sfx="pop" style={place(590, 690, 440)}><Glass accent={C.cyan} w={440} pad={20} style={{textAlign: 'center'}}><CountUp sec={347.8} to={5} dur={20} size={130} color={C.cyan} /><T size={48} w={800} color={C.cyan}>معلمين</T></Glass></At>
        {/* the two candidates */}
        <At sec={351.3} out={369.4} anim="down" style={{position: 'absolute', left: 0, right: 0, top: 140}}><T size={58} w={800}>دخلنا له طلبين: <Col sec={352.4} color={C.cyan}>معلم</Col> و<Col sec={353.0} color={C.amber}>معلمة</Col> — عايزين نوظف <Col sec={354.4} color={C.green}>واحد بس</Col></T></At>
        {[{x: 1300, c: C.cyan, t: 'معلم', at: 352.2}, {x: 620, c: C.amber, t: 'معلمة', at: 353.0}].map((p, i) => (
          <At key={i} sec={p.at} out={369.4} anim="up" dist={110} sfx="pop" style={place(p.x, 300, 420)}>
            <Glass accent={p.c} w={420} h={400} pad={20} style={{textAlign: 'center', transform: sel === i ? 'scale(1.05)' : 'none', boxShadow: sel === i ? `0 0 90px ${p.c}aa, 0 24px 70px #0009` : undefined, borderColor: sel === i ? '#fff' : undefined}}>
              <Ico I={UserRound} size={200} color={p.c} /><T size={70} w={900} color={p.c}>{p.t}</T>
              {useCue(360.0) > 0 && i === 1 ? <div style={{position: 'absolute', top: -34, left: -34}}><At sec={360.0} anim="pop" sfx="success" style={{}}><div style={{width: 90, height: 90, borderRadius: '50%', background: C.green, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 36px ${C.green}`}}><Check size={60} color="#06102a" strokeWidth={4} /></div></At></div> : null}
            </Glass>
          </At>
        ))}
        <At sec={353.6} out={369.4} anim="pop" sfx="blip" style={place(960, 400, 200)}><Ico I={Cpu} size={170} color={C.cyan} /></At>
        <At sec={355.9} out={359.9} anim="up" style={{position: 'absolute', left: 0, right: 0, top: 790}}><Glass accent={C.cyan} pad={16} style={{width: 'fit-content', margin: '0 auto', padding: '14px 44px'}}><T size={56} w={900}>تقدر تتوقع AI هيختار مين؟ 🤔</T></Glass></At>
        <At sec={360.1} out={369.4} anim="drop" sfx="stamp" sfxVol={0.6} style={{position: 'absolute', left: 0, right: 0, top: 725, display: 'flex', justifyContent: 'center'}}><Stamp text="اختار المعلمة!" color={C.amber} size={80} rot={-3} /></At>
        <At sec={364.6} out={369.4} anim="up" style={{position: 'absolute', left: 0, right: 0, top: 910}}><T size={44} w={700} color={C.mute}>لأن البيانات أثبتت كفاءة المعلمات على المعلمين <Col sec={367.4} color={C.amber}>(في رأي البيانات!)</Col></T></At>
        {/* definition of training data */}
        <At sec={369.6} out={377.0} anim="down" style={{position: 'absolute', left: 0, right: 0, top: 150, display: 'flex', justifyContent: 'center'}}><Chip color={C.cyan} size={52}>بيانات التدريب</Chip></At>
        <At sec={370.4} out={377.0} anim="none" style={{position: 'absolute', left: 0, right: 0, top: 260}}><Words sec={370.5} size={62} gap={5} words={['هي', 'الأمثلة', 'اللي', 'الذكاء', 'الاصطناعي', ['بيتعلّم', C.cyan], 'منها', ['الأنماط', C.cyan], 'قبل', 'ما', 'نستخدمه']} /></At>
        {Array.from({length: 5}).map((_, i) => {
          const el = useCue(371.0 + i * 0.5); const p = ease(prog(el, 40));
          return el < 0 || useCue(377.0) > 0 ? null : <div key={i} style={{position: 'absolute', left: 1500 - p * 540 - 50, top: 600 + (i - 2) * 70 * (1 - p) - 50 + 100, opacity: 1 - Math.max(0, (p - 0.8) * 5), transform: `scale(${1 - p * 0.5})`}}><FileText size={100} color={C.cyan} strokeWidth={1.6} /></div>;
        })}
        <At sec={370.8} out={377.0} anim="pop" sfx="whoosh_soft" style={place(960, 560, 300)}><div style={{position: 'relative'}}><IconTile I={Brain} size={300} color={C.violet} /></div></At>
        <At sec={373.3} out={377.0} anim="left" sfx="success" sfxVol={0.35} style={place(430, 640, 360)}><Chip color={C.violet} size={50}>✦ الأنماط</Chip></At>
        {/* important rule */}
        <At sec={377.3} out={388.8} anim="right" sfx="whoosh_soft" style={{position: 'absolute', right: 180, top: 130}}><Chip color={C.amber} size={46}><BookOpen size={42} style={{verticalAlign: 'middle', marginLeft: 12}} />قاعدة مهمة من الكتاب</Chip></At>
        <At sec={378.0} out={388.8} anim="none" style={{position: 'absolute', left: 0, right: 0, top: 240}}><Words sec={378.1} size={60} gap={6} words={['كلما', ['قلّ', C.red], 'تمثيل', 'البيانات', 'للواقع', 'زاد', 'احتمال', ['تحيّز', C.red], 'المخرجات']} /></At>
        {gauge(378.6, 0, C.cyan, 'تمثيل البيانات للواقع', TrendingDown, 1230)}
        {gauge(378.6, 1, C.red, 'احتمال التحيّز', TrendingUp, 690)}
        <At sec={384.8} out={388.8} anim="up" style={{position: 'absolute', left: 0, right: 0, top: 910}}><T size={56} w={900} color={C.amber}>بيانات غير واقعية = نتائج غير صحيحة</T></At>
      </Camera>
    </AbsoluteFill>
  );
};
