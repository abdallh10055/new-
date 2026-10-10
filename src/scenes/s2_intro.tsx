import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {History, BrainCircuit, Factory, Check, Gauge, Settings, Scale, ArrowLeft, CircleCheck, CircleX, Bot, Users, BookOpen, FileText, ScanFace, Database, Gamepad2, ShieldAlert, Shuffle, Unlock, Camera as Cam, FileCheck, FileX, Smartphone, Sparkles} from 'lucide-react';
import {C, FONT} from '../config';
import {At, Beat} from '../components/At';
import {Camera} from '../components/Camera';
import {Sfx} from '../components/Sfx';
import {Chip, PointCard, Scales} from '../components/widgets';
import {Col, Glass, Hl, Ico, IconTile, Link, Pulse, Shine, Stamp, T, Typewriter, Words} from '../components/ui';
import {useCue} from '../lib/ctx';
import {ease, prog, sp, map} from '../lib/anim';

const X4 = [1590, 1170, 750, 330];
const X3 = [1450, 960, 470];
const place = (cx: number, top: number, w: number): React.CSSProperties => ({position: 'absolute', left: cx - w / 2, top});

export const Recap: React.FC = () => {
  const f = useCurrentFrame();
  const cards: {I: any; t: string; sub?: string[]; c: string; at: number; n: string}[] = [
    {I: History, t: 'تاريخ تطور تكنولوجيا المعلومات', c: C.amber, at: 42.5, n: '1'},
    {I: BrainCircuit, t: 'ما هو الذكاء الاصطناعي؟', sub: ['التوليدي', 'التعلم الآلي', 'التعلم العميق'], c: C.violet, at: 46.8, n: '2'},
    {I: Factory, t: 'استخداماته في الحياة اليومية والصناعة', c: C.green, at: 57.0, n: '3'},
  ];
  const chk = [61.0, 61.8, 62.6];
  return (
    <AbsoluteFill>
      <Camera from={{s: 1.0, x: 50}} to={{s: 1.04, x: -50}} punches={[{at: 62.0, s: 1.06, fx: -500, until: 65.5}]}>
        <Beat sec={36.9} out={42.0} anim="zoom" exit="zoom">
          <div style={{position: 'absolute', left: 110, top: 250, fontFamily: "'Montserrat Aqlani'", fontWeight: 900, fontSize: 500, lineHeight: 1, color: 'transparent', WebkitTextStroke: `5px ${C.cyan}`, filter: `drop-shadow(0 0 30px ${C.cyan})`}}>04</div>
          <div style={{position: 'absolute', right: 140, top: 330, width: 960}}>
            <At sec={37.2} anim="right" sfx="impact" sfxVol={0.5}><Shine size={170} style={{whiteSpace: 'nowrap'}}>الدرس الرابع</Shine></At>
            <At sec={39.4} anim="up" sfx="pop"><div style={{display: 'flex', justifyContent: 'center', marginTop: 20}}><Chip size={60} color={C.amber}>الوحدة الأولى</Chip></div></At>
          </div>
        </Beat>
        <At sec={42.2} anim="down" style={{position: 'absolute', left: 0, right: 0, top: 150}}><T size={64} w={800} color={C.mute}>في الدروس السابقة…</T></At>
        {cards.map((c, i) => (
          <At key={i} sec={c.at} anim="up" dist={120} sfx="whoosh_soft" style={place(X4[i], 280, 380)}>
            <Glass accent={c.c} w={380} h={560} pad={24} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22, position: 'relative'}}>
              <div style={{position: 'absolute', top: -34, right: 24, width: 68, height: 68, borderRadius: '50%', background: c.c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontWeight: 900, fontSize: 42, color: '#06102a', boxShadow: `0 0 26px ${c.c}`}}>{c.n}</div>
              <IconTile I={c.I} color={c.c} size={150} style={{marginTop: 14}} />
              <T size={44} w={800}>{c.t}</T>
              {c.sub?.map((s, k) => <At key={k} sec={c.at + 5.6 + k * 1.4} anim="pop" sfx="tick" style={{}}><Chip color={c.c} size={34}>{s}</Chip></At>)}
              <At sec={chk[i]} anim="pop" sfx="success" sfxVol={0.35} style={{position: 'absolute', bottom: 22, left: 22}}><div style={{width: 74, height: 74, borderRadius: '50%', background: C.green, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 30px ${C.green}`}}><Check size={48} color="#06102a" strokeWidth={4} /></div></At>
            </Glass>
          </At>
        ))}
        <At sec={62.2} anim="pop" sfx="riser" sfxVol={0.35} style={place(X4[3], 280, 380)}>
          <Glass accent={C.cyan} w={380} h={560} pad={24} strong style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 26, position: 'relative', boxShadow: `0 0 90px ${C.cyan}77`}}>
            <Pulse color={C.cyan} size={360} />
            <T size={140} w={900} color={C.cyan} latin>04</T><T size={56} w={900}>الدرس الرابع</T><Ico I={Scale} size={90} />
          </Glass>
        </At>
        <Sfx name="swish_up" at={65.6} vol={0.3} />
      </Camera>
    </AbsoluteFill>
  );
};

export const Title: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Camera from={{s: 1.0}} to={{s: 1.08}} punches={[{at: 71.2, s: 1.06, until: 73.2}, {at: 73.4, s: 1.06, until: 78.5}]}>
        <At sec={66.2} out={69.6} anim="right" sfx="pop" style={place(1470, 310, 600)}><Glass accent={C.dim} w={600} h={420} pad={30} style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, opacity: 0.8}}>
          <div style={{transform: `rotate(${f * 1.5}deg)`}}><Ico I={Settings} size={150} color={C.mute} /></div><T size={72} w={800} color={C.mute}>كيف يعمل؟</T></Glass></At>
        <At sec={67.4} out={69.6} anim="pop" sfx="whoosh_soft" style={{position: 'absolute', left: 960 - 65, top: 455}}><Ico I={ArrowLeft} size={130} color={C.cyan} /></At>
        <At sec={67.9} out={69.6} anim="left" dist={100} sfx="ding" sfxVol={0.35} style={place(470, 290, 680)}><Glass accent={C.cyan} w={680} h={460} pad={30} strong style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 20, boxShadow: `0 0 80px ${C.cyan}66`}}>
          <Ico I={Scale} size={170} /><T size={70} w={900} color={C.cyan}>كيف يجب أن نستخدمه؟</T></Glass></At>
        <Beat sec={69.8} anim="zoom">
          <div style={{position: 'absolute', left: 960 - 550, top: 540 - 550, width: 1100, height: 1100, opacity: 0.55}}>
            <svg width={1100} height={1100} viewBox="0 0 1100 1100"><circle cx={550} cy={550} r={520} fill="none" stroke={C.cyan} strokeWidth={3} strokeDasharray="14 22" transform={`rotate(${f * 0.4} 550 550)`} /><circle cx={550} cy={550} r={430} fill="none" stroke={C.blue} strokeWidth={4} strokeDasharray="200 60" transform={`rotate(${-f * 0.6} 550 550)`} /><circle cx={550} cy={550} r={340} fill="none" stroke={C.violet} strokeWidth={2} strokeDasharray="6 14" transform={`rotate(${f * 0.8} 550 550)`} /></svg>
          </div>
          <div style={{position: 'absolute', top: 190, left: 0, right: 0}}><At sec={70.1} anim="down" sfx="shimmer" sfxVol={0.35} style={{display: 'flex', justifyContent: 'center'}}><Chip color={C.amber} size={46}>الدرس الرابع · الوحدة الأولى</Chip></At></div>
          <div style={{position: 'absolute', top: 340, left: 0, right: 0}}>
            <At sec={71.2} anim="blur" sfx="impact" sfxVol={0.4} style={{}}><Shine size={170} colors={[C.cyan, '#fff']}>القضايا الأخلاقية</Shine></At>
            <At sec={73.3} anim="blur" sfx="whoosh" sfxVol={0.4} style={{}}><T size={104} w={900} style={{textShadow: `0 0 40px ${C.blue}`}}>المتعلقة بالذكاء الاصطناعي</T></At>
          </div>
          <At sec={75.0} anim="pop" sfx="success" sfxVol={0.3} style={{position: 'absolute', bottom: 150, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 40}}>
            <Ico I={Scale} size={90} color={C.amber} /><Ico I={BrainCircuit} size={90} color={C.cyan} /><Ico I={Users} size={90} color={C.green} />
          </At>
        </Beat>
      </Camera>
    </AbsoluteFill>
  );
};

const Pair: React.FC<{cx: number; sec: number; a: string; b: string}> = ({cx, sec, a, b}) => (
  <At sec={sec} out={88.8} anim="flip" dur={26} sfx="pop" style={place(cx, 290, 440)}>
    <Glass w={440} h={520} pad={0} accent={C.cyan} style={{overflow: 'hidden', display: 'flex', flexDirection: 'column'}}>
      <div style={{flex: 1, background: `${C.green}22`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10}}><Ico I={CircleCheck} size={80} color={C.green} /><T size={72} w={900} color={C.green}>{a}</T></div>
      <div style={{height: 4, background: C.cyan}} />
      <At sec={sec + 0.9} out={88.8} anim="up" dist={40} style={{flex: 1, background: `${C.red}22`, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 10}}><Ico I={CircleX} size={80} color={C.red} /><T size={72} w={900} color={C.red}>{b}</T></At>
    </Glass>
  </At>
);
export const Meaning: React.FC = () => (
  <AbsoluteFill>
    <Camera from={{s: 1}} to={{s: 1.05}} punches={[{at: 82.0, s: 1.05, fx: 400, until: 84}, {at: 85.9, s: 1.05, fx: -400, until: 88}]}>
      <At sec={78.9} out={88.8} anim="down" style={{position: 'absolute', left: 0, right: 0, top: 150}}><Words sec={79.0} size={78} words={['يعني', 'إيه', ['«قضايا', C.cyan], ['أخلاقية»؟', C.cyan]]} /></At>
      <Pair cx={X3[0]} sec={82.0} a="حلال" b="حرام" />
      <Pair cx={X3[1]} sec={84.3} a="الصح" b="الغلط" />
      <Pair cx={X3[2]} sec={85.9} a="العدل" b="الظلم" />
      {[X3[0], X3[1], X3[2]].map((_, i) => null)}
      <Beat sec={89.0} anim="zoom" style={{gap: 60, top: 40}}>
        <At sec={89.1} anim="right" sfx="pop" style={{}}><IconTile I={Bot} size={260} color={C.cyan} /></At>
        <Link sec={89.9} x1={1280} y1={500} x2={1000} y2={500} color={C.amber} />
        <At sec={90.2} anim="pop" sfx="stamp" sfxVol={0.5} style={{}}><Stamp text="قرار مصيري" color={C.amber} rot={-4} size={80} /></At>
        <Link sec={91.0} x1={820} y1={500} x2={600} y2={500} color={C.amber} />
        <At sec={91.3} anim="left" sfx="pop" style={{}}><IconTile I={Users} size={260} color={C.green} /></At>
      </Beat>
      <At sec={90.4} anim="up" style={{position: 'absolute', left: 0, right: 0, top: 800}}><T size={52} w={700} color={C.mute}>إيه المشاكل اللي بتحصل لما ياخد قرارات تخص <Col sec={92.0} color={C.green}>حياة البشر</Col>؟</T></At>
    </Camera>
  </AbsoluteFill>
);

export const Today: React.FC = () => {
  const f = useCurrentFrame();
  const jobs = [
    {I: FileText, t: 'فرز طلبات التوظيف', c: C.amber, at: 101.0},
    {I: ScanFace, t: 'التعرف على الأفراد', c: C.cyan, at: 105.0},
    {I: Database, t: 'تحليل البيانات الشخصية', c: C.violet, at: 106.9},
  ];
  return (
    <AbsoluteFill>
      <Camera from={{s: 1}} to={{s: 1.05, x: -20}} punches={[{at: 101.0, s: 1.06, fx: 400, until: 104.5}, {at: 106.9, s: 1.06, fx: -400, until: 108.2}, {at: 118.3, s: 1.06, until: 121}]}>
        {/* A: the book says */}
        <At sec={93.6} out={108.0} anim="right" sfx="whoosh_soft" style={{position: 'absolute', right: 160, top: 150}}><Chip color={C.amber} size={48}><BookOpen size={44} style={{verticalAlign: 'middle', marginLeft: 12}} />الكتاب بيقول</Chip></At>
        <At sec={96.2} out={108.0} anim="none" style={{position: 'absolute', left: 160, right: 160, top: 260}}>
          <div style={{display: 'flex', justifyContent: 'center'}}><Typewriter sec={96.2} dur={95} size={60} w={800} text={'يساعد الذكاء الاصطناعي اليوم في قرارات تؤثر على الأشخاص'} /></div>
        </At>
        {jobs.map((j, i) => <At key={i} sec={j.at} out={108.0} anim="up" dist={120} sfx="pop" style={place(X3[i], 470, 440)}><PointCard I={j.I} title={j.t} color={j.c} w={440} h={400} size={46} /></At>)}
        {/* B: not just chess */}
        <Beat sec={108.3} out={113.3} anim="zoom" style={{gap: 90}}>
          <div style={{position: 'relative'}}>
            <Ico I={Gamepad2} size={300} color={C.mute} />
            <At sec={111.0} anim="wipe" dur={14} sfx="swish_down" style={{position: 'absolute', left: -20, top: 140, width: 340, height: 14, background: C.red, transform: 'rotate(-35deg)', borderRadius: 7, boxShadow: `0 0 20px ${C.red}`}} />
          </div>
          <Words sec={108.5} size={110} words={['مش', 'بس', 'بيلعب', ['شطرنج!', C.amber]]} gap={6} />
        </Beat>
        {/* C: decides who is hired */}
        <At sec={113.6} out={122.8} anim="down" style={{position: 'absolute', left: 0, right: 0, top: 150}}><T size={76} w={900} color={C.text}>دلوقتي هو اللي <Col sec={113.9} color={C.cyan}>بيقرر</Col>…</T></At>
        <At sec={114.5} out={122.8} anim="up" sfx="success" style={place(X4[0], 330, 380)}><PointCard I={FileCheck} title="مين يتوظف" color={C.green} w={380} h={420} size={46} /></At>
        <At sec={116.2} out={122.8} anim="up" sfx="error" style={place(X4[1], 330, 380)}><PointCard I={FileX} title="ومين يترفض" color={C.red} w={380} h={420} size={46} /></At>
        <At sec={117.7} out={122.8} anim="up" sfx="scan" style={place(X4[2], 330, 380)}><PointCard I={Cam} title="كاميرات بتتعرف على وشوشنا" color={C.cyan} w={380} h={420} size={40} /></At>
        <At sec={120.8} out={122.8} anim="up" sfx="blip" style={place(X4[3], 330, 380)}><PointCard I={Database} title="والنظام بيحلل بياناتنا" color={C.violet} w={380} h={420} size={40} /></At>
        {/* D: fair or unfair? */}
        <Beat sec={123.0} anim="zoom" style={{top: 40}}>
          <div style={{position: 'absolute', left: 1030, top: 200}}><Scales tilt={Math.sin(f * 0.07) * 9} size={720} color={C.cyan} left={<Ico I={CircleCheck} size={100} color={C.green} />} right={<Ico I={CircleX} size={100} color={C.red} />} /></div>
          <Sfx name="whoosh_soft" at={123.0} vol={0.4} />
          <div style={{position: 'absolute', left: 140, top: 250, width: 800}}>
            <At sec={123.4} anim="right" sfx="tick" style={{}}><T size={90} w={900} align="right">هل ده بيحصل <Hl sec={124.4} color={C.green}>بعدل</Hl></T></At>
            <At sec={125.0} anim="right" sfx="tick" style={{}}><T size={90} w={900} align="right">ولا <Hl sec={125.3} color={C.red}>بظلم</Hl>؟</T></At>
          </div>
          <At sec={127.3} anim="pop" sfx="alert" style={{position: 'absolute', left: 150, top: 660}}><Glass accent={C.amber} w={380} pad={24} style={{display: 'flex', alignItems: 'center', gap: 20}}><Ico I={Shuffle} size={80} color={C.amber} /><T size={50} w={800}>تلاعب؟</T></Glass></At>
          <At sec={129.0} anim="pop" sfx="alert" style={{position: 'absolute', left: 150, top: 810}}><Glass accent={C.red} w={560} pad={24} style={{display: 'flex', alignItems: 'center', gap: 20}}><Ico I={Unlock} size={80} color={C.red} /><T size={50} w={800}>اختراق لمعلوماتنا؟</T></Glass></At>
        </Beat>
      </Camera>
    </AbsoluteFill>
  );
};
