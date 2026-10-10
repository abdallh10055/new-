import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Settings2, FileCode2, SlidersHorizontal, Shuffle, Briefcase, Hourglass, GraduationCap, IdCard, Shield, Landmark, Users, Globe, Cpu, Ban, UserRound, Clock, Home, Brain, MessagesSquare, FileText, Magnet, TriangleAlert, FlipHorizontal2, Check, X, Lock, Code, BookOpen, CircleHelp, Scale} from 'lucide-react';
import {C, FONT} from '../config';
import {At, Beat} from '../components/At';
import {Camera} from '../components/Camera';
import {Sfx} from '../components/Sfx';
import {Bubble, Chip, PointCard, Scales, Typing} from '../components/widgets';
import {Col, Glass, Hl, Ico, IconTile, Link, Pulse, SectionTitle, Shine, Stamp, T, Typewriter, Words} from '../components/ui';
import {useCue} from '../lib/ctx';
import {ease, prog, sp, lerp} from '../lib/anim';
import {X3, X4, place, Num} from './s3_core';

const Title: React.FC<{sec: number; out: number; num: string; kicker: string; title: string; sub?: string; I: any; color?: string}> = ({sec, out, ...r}) => (
  <At sec={sec} out={out} anim="none" exit="zoom" style={{position: 'absolute', inset: 0}}>
    <Sfx name="impact" at={sec + 0.1} vol={0.5} /><Sfx name="whoosh" at={sec} vol={0.4} />
    <SectionTitle sec={sec} {...r} />
  </At>
);
const Top: React.FC<{sec: number; out: number; children: React.ReactNode; y?: number}> = ({sec, out, children, y = 140}) => (
  <At sec={sec} out={out} anim="down" style={{position: 'absolute', left: 0, right: 0, top: y, display: 'flex', justifyContent: 'center'}}>{children}</At>
);

const CODE = ['def score(person):', '    if person.group == "A":', '        return 100   # مفضّل', '    return 40', ''];
export const Cause2: React.FC = () => {
  const f = useCurrentFrame();
  const tilt = (() => { const e = useCue(397.0); return sp(e, 10, 70, 1.1) * 13; })();
  const bar = (sec: number, v: number, c: string, label: string, sub: string, x: number, ok: boolean) => (
    <At sec={sec} out={474.6} anim="up" sfx="pop" style={place(x, 330, 360)}>
      <Glass accent={c} w={360} h={520} pad={24} style={{textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <div style={{height: 280, display: 'flex', alignItems: 'flex-end'}}><div style={{width: 150, height: 280 * v * ease(prog(useCue(sec + 0.4), 30)), background: `linear-gradient(0deg, ${c}, ${c}66)`, borderRadius: 16, boxShadow: `0 0 30px ${c}88`}} /></div>
        <T size={64} w={900} color={c}>{label}</T><T size={40} w={600} color={C.mute}>{sub}</T>
        <At sec={sec + 1.6} anim="pop" sfx={ok ? 'success' : 'error'} sfxVol={0.4} style={{position: 'absolute', top: -30, left: -26}}><div style={{width: 80, height: 80, borderRadius: '50%', background: ok ? C.green : C.red, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 30px ${ok ? C.green : C.red}`}}>{ok ? <Check size={52} color="#06102a" strokeWidth={4} /> : <X size={52} color="#06102a" strokeWidth={4} />}</div></At>
      </Glass>
    </At>
  );
  const recap = [
    {I: SlidersHorizontal, t: 'المتغير', s: 'الخبرة · العمر · الدرجة العلمية', c: C.green, at: 480.7, ok: true},
    {I: Shuffle, t: 'متغير بديل غير مناسب', s: 'يمثّل صفة محمية بشكل خفي', c: C.red, at: 488.6, ok: false},
    {I: Shield, t: 'الصفات المحمية', s: 'العمر · الدين · البلد', c: C.amber, at: 493.4, ok: false},
  ];
  return (
    <AbsoluteFill>
      <Camera from={{s: 1}} to={{s: 1.05}} punches={[{at: 397.0, s: 1.05, until: 402}, {at: 443.0, s: 1.07, until: 445.6}, {at: 468.5, s: 1.06, until: 473}, {at: 504.0, s: 1.06, until: 507}]}>
        <Title sec={389.0} out={394.3} num="2" kicker="السبب الثاني" title="تصميم النظام" sub="Design Bias" I={Settings2} color={C.violet} />
        {/* 2 – we program it to prefer */}
        <Top sec={394.6} out={403.9}><Words sec={394.7} size={64} gap={5} words={['نبرمج', 'الذكاء', 'الاصطناعي', 'بطريقة', ['تخليه', C.violet], ['يفضّل', C.violet], 'شخص', 'عن', 'شخص', 'أو', 'بلد', 'عن', 'بلد']} /></Top>
        <At sec={396.0} out={403.9} anim="left" dist={120} sfx="whoosh_soft" style={{position: 'absolute', left: 130, top: 330}}>
          <Glass accent={C.violet} w={820} h={470} pad={0} style={{overflow: 'hidden'}}>
            <div style={{height: 54, background: '#00000044', display: 'flex', alignItems: 'center', gap: 10, padding: '0 22px'}}>{[C.red, C.amber, C.green].map((c) => <div key={c} style={{width: 16, height: 16, borderRadius: '50%', background: c}} />)}<span style={{fontFamily: 'monospace', color: C.mute, marginLeft: 16, fontSize: 24}}>model.py</span></div>
            <pre dir="ltr" style={{margin: 0, padding: '26px 32px', fontFamily: 'monospace', fontSize: 40, lineHeight: 1.7, color: '#cfe8ff'}}>
              {CODE.map((l, i) => { const e = useCue(396.6 + i * 0.7); return <div key={i} style={{opacity: e < 0 ? 0 : 1, color: i === 2 ? C.amber : i === 1 ? C.violet : undefined, background: i === 2 && e > 0 ? `${C.red}22` : undefined}}>{l.slice(0, Math.max(0, Math.round(e * 1.6)))}</div>; })}
            </pre>
          </Glass>
        </At>
        <At sec={397.0} out={403.9} anim="zoom" style={{position: 'absolute', left: 1000, top: 330}}><Scales tilt={tilt} size={720} color={C.violet} left={<Ico I={UserRound} size={110} color={C.green} />} right={<Ico I={UserRound} size={110} color={C.dim} />} /></At>
        {/* python */}
        <Top sec={404.2} out={413.0}><Chip color={C.amber} size={50}>ملاحظة</Chip></Top>
        <At sec={404.6} out={413.0} anim="pop" sfx="pop" style={place(1250, 340, 520)}><Glass accent={C.cyan} w={520} h={470} pad={30} style={{textAlign: 'center'}}><Ico I={FileCode2} size={140} color={C.cyan} /><T latin size={92} w={900} color={C.cyan}>Python</T><T size={42} w={600} color={C.mute}>من أكثر لغات الذكاء الاصطناعي استخدامًا</T></Glass></At>
        <At sec={409.4} out={413.0} anim="pop" sfx="success" style={{position: 'absolute', left: 1020, top: 330}}><div style={{width: 100, height: 100, borderRadius: '50%', background: C.green, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 36px ${C.green}`}}><Check size={66} color="#06102a" strokeWidth={4} /></div></At>
        <At sec={410.0} out={413.0} anim="left" sfx="whoosh_soft" style={place(560, 340, 640)}><Glass accent={C.amber} w={640} h={470} pad={30} style={{textAlign: 'center'}}><Ico I={Settings2} size={140} color={C.amber} /><T size={64} w={900} color={C.amber}>التحيز من طريقة التصميم</T><T size={42} w={600} color={C.mute}>مش من اللغة نفسها</T></Glass></At>
        {/* book */}
        <At sec={413.3} out={421.9} anim="right" style={{position: 'absolute', right: 180, top: 140}}><Chip color={C.cyan} size={46}><BookOpen size={42} style={{verticalAlign: 'middle', marginLeft: 12}} />الكتاب بيقول</Chip></At>
        <At sec={414.0} out={421.9} anim="up" sfx="pop" style={place(1250, 330, 560)}><PointCard I={SlidersHorizontal} title="اختيار غير مناسب للمتغيرات" color={C.violet} w={560} h={400} size={52} /></At>
        <At sec={416.6} out={421.9} anim="up" sfx="pop" style={place(640, 330, 560)}><PointCard I={Shuffle} title="متغير بديل يمثّل بشكل غير مناسب صفة محمية" color={C.amber} w={560} h={400} size={46} /></At>
        <At sec={419.8} out={421.9} anim="pop" sfx="alert" style={{position: 'absolute', left: 0, right: 0, top: 790, display: 'flex', justifyContent: 'center'}}><T size={96} w={900} color={C.amber}>إيه الكلام ده؟ 🤔</T></At>
        {/* variable */}
        <Top sec={422.3} out={432.3}><Chip color={C.green} size={54}>يعني إيه «متغير»؟</Chip></Top>
        <At sec={423.0} out={432.3} anim="none" style={{position: 'absolute', left: 0, right: 0, top: 270}}><Words sec={423.1} size={62} gap={5} words={['معلومة', 'أو', 'صفة', ['بنبني', C.green], 'النظام', ['عليها', C.green]]} /></At>
        {[{I: Briefcase, t: 'الخبرة', at: 426.0}, {I: Hourglass, t: 'العمر', at: 427.9}, {I: GraduationCap, t: 'الدرجة العلمية', at: 429.2}, {I: IdCard, t: 'معلومات شخصية', at: 430.8}].map((v, i) => <At key={i} sec={v.at} out={432.3} anim="up" dist={100} sfx="pop" style={place(X4[i], 450, 380)}><PointCard I={v.I} title={v.t} color={C.green} w={380} h={320} size={50} /></At>)}
        {/* protected */}
        <Top sec={432.6} out={445.7}><Chip color={C.amber} size={54}><Shield size={50} style={{verticalAlign: 'middle', marginLeft: 12}} />الصفة المحمية</Chip></Top>
        <At sec={433.4} out={438.4} anim="none" style={{position: 'absolute', left: 0, right: 0, top: 290}}><T size={58} w={700} color={C.mute}>معلومة عن <Col sec={438.6} color={C.amber}>الدين</Col> أو <Col sec={439.7} color={C.amber}>النوع</Col> أو <Col sec={440.8} color={C.amber}>البلد</Col> اللي إنت متواجد فيها</T></At>
        {[{I: Landmark, t: 'الدين', at: 438.5}, {I: Users, t: 'النوع', at: 439.6}, {I: Globe, t: 'البلد', at: 440.7}].map((v, i) => <At key={i} sec={v.at} out={445.7} anim="drop" sfx="pop" style={place(X3[i], 310, 380)}><PointCard I={v.I} title={v.t} color={C.amber} w={380} h={300} size={64} /></At>)}
        <Link sec={441.9} out={445.7} x1={960} y1={640} x2={960} y2={740} color={C.red} />
        <At sec={442.0} out={445.7} anim="pop" sfx="blip" style={place(960, 740, 200)}><IconTile I={Cpu} size={180} color={C.cyan} /></At>
        <At sec={443.0} out={445.7} anim="drop" sfx="stamp" sfxVol={0.6} style={place(1330, 780, 400)}><Stamp text="ممنوع ✗" size={80} rot={-6} /></At>
        <At sec={443.4} out={445.7} anim="up" style={{position: 'absolute', left: 120, top: 800, width: 640}}><T size={46} w={800} align="right">ممنوع AI يبني قرارات عليها</T></At>
        {/* example country */}
        <Top sec={446.0} out={457.0}><T size={60} w={800}>مينفعش AI يقول: <Col sec={449.6} color={C.red}>فلان من مصر… مش هديله ميزة</Col></T></Top>
        <At sec={447.4} out={457.0} anim="right" sfx="pop" style={place(1400, 330, 400)}><Glass accent={C.cyan} w={400} h={400} pad={24} style={{textAlign: 'center'}}><Ico I={UserRound} size={150} color={C.cyan} /><T size={46} w={800}>فلان</T><Chip color={C.amber} size={38}><Globe size={34} style={{verticalAlign: 'middle', marginLeft: 8}} />البلد: مصر</Chip></Glass></At>
        <Link sec={450.4} out={457.0} x1={1180} y1={520} x2={1020} y2={520} color={C.amber} />
        <At sec={450.8} out={457.0} anim="pop" sfx="blip" style={place(900, 430, 200)}><IconTile I={Cpu} size={190} color={C.cyan} /></At>
        <Link sec={452.0} out={457.0} x1={780} y1={520} x2={640} y2={520} color={C.red} />
        <At sec={452.6} out={457.0} anim="left" sfx="error" style={place(470, 360, 330)}><PointCard I={X} title="مش هديله ميزة" color={C.red} w={330} h={340} size={44} /></At>
        <At sec={455.0} out={457.0} anim="drop" sfx="stamp" sfxVol={0.5} style={place(960, 790, 300)}><Stamp text="تحيّز!" size={100} rot={-4} /></At>
        {/* office hours */}
        <Top sec={457.2} out={474.6}><Chip color={C.violet} size={50}><Clock size={46} style={{verticalAlign: 'middle', marginLeft: 12}} />مثال: عدد ساعات البقاء في المكتب</Chip></Top>
        {bar(462.6, 1.0, C.cyan, '10 ساعات', 'مقبول', 1230, true)}
        {bar(464.2, 0.58, C.amber, '6 ساعات', 'مرفوض', 690, false)}
        <At sec={466.4} out={474.6} anim="up" sfx="pop" style={{position: 'absolute', left: 130, top: 440, width: 380}}><Glass accent={C.amber} pad={20} style={{textAlign: 'center'}}><Ico I={Home} size={70} color={C.amber} /><T size={40} w={700}>مسؤوليات عائلية</T></Glass></At>
        <At sec={468.5} out={474.6} anim="drop" sfx="stamp" sfxVol={0.6} style={{position: 'absolute', left: 0, right: 0, top: 870, display: 'flex', justifyContent: 'center'}}><Stamp text="ظلم للسيدات" size={64} rot={-3} /></At>
        {/* recap */}
        <Top sec={475.0} out={507.5}><Chip color={C.violet} size={50}>الخلاصة</Chip></Top>
        {recap.map((r, i) => <At key={i} sec={r.at} anim="up" dist={110} sfx="pop" style={place(X3[i], 300, 440)}><div style={{position: 'relative'}}><PointCard I={r.I} title={r.t} sub={r.s} color={r.c} w={440} h={470} size={52} /><div style={{position: 'absolute', top: -26, left: -22}}><At sec={r.at + 1.2} anim="pop" sfx={r.ok ? 'success' : 'error'} sfxVol={0.35} style={{}}><div style={{width: 64, height: 64, borderRadius: '50%', background: r.ok ? C.green : C.red, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>{r.ok ? <Check size={42} color="#06102a" strokeWidth={4} /> : <X size={42} color="#06102a" strokeWidth={4} />}</div></At></div></div></At>)}
        <At sec={504.0} anim="drop" sfx="stamp" sfxVol={0.6} style={{position: 'absolute', left: 0, right: 0, top: 850, display: 'flex', justifyContent: 'center'}}><Stamp text="لو جرّب عليها → يبقى فيه تحيّز" size={64} rot={-2} /></At>
      </Camera>
    </AbsoluteFill>
  );
};

export const Cause3: React.FC = () => {
  const f = useCurrentFrame();
  const typing = useCue(533.4) > 0 && useCue(534.3) < 0;
  return (
    <AbsoluteFill>
      <Camera from={{s: 1}} to={{s: 1.06}} punches={[{at: 534.3, s: 1.06, fy: 100, until: 539}, {at: 541.2, s: 1.08, until: 548}, {at: 549.4, s: 1.1, until: 554.5, rot: 0.8}]}>
        <Title sec={507.7} out={510.2} num="3" kicker="السبب الثالث" title="طريقة الاستخدام" sub="السياق · Context Bias" I={MessagesSquare} color={C.amber} />
        {/* definition */}
        <Top sec={510.5} out={521.0}><Words sec={510.6} size={66} gap={5} words={[['السياق', C.amber], '=', 'المعلومات', 'الموجودة', 'عند', 'الذكاء', 'الاصطناعي']} /></Top>
        <At sec={512.4} out={521.0} anim="pop" sfx="blip" style={place(960, 400, 300)}><IconTile I={Brain} size={300} color={C.violet} /></At>
        <Link sec={517.6} out={521.0} x1={1380} y1={540} x2={1130} y2={540} color={C.cyan} />
        <At sec={517.4} out={521.0} anim="right" sfx="pop" style={place(1560, 400, 340)}><PointCard I={UserRound} title="إنت اللي أديتهاله" color={C.cyan} w={340} h={300} size={42} /></At>
        <Link sec={520.0} out={521.0} x1={540} y1={540} x2={790} y2={540} color={C.green} />
        <At sec={519.6} out={521.0} anim="left" sfx="pop" style={place(360, 400, 340)}><PointCard I={Globe} title="بحث عنها في الإنترنت" color={C.green} w={340} h={300} size={42} /></At>
        {/* problem – mirror */}
        <Top sec={521.3} out={529.2}><Words sec={521.4} size={60} gap={5} words={['ممكن', 'تطلع', 'قرارات', ['تؤيد', C.amber], 'وجهة', 'نظرك', 'إنت', 'بس']} /></Top>
        <At sec={523.0} out={529.2} anim="right" sfx="pop" style={place(1420, 380, 340)}><PointCard I={UserRound} title="رأيك" color={C.cyan} w={340} h={320} size={58} /></At>
        <At sec={524.2} out={529.2} anim="pop" sfx="blip" style={place(960, 410, 260)}><IconTile I={FlipHorizontal2} size={260} color={C.violet} /></At>
        <At sec={525.4} out={529.2} anim="left" sfx="pop" style={place(500, 380, 340)}><PointCard I={UserRound} title="نفس رأيك!" color={C.cyan} w={340} h={320} size={50} /></At>
        <At sec={527.0} out={529.2} anim="up" style={{position: 'absolute', left: 0, right: 0, top: 790, display: 'flex', justifyContent: 'center'}}><T size={70} w={900}>حتى لو كانت <Hl sec={527.2} color={C.red}>غلط</Hl></T></At>
        {/* chat */}
        <At sec={529.4} out={540.0} anim="up" dist={90} sfx="whoosh_soft" style={{position: 'absolute', left: 260, top: 190, width: 1400}}>
          <Glass accent={C.blue} w={1400} pad={36}>
            <div style={{display: 'flex', alignItems: 'center', gap: 14, justifyContent: 'flex-end', marginBottom: 20}}><T size={36} w={800} color={C.blue}>محادثة مع الذكاء الاصطناعي</T><Brain size={42} color={C.blue} /></div>
            <Bubble sec={529.6} me size={50} w={1000}>أنا من أمريكا ومش بحب المسلمين</Bubble>
            <div style={{height: 22}} />
            {typing ? <Typing /> : null}
            <Bubble sec={534.3} color={C.red} size={50} w={1100}>معاك حق! وده الدليل 👇</Bubble>
            <div style={{display: 'flex', gap: 24, justifyContent: 'flex-end', marginTop: 24}}>
              {[0, 1, 2].map((i) => <At key={i} sec={536.7 + i * 0.5} anim="pop" sfx="tick" style={{}}><Glass w={300} accent={C.amber} pad={18} style={{textAlign: 'center'}}><FileText size={54} color={C.amber} /><T size={34} w={700}>شاهد {i + 1}</T></Glass></At>)}
            </div>
          </Glass>
        </At>
        <At sec={538.2} out={540.0} anim="drop" sfx="stamp" sfxVol={0.6} style={{position: 'absolute', left: 520, top: 760}}><Stamp text="شواهد وهمية!" size={78} rot={-6} /></At>
        {/* confirmation bias */}
        <Beat sec={540.2} out={549.2} anim="zoom" exit="zoom" style={{flexDirection: 'column', gap: 24}}>
          <div style={{position: 'absolute', left: 960 - 400, top: 540 - 400, width: 800, height: 800}}><Pulse color={C.amber} size={800} n={3} period={90} /></div>
          <At sec={540.4} anim="pop" sfx="riser" sfxVol={0.3} style={{}}><Ico I={Magnet} size={170} color={C.amber} /></At>
          <At sec={541.2} anim="blur" sfx="impact" sfxVol={0.4} style={{}}><Shine size={190} colors={[C.amber, '#fff']}>التحيّز التأكيدي</Shine></At>
          <At sec={543.0} anim="up" style={{}}><T latin size={80} w={700} color={C.mute}>Confirmation Bias</T></At>
        </Beat>
        {/* danger */}
        <Beat sec={549.3} anim="zoom" style={{flexDirection: 'column', gap: 24}}>
          <div style={{position: 'absolute', left: 960 - 500, top: 540 - 500, width: 1000, height: 1000}}><Pulse color={C.red} size={1000} n={4} period={60} /></div>
          <At sec={549.4} anim="drop" sfx="alert" style={{}}><Ico I={TriangleAlert} size={230} color={C.red} /></At>
          <At sec={549.7} anim="up" style={{}}><T size={110} w={900} color={C.red}>وده خطير جدًا!</T></At>
          <At sec={551.6} anim="up" style={{}}><T size={62} w={800}>لأنه بيعزّز <Col sec={552.4} color={C.red}>الأفكار المتطرفة</Col></T></At>
        </Beat>
      </Camera>
    </AbsoluteFill>
  );
};
