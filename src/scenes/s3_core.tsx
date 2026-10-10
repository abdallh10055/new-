import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {Database, Settings2, MousePointerClick, Flag, Scale, Cpu, FileX, UserRound, Lock, Eye, Gavel, TriangleAlert, Compass, KeyRound, Lightbulb, ScanSearch, MessageSquareText, UserCheck, ShieldCheck, RotateCw, BookOpen, Repeat, Bot, Star, Check, CircleHelp, Copy} from 'lucide-react';
import {C, FONT} from '../config';
import {At, Beat} from '../components/At';
import {Camera} from '../components/Camera';
import {Sfx} from '../components/Sfx';
import {BlackBox, Bubble, Chip, PointCard, Scales, Typing} from '../components/widgets';
import {Col, GlitchText, Glass, Hl, Ico, IconTile, Link, Pulse, Shine, Stamp, T, Typewriter, Words} from '../components/ui';
import {useCue} from '../lib/ctx';
import {ease, prog, sp} from '../lib/anim';

export const X3 = [1450, 960, 470];
export const X4 = [1590, 1170, 750, 330];
export const place = (cx: number, top: number, w: number): React.CSSProperties => ({position: 'absolute', left: cx - w / 2, top});
export const Num: React.FC<{n: string; c: string}> = ({n, c}) => (
  <div style={{position: 'absolute', top: -32, right: 26, width: 66, height: 66, borderRadius: '50%', background: c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontWeight: 900, fontSize: 40, color: '#06102a', boxShadow: `0 0 26px ${c}`}}>{n}</div>
);

export const Warning: React.FC = () => {
  const f = useCurrentFrame();
  const src = [
    {I: Database, t: 'البيانات', c: C.cyan, at: 136.8},
    {I: Settings2, t: 'تصميم النظام', c: C.violet, at: 138.3},
    {I: MousePointerClick, t: 'استخدامه', c: C.amber, at: 140.0},
  ];
  const cyc = [
    {t: 'بيانات غلط', c: C.cyan, x: 960, y: 330, at: 168.7},
    {t: 'قرارات غلط', c: C.amber, x: 1400, y: 540, at: 170.4},
    {t: 'ضرر للناس', c: C.red, x: 960, y: 760, at: 172.0},
    {t: 'تحيز أكبر', c: C.violet, x: 520, y: 540, at: 173.4},
  ];
  const ec = useCue(168.4);
  return (
    <AbsoluteFill>
      <Camera from={{s: 1}} to={{s: 1.05}} punches={[{at: 136.8, s: 1.05, fx: 400, until: 139}, {at: 142.6, s: 1.07, until: 144.8}, {at: 162.0, s: 1.06, fx: 300, until: 164.4}, {at: 166.4, s: 1.07, until: 168.1}]}>
        {/* A – the book warns */}
        <At sec={131.5} out={144.9} anim="right" sfx="whoosh_soft" style={{position: 'absolute', right: 160, top: 130}}><Chip color={C.red} size={46}><BookOpen size={42} style={{verticalAlign: 'middle', marginLeft: 12}} />الكتاب بيحذر</Chip></At>
        <At sec={132.8} out={144.9} anim="none" style={{position: 'absolute', left: 160, right: 160, top: 230}}><div style={{display: 'flex', justifyContent: 'center'}}><Typewriter sec={132.8} dur={110} size={52} w={800} text={'قد تنتج عنه نتائج غير عادلة إذا كانت البيانات أو طريقة\nتصميم النظام أو استخدامه منحازة'} align="center" /></div></At>
        {src.map((s, i) => (
          <At key={i} sec={s.at} out={144.9} anim="up" dist={110} sfx="pop" style={place(X3[i], 440, 430)}>
            <PointCard I={s.I} title={s.t} color={s.c} w={430} h={330} size={54} />
            <At sec={s.at + 1.1} anim="drop" sfx="stamp" sfxVol={0.35} style={{position: 'absolute', left: 20, top: -26}}><Stamp text="منحاز" size={40} rot={-8} /></At>
          </At>
        ))}
        <At sec={142.6} out={144.9} anim="pop" sfx="error" style={{position: 'absolute', left: 0, right: 0, top: 830, display: 'flex', justifyContent: 'center'}}><Glass accent={C.red} pad={20} style={{display: 'flex', gap: 24, alignItems: 'center'}}><Ico I={Scale} size={70} color={C.red} /><T size={58} w={900} color="#ffd3da">= نتائج غير عادلة</T></Glass></At>
        {/* B – flow */}
        <At sec={145.1} out={149.2} anim="right" sfx="pop" style={place(X3[0], 360, 330)}><PointCard I={Database} title="بيانات غلط أو متحيزة" color={C.red} w={330} h={380} size={44} /></At>
        <Link sec={145.9} out={149.2} x1={1270} y1={540} x2={1150} y2={540} color={C.red} />
        <At sec={146.2} out={149.2} anim="pop" sfx="blip" style={place(X3[1], 380, 260)}><IconTile I={Cpu} size={260} color={C.cyan} /></At>
        <Link sec={147.0} out={149.2} x1={800} y1={540} x2={680} y2={540} color={C.red} />
        <At sec={147.4} out={149.2} anim="left" sfx="error" style={place(X3[2], 360, 330)}><PointCard I={FileX} title="هيطلع لنا نتائج غلط" color={C.red} w={330} h={380} size={44} /></At>
        {/* C – October war example */}
        <At sec={149.5} out={152.3} anim="down" style={{position: 'absolute', left: 0, right: 0, top: 380}}><Shine size={100} colors={[C.amber, '#fff']}>زي ما قلنا قبل كده…</Shine></At>
        <At sec={152.6} out={168.1} anim="left" dist={140} sfx="whoosh_soft" style={{position: 'absolute', left: 120, top: 220}}>
          <Glass accent={C.cyan} w={660} h={470} pad={30} style={{position: 'relative'}}>
            <div style={{display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'flex-end'}}><T size={42} w={800} color={C.cyan}>بيانات التدريب</T><Database size={48} color={C.cyan} /></div>
            <div style={{height: 3, background: `${C.cyan}55`, margin: '18px 0'}} />
            <At sec={154.0} anim="wipe" dur={30} sfx="type" style={{}}><T size={56} w={800} align="right" lh={1.5}>حرب أكتوبر 1973 <br /><Col sec={156.3} color={C.red}>انتهت بدون فائز</Col></T></At>
            <At sec={166.4} anim="drop" sfx="stamp" sfxVol={0.6} style={{position: 'absolute', left: 120, top: 280}}><Stamp text="بيانات غلط ✗" size={64} rot={-9} /></At>
          </Glass>
        </At>
        <At sec={157.6} out={168.1} anim="right" dist={140} sfx="whoosh_soft" style={{position: 'absolute', left: 840, top: 220}}>
          <Glass accent={C.blue} w={960} h={470} pad={30}>
            <div style={{display: 'flex', alignItems: 'center', gap: 14, justifyContent: 'flex-end', marginBottom: 20}}><T size={38} w={800} color={C.blue}>اسأل النظام</T><Bot size={44} color={C.blue} /></div>
            <Bubble sec={158.2} me size={46}>مين انتصر في حرب أكتوبر؟</Bubble>
            <div style={{height: 22}} />
            {useCue(160.4) > 0 && useCue(161.8) < 0 ? <Typing /> : null}
            <Bubble sec={161.8} color={C.red} size={52}>مفيش فائز!</Bubble>
          </Glass>
        </At>
        <At sec={164.7} out={168.1} anim="up" style={{position: 'absolute', left: 0, right: 0, top: 760}}><T size={62} w={800} color={C.mute}>ده مش لأن <Hl sec={165.0} color={C.red}>الآلة غبية</Hl></T></At>
        <At sec={166.2} out={168.1} anim="up" style={{position: 'absolute', left: 0, right: 0, top: 860}}><T size={62} w={900}>لأن <Hl sec={166.5} color={C.amber}>البيانات اللي اتدربت عليها كانت غلط</Hl></T></At>
        {/* D – vicious circle */}
        <At sec={168.3} anim="down" style={{position: 'absolute', left: 0, right: 0, top: 130}}><T size={60} w={900}>والنتيجة دي <Col sec={169.0} color={C.red}>بتضرنا</Col> و<Col sec={173.0} color={C.violet}>بتزود التحيز</Col></T></At>
        <div style={{position: 'absolute', left: 960 - 90, top: 540 - 90, transform: `rotate(${f * 3}deg)`, opacity: ec > 0 ? 1 : 0}}><Ico I={RotateCw} size={180} color={C.dim} /></div>
        <Link sec={169.6} x1={1210} y1={360} x2={1360} y2={460} color={C.cyan} curve={30} />
        <Link sec={171.3} x1={1380} y1={620} x2={1180} y2={730} color={C.amber} curve={30} />
        <Link sec={172.9} x1={780} y1={760} x2={600} y2={640} color={C.red} curve={30} />
        <Link sec={174.3} x1={520} y1={450} x2={740} y2={340} color={C.violet} curve={30} />
        {cyc.map((n, i) => <At key={i} sec={n.at} anim="pop" sfx="pop" style={{position: 'absolute', left: n.x - 190, top: n.y - 70}}><Glass w={380} accent={n.c} pad={22} style={{textAlign: 'center'}}><T size={54} w={900} color={n.c}>{n.t}</T></Glass></At>)}
      </Camera>
    </AbsoluteFill>
  );
};

export const BlackBox1: React.FC = () => {
  const f = useCurrentFrame();
  const inbox = useCue(185.0);
  const cardX = 1520 - ease(prog(useCue(183.0), 30)) * 360 - ease(prog(inbox, 20)) * 100;
  const cardOp = inbox > 14 ? 0 : 1;
  return (
    <AbsoluteFill>
      <Camera from={{s: 1}} to={{s: 1.06}} punches={[{at: 183.0, s: 1.06, until: 186.5}, {at: 187.8, s: 1.07, fx: -400, until: 191}]}>
        <At sec={175.8} out={193.4} anim="blur" style={{position: 'absolute', left: 0, right: 0, top: 130}}><Words sec={175.9} size={84} words={['المشكلة', 'الأكبر:', ['مشكلة', C.cyan], ['الصندوق', C.cyan], ['الأسود', C.cyan]]} gap={6} /></At>
        <At sec={176.2} out={193.4} anim="zoom" dur={30} sfx="sub_drop" style={place(960, 300, 380)}><BlackBox size={380} /></At>
        <At sec={176.4} out={193.4} anim="none" style={{position: 'absolute', left: 960 - 400, top: 260, width: 800, height: 520, pointerEvents: 'none'}}><Pulse color={C.cyan} size={700} n={2} period={90} /></At>
        {/* applicant goes in */}
        <At sec={183.0} out={185.8} anim="right" dist={160} sfx="whoosh" style={{position: 'absolute', left: cardX - 150, top: 330, opacity: cardOp}}>
          <Glass accent={C.green} w={300} pad={20} style={{textAlign: 'center'}}><Ico I={UserRound} size={90} color={C.green} /><T size={36} w={800}>متقدم كفء جداً</T><div style={{display: 'flex', justifyContent: 'center', gap: 4}}>{[0, 1, 2, 3, 4].map((i) => <Star key={i} size={28} color={C.amber} fill={C.amber} />)}</div></Glass>
        </At>
        <Link sec={187.6} out={193.4} x1={760} y1={500} x2={560} y2={500} color={C.red} />
        <At sec={188.0} out={193.4} anim="drop" sfx="error" style={place(430, 380, 400)}><Stamp text="مرفوض ✗" size={88} rot={-6} /></At>
        <At sec={187.9} out={193.4} anim="pop" style={place(430, 280, 200)}><Glass accent={C.red} w={300} pad={14} style={{textAlign: 'center'}}><T size={36} w={700} color={C.mute}>النتيجة</T></Glass></At>
        {/* "why?" */}
        <At sec={191.7} out={193.4} anim="right" sfx="pop" style={{position: 'absolute', left: 1180, top: 720, width: 560}}><Bubble sec={191.7} me size={46}>ليه رفضتني؟</Bubble></At>
        <At sec={192.6} out={193.4} anim="left" sfx="glitch" style={{position: 'absolute', left: 200, top: 740}}><Glass accent={C.red} pad={20}><GlitchText size={80} color={C.red} sec={192.6}>؟؟؟</GlitchText></Glass></At>
        {/* four hard questions */}
        <At sec={193.6} anim="down" style={{position: 'absolute', left: 0, right: 0, top: 150}}><T size={62} w={800} color={C.mute}>ده بيثير أسئلة خطيرة عن…</T></At>
        {[
          {I: Scale, t: 'العدالة', c: C.cyan, at: 194.5},
          {I: Lock, t: 'الخصوصية', c: C.violet, at: 195.6},
          {I: Eye, t: 'الشفافية', c: C.green, at: 196.7},
          {I: Gavel, t: 'المساءلة', c: C.amber, at: 197.6},
        ].map((q, i) => <At key={i} sec={q.at} anim="drop" sfx="pop" style={place(X4[i], 330, 380)}><PointCard I={q.I} title={q.t} color={q.c} w={380} h={420} size={64} /></At>)}
      </Camera>
    </AbsoluteFill>
  );
};

export const MainQ: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Camera from={{s: 1}} to={{s: 1.05}} punches={[{at: 201.9, s: 1.06, fy: -120, until: 207.5}, {at: 208.4, s: 1.06, fy: 120, until: 214}]}>
        <At sec={198.5} anim="zoom" sfx="riser" sfxVol={0.4} style={{position: 'absolute', left: 0, right: 0, top: 120, display: 'flex', justifyContent: 'center'}}><Chip color={C.amber} size={60}><KeyRound size={56} style={{verticalAlign: 'middle', marginLeft: 14}} />السؤال الرئيسي</Chip></At>
        <div style={{position: 'absolute', left: 960 - 260, top: 540 - 380, fontFamily: "'Montserrat Aqlani'", fontWeight: 900, fontSize: 760, lineHeight: 1, color: 'transparent', WebkitTextStroke: `4px ${C.amber}33`, opacity: ease(prog(useCue(198.6), 30)), transform: `rotate(${Math.sin(f * 0.03) * 4}deg)`}}>?</div>
        <At sec={201.9} anim="right" sfx="whoosh_soft" style={{position: 'absolute', left: 200, right: 200, top: 300}}>
          <Glass accent={C.cyan} pad={40} style={{display: 'flex', alignItems: 'center', gap: 40}}>
            <IconTile I={TriangleAlert} color={C.amber} size={140} />
            <Typewriter sec={202.2} dur={85} size={58} w={800} text={'ما القضايا الأخلاقية التي تنشأ مع\nانتشار الذكاء الاصطناعي؟'} />
          </Glass>
        </At>
        <At sec={208.3} anim="left" sfx="whoosh_soft" style={{position: 'absolute', left: 200, right: 200, top: 600}}>
          <Glass accent={C.green} pad={40} style={{display: 'flex', alignItems: 'center', gap: 40}}>
            <IconTile I={Compass} color={C.green} size={140} />
            <Typewriter sec={208.6} dur={90} size={58} w={800} text={'وما المبادئ التي ينبغي أن توجّه\nكيفية استخدامنا له؟'} />
          </Glass>
        </At>
      </Camera>
    </AbsoluteFill>
  );
};

const NumCard: React.FC<{n: string; cx: number; sec: number; I: any; t: string; sub: string; c: string; chk: number}> = ({n, cx, sec, I, t, sub, c, chk}) => (
  <At sec={sec} anim="up" dist={140} sfx="pop" style={place(cx, 290, 440)}>
    <Glass accent={c} w={440} h={560} pad={26} style={{position: 'relative', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 22}}>
      <Num n={n} c={c} />
      <IconTile I={I} color={c} size={160} style={{marginTop: 14}} />
      <T size={56} w={900}>{t}</T>
      <At sec={sec + 1.4} anim="up" dist={30} style={{}}><T size={40} w={500} color={C.mute}>{sub}</T></At>
      <At sec={chk} anim="pop" sfx="success" sfxVol={0.4} style={{position: 'absolute', bottom: 20, left: 20}}><div style={{width: 70, height: 70, borderRadius: '50%', background: C.green, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 28px ${C.green}`}}><Check size={46} color="#06102a" strokeWidth={4} /></div></At>
    </Glass>
  </At>
);
export const MainIdea: React.FC = () => {
  const f = useCurrentFrame();
  return (
    <AbsoluteFill>
      <Camera from={{s: 1}} to={{s: 1.05}} punches={[{at: 223.3, s: 1.08, until: 225}, {at: 253.4, s: 1.06, until: 256.8}]}>
        <At sec={217.1} out={229.1} anim="down" sfx="shimmer" style={{position: 'absolute', left: 0, right: 0, top: 120, display: 'flex', justifyContent: 'center'}}><Chip color={C.amber} size={56}><Lightbulb size={52} style={{verticalAlign: 'middle', marginLeft: 14}} />الفكرة الرئيسية</Chip></At>
        <At sec={220.1} out={229.1} anim="none" style={{position: 'absolute', left: 150, right: 150, top: 290}}>
          <Words sec={220.2} size={90} gap={9} words={['إذا', 'كانت', 'بيانات', 'التدريب']} />
          <At sec={223.2} anim="drop" sfx="impact" sfxVol={0.4} style={{}}><GlitchText sec={223.2} size={150} color={C.red} style={{display: 'flex', justifyContent: 'center'}}>متحيزة</GlitchText></At>
          <Words sec={224.4} size={74} gap={8} color={C.mute} words={['يمكن', 'للذكاء', 'الاصطناعي', 'أن', ['يكرر', C.amber], ['هذا', C.amber], ['التحيز', C.amber], 'في', 'أحكامه']} />
        </At>
        <At sec={225.6} out={229.1} anim="up" style={{position: 'absolute', left: 0, right: 0, top: 820}}>
          <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 50, direction: 'rtl'}}>
            <Ico I={Database} size={80} color={C.red} /><Ico I={Cpu} size={80} /><Ico I={Repeat} size={80} color={C.amber} />
            {[0, 1, 2].map((i) => <At key={i} sec={226.6 + i * 0.5} anim="pop" sfx="tick" style={{}}><Ico I={FileX} size={70} color={C.red} /></At>)}
          </div>
        </At>
        {/* three pillars */}
        <At sec={229.5} out={252.9} anim="down" style={{position: 'absolute', left: 0, right: 0, top: 120}}><Words sec={229.6} size={64} gap={5} words={['استخدام', 'الذكاء', 'الاصطناعي', ['بمسؤولية', C.green], 'معناه', ['٣', C.amber], 'حاجات']} /></At>
        <NumCard n="1" cx={X3[0]} sec={233.3} I={ScanSearch} t="التحقق من التحيز" sub="نتأكد إن المخرجات مش متحيزة" c={C.cyan} chk={253.7} />
        <NumCard n="2" cx={X3[1]} sec={239.3} I={MessageSquareText} t="القدرة على شرح القرارات" sub="نعرف ليه النظام طلّع القرار ده" c={C.violet} chk={254.3} />
        <NumCard n="3" cx={X3[2]} sec={244.2} I={UserCheck} t="معرفة من هو المسؤول" sub="لو حصل خطأ، مين يتحمّل النتيجة؟" c={C.amber} chk={254.9} />
        <At sec={253.4} anim="pop" sfx="success" style={{position: 'absolute', left: 0, right: 0, top: 905, display: 'flex', justifyContent: 'center'}}>
          <Glass accent={C.green} pad={16} style={{display: 'flex', alignItems: 'center', gap: 22, padding: '14px 40px'}}><Ico I={ShieldCheck} size={64} color={C.green} /><T size={52} w={900} color={C.green}>= استخدام مسؤول وآمن للذكاء الاصطناعي</T></Glass>
        </At>
      </Camera>
    </AbsoluteFill>
  );
};
