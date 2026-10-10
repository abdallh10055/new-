import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {ScanSearch, Scale, Gavel, Eye, Lock, UserRound, Cpu, Check, X, Bell, MousePointer2, Wrench, Settings2, Users, Heart, Search, FileText, GraduationCap, ShieldCheck, ListChecks, CircleHelp, Play, PartyPopper} from 'lucide-react';
import {C, FONT, HADITH, CHANNEL} from '../config';
import {At} from '../components/At';
import {Camera} from '../components/Camera';
import {Sfx} from '../components/Sfx';
import {BlackBox, Chip, PointCard} from '../components/widgets';
import {Col, CountUp, Glass, Hl, Ico, IconTile, Link, Shine, Stamp, T, Typewriter, Words, Logo, Pulse} from '../components/ui';
import {useCue, useScene} from '../lib/ctx';
import {ease, prog, sp, lerp} from '../lib/anim';
import {X3, X4, place} from './s3_core';
import {Title, Top} from './s5_mid';

/* ───────────────────────── XAI ───────────────────────── */
export const Xai: React.FC = () => {
  const open1 = ease(prog(useCue(706.6), 45));
  const open2 = ease(prog(useCue(786.0), 50));
  return (
    <AbsoluteFill>
      <Camera from={{s: 1}} to={{s: 1.05}} punches={[{at: 706.6, s: 1.06, until: 710}, {at: 719.5, s: 1.06, fx: -300, until: 722}, {at: 733.8, s: 1.06, fx: 400, until: 738}, {at: 766.5, s: 1.06, fx: 300, until: 770}]}>
        <Title sec={694.3} out={701.8} num="3" kicker="ثالثًا" title="الذكاء الاصطناعي القابل للتفسير" sub="XAI · Explainable AI" I={ScanSearch} color={C.green} />

        {/* definition */}
        <Top sec={702.2} out={714.3} y={130}><Words sec={702.3} size={56} gap={5} words={[['XAI', C.green], 'تقنية', 'تساعدنا', 'نعرف', ['إزاي', C.green], 'و', ['ليه', C.green], 'النظام', 'خد', 'قرار', 'معين']} /></Top>
        <At sec={703.6} out={714.3} anim="zoom" dur={30} sfx="sub_drop" style={place(960, 330, 340)}><BlackBox size={300} speed={-1.0} open={open1} color={C.green} /></At>
        <At sec={706.6} out={714.3} anim="up" sfx="shimmer" style={{position: 'absolute', left: 0, right: 0, top: 760, display: 'flex', justifyContent: 'center'}}>
          <Glass accent={C.green} pad={26} style={{width: 1400}}><T size={42} w={700} color={C.mute}>التعريف الرسمي</T><T size={50} w={800} lh={1.45}>أساليب تساعد <Hl sec={709.0} color={C.green}>البشر</Hl> على فهم العوامل التي أدت إلى وصول النظام إلى <Col sec={712.0} color={C.green}>قرار معين</Col></T></Glass>
        </At>

        {/* book warning */}
        <At sec={714.5} out={724.0} anim="down" sfx="alert" style={{position: 'absolute', left: 0, right: 0, top: 140, display: 'flex', justifyContent: 'center'}}><Chip color={C.red} size={52}>⚠ تحذير مهم من الكتاب</Chip></At>
        <At sec={715.6} out={724.0} anim="right" dist={140} sfx="whoosh_soft" style={place(1250, 330, 500)}><PointCard I={X} title="نتيجة غير واضحة" sub="مجرد قرار بدون سبب" color={C.red} w={500} h={400} size={52} /></At>
        <At sec={717.6} out={724.0} anim="left" dist={140} sfx="whoosh_soft" style={place(670, 330, 500)}><PointCard I={CircleHelp} title="صعب نعرف" sub="فيه تحيز ولا لأ؟" color={C.amber} w={500} h={400} size={52} /></At>
        <At sec={720.4} out={724.0} anim="drop" sfx="stamp" style={place(960, 800, 700)}><Stamp text="لازم نفهم السبب" size={64} rot={-3} color={C.amber} /></At>

        {/* medicine */}
        <At sec={724.3} out={750.0} anim="down" sfx="whoosh_soft" style={{position: 'absolute', left: 0, right: 0, top: 130, display: 'flex', justifyContent: 'center'}}><Chip color={C.cyan} size={52}>مثال 1 · الطب</Chip></At>
        <At sec={726.0} out={750.0} anim="right" dist={130} sfx="pop" style={place(1440, 270, 520)}>
          <Glass accent={C.cyan} w={520} pad={30}>
            <div style={{display: 'flex', alignItems: 'center', gap: 16, justifyContent: 'flex-end'}}><T size={48} w={900} color={C.cyan}>بيانات المريض</T><UserRound size={56} color={C.cyan} /></div>
            <div style={{height: 3, background: `${C.cyan}55`, margin: '14px 0'}} />
            {[['ضغط الدم', '180/100', 735.0], ['نبض القلب', '110', 737.6], ['العمر', '70 سنة', 739.6]].map(([k, v, at], i) => (
              <At key={i} sec={at as number} anim="right" dist={60} sfx="tick" style={{}}><div style={{display: 'flex', justifyContent: 'space-between', direction: 'rtl', padding: '10px 0'}}><T size={40} w={600} color={C.mute}>{k}</T><T size={46} w={900} color={C.amber} latin>{v}</T></div></At>
            ))}
          </Glass>
        </At>
        <At sec={728.0} out={750.0} anim="pop" sfx="blip" style={place(960, 400, 200)}><IconTile I={Cpu} size={190} color={C.cyan} /></At>
        <Link sec={728.6} out={750.0} x1={1170} y1={480} x2={1070} y2={480} color={C.cyan} />
        <Link sec={729.4} out={750.0} x1={855} y1={480} x2={775} y2={480} color={C.red} />
        <At sec={729.8} out={750.0} anim="left" dist={130} sfx="error" style={place(480, 300, 560)}>
          <Glass accent={C.red} w={560} pad={30} style={{textAlign: 'center'}}><Ico I={ShieldCheck} size={84} color={C.red} /><T size={50} w={900} color="#ffd3da">رفض العملية الجراحية</T><T size={38} w={500} color={C.mute} style={{marginTop: 6}}>لما سألنا: ليه؟</T></Glass>
        </At>
        <At sec={732.4} out={750.0} anim="up" sfx="shimmer" style={{position: 'absolute', left: 150, right: 150, top: 705}}>
          <Glass accent={C.green} pad={22} style={{display: 'flex', alignItems: 'center', gap: 28, direction: 'rtl'}}>
            <Ico I={Search} size={80} color={C.green} />
            <div style={{flex: 1}}><T size={42} w={700} color={C.green} align="right">الإجابة:</T><T size={46} w={700} align="right" lh={1.45}>المرضى بهذه المواصفات نسبة نجاح العملية عندهم <CountUp sec={743.0} to={20} dur={40} suffix="%" size={76} color={C.red} style={{display: 'inline-block'}} /> فقط</T></div>
          </Glass>
        </At>
        <At sec={746.4} out={750.0} anim="drop" sfx="success" style={place(960, 900, 600)}><Stamp text="فهمنا السبب ✓" size={46} rot={-3} color={C.green} /></At>

        {/* hiring */}
        <At sec={750.2} out={779.2} anim="down" sfx="whoosh_soft" style={{position: 'absolute', left: 0, right: 0, top: 130, display: 'flex', justifyContent: 'center'}}><Chip color={C.violet} size={52}>مثال 2 · التوظيف</Chip></At>
        <At sec={751.6} out={779.2} anim="right" dist={130} sfx="pop" style={place(1420, 270, 480)}>
          <Glass accent={C.violet} w={480} pad={28} style={{textAlign: 'center'}}><Ico I={FileText} size={88} color={C.violet} /><T size={46} w={900}>سيرة ذاتية</T><T size={38} w={600} color={C.mute}>سنوات الخبرة: <Col sec={757.0} color={C.red}>أقل من 5</Col></T></Glass>
        </At>
        <At sec={754.0} out={779.2} anim="drop" sfx="stamp" style={place(960, 380, 360)}><Stamp text="مرفوض" size={70} rot={-7} /></At>
        <At sec={756.0} out={779.2} anim="left" dist={130} sfx="pop" style={place(500, 270, 480)}>
          <Glass accent={C.cyan} w={480} pad={28} style={{textAlign: 'center'}}><Ico I={ListChecks} size={88} color={C.cyan} /><T size={46} w={900}>متطلبات الوظيفة</T><T size={38} w={600} color={C.mute}>خبرة <Col sec={758.0} color={C.cyan}>5 سنوات</Col> على الأقل</T></Glass>
        </At>
        <At sec={760.0} out={769.0} anim="up" sfx="success" style={{position: 'absolute', left: 150, right: 150, top: 640}}>
          <Glass accent={C.green} pad={26} style={{display: 'flex', gap: 24, alignItems: 'center', direction: 'rtl'}}><Check size={70} color={C.green} /><div><T size={40} w={800} color={C.green} align="right">نظام قابل للتفسير</T><T size={46} w={700} align="right" lh={1.4}>"رفضته لأن خبرته أقل من 5 سنوات، والوظيفة بتطلب 5 على الأقل"</T></div></Glass>
        </At>
        <At sec={769.2} out={779.2} anim="up" sfx="error" style={{position: 'absolute', left: 150, right: 150, top: 640}}>
          <Glass accent={C.red} pad={26} style={{display: 'flex', gap: 24, alignItems: 'center', direction: 'rtl'}}><X size={70} color={C.red} /><div><T size={40} w={800} color={C.red} align="right">نظام غير قابل للتفسير</T><T size={46} w={700} align="right" lh={1.4}>"رفضته وخلاص" — الخبرة؟ ولا اللون؟ ولا الجنس؟</T></div></Glass>
        </At>

        {/* closing */}
        <At sec={779.6} anim="zoom" dur={26} sfx="sub_drop" style={place(960, 190, 340)}><BlackBox size={300} speed={-1.0} open={open2} color={open2 > 0.5 ? C.green : C.red} /></At>
        <At sec={781.2} anim="up" sfx="whoosh_soft" style={{position: 'absolute', left: 0, right: 0, top: 700, display: 'flex', justifyContent: 'center'}}><Words sec={781.3} size={64} gap={5} words={['من', 'غير', 'تفسير', '=', ['إحنا', C.red], ['عميان', C.red]]} /></At>
        <At sec={786.0} anim="up" sfx="shimmer" style={{position: 'absolute', left: 0, right: 0, top: 830, display: 'flex', justifyContent: 'center'}}><Glass accent={C.green} pad={20} style={{display: 'flex', alignItems: 'center', gap: 22, direction: 'rtl'}}><Ico I={Search} size={64} color={C.green} /><T size={52} w={900}><Shine size={52} colors={[C.green, '#fff']}>XAI هو الكشّاف اللي بيكشف التحيز</Shine></T></Glass></At>
      </Camera>
    </AbsoluteFill>
  );
};

/* ───────────────────────── Terms ───────────────────────── */
export const Terms: React.FC = () => {
  const roles = [
    {I: Wrench, t: 'المطوّر', c: C.cyan, at: 800.0},
    {I: Settings2, t: 'المشغّل', c: C.violet, at: 802.4},
    {I: Users, t: 'المستخدم', c: C.amber, at: 804.6},
  ];
  const rows = [
    {I: Eye, t: 'الشفافية', v: 'الجامعة قالت: النظام بيقيّم بدرجات الثانوية + اختبار القدرات', c: C.green, at: 858.0},
    {I: Gavel, t: 'المساءلة', v: 'عارفين مين المسؤول عن النتيجة (الجامعة أو الشركة المطورة) ونقدر نحاسبه', c: C.amber, at: 866.4},
    {I: Scale, t: 'المسؤولية', v: 'كل طرف (المطور · المشغل · المستخدم) عارف دوره', c: C.cyan, at: 876.0},
  ];
  return (
    <AbsoluteFill>
      <Camera from={{s: 1}} to={{s: 1.05}} punches={[{at: 800.0, s: 1.05, fx: 400, until: 803}, {at: 809.5, s: 1.06, until: 812.5}, {at: 826.0, s: 1.06, fx: -300, until: 830}, {at: 846.0, s: 1.05, until: 849}]}>
        <Title sec={790.9} out={794.8} num="3+" kicker="لازم تكون عارفها" title="المصطلحات الثلاثة" sub="المسؤولية · المساءلة · الشفافية" I={Scale} color={C.violet} />

        {/* responsibility */}
        <At sec={795.2} out={816.4} anim="down" sfx="whoosh_soft" style={{position: 'absolute', left: 0, right: 0, top: 130, display: 'flex', justifyContent: 'center'}}><Chip color={C.cyan} size={56}><Scale size={50} style={{verticalAlign: 'middle', marginLeft: 14}} />المسؤولية · Responsibility</Chip></At>
        <At sec={796.4} out={816.4} anim="up" style={{position: 'absolute', left: 0, right: 0, top: 250, display: 'flex', justifyContent: 'center'}}><Words sec={796.5} size={56} gap={5} words={['تحديد', ['الأدوار', C.cyan], 'و', ['الواجبات', C.cyan], 'لكل من له علاقة بالذكاء الاصطناعي']} /></At>
        {roles.map((r, i) => <At key={i} sec={r.at} out={816.4} anim="up" dist={100} sfx="pop" style={place(X3[i], 420, 420)}><PointCard I={r.I} title={r.t} color={r.c} w={420} h={330} size={58} /></At>)}
        <At sec={809.6} out={816.4} anim="up" sfx="shimmer" style={{position: 'absolute', left: 0, right: 0, top: 800, display: 'flex', justifyContent: 'center'}}><Glass accent={C.amber} pad={22}><T size={50} w={800}><Hl sec={810.4} color={C.amber}>مفيش توزيع ثابت</Hl> للأدوار — بتختلف حسب النظام واستخداماته</T></Glass></At>

        {/* accountability */}
        <At sec={816.8} out={838.5} anim="down" sfx="whoosh_soft" style={{position: 'absolute', left: 0, right: 0, top: 130, display: 'flex', justifyContent: 'center'}}><Chip color={C.amber} size={56}><Gavel size={50} style={{verticalAlign: 'middle', marginLeft: 14}} />المساءلة · Accountability</Chip></At>
        <At sec={817.8} out={838.5} anim="zoom" dur={26} sfx="impact" style={place(1380, 300, 400)}><IconTile I={Gavel} size={330} color={C.amber} /></At>
        <At sec={819.0} out={838.5} anim="left" dist={120} style={{position: 'absolute', left: 120, top: 290, width: 820}}><T size={54} w={800} align="right" lh={1.5}>القدرة على <Col sec={820.4} color={C.amber}>تحديد الجهات المسؤولة</Col> عن النظام، و<Col sec={823.0} color={C.amber}>محاسبتهم</Col> على النتيجة</T></At>
        <At sec={826.0} out={838.5} anim="up" sfx="alert" style={{position: 'absolute', left: 0, right: 0, top: 590, display: 'flex', justifyContent: 'center'}}><Chip color={C.red} size={46}>⚠ ملاحظة مهمة</Chip></At>
        <At sec={827.4} out={838.5} anim="right" dist={120} sfx="pop" style={place(1190, 690, 600)}><Glass accent={C.red} w={600} pad={22} style={{textAlign: 'center'}}><X size={54} color={C.red} /><T size={42} w={800}>شرح نتيجة الـ AI</T><T size={38} w={600} color={C.mute}>دي وظيفة <Col sec={829.6} color={C.green}>XAI</Col></T></Glass></At>
        <At sec={831.0} out={838.5} anim="left" dist={120} sfx="pop" style={place(650, 690, 600)}><Glass accent={C.green} w={600} pad={22} style={{textAlign: 'center'}}><Check size={54} color={C.green} /><T size={42} w={800}>مين اللي هيتحاسب</T><T size={38} w={600} color={C.mute}>دي <Col sec={832.6} color={C.amber}>المساءلة</Col></T></Glass></At>

        {/* transparency */}
        <At sec={839.0} out={856.2} anim="down" sfx="whoosh_soft" style={{position: 'absolute', left: 0, right: 0, top: 130, display: 'flex', justifyContent: 'center'}}><Chip color={C.green} size={56}><Eye size={50} style={{verticalAlign: 'middle', marginLeft: 14}} />الشفافية · Transparency</Chip></At>
        <At sec={840.2} out={856.2} anim="zoom" dur={26} sfx="shimmer" style={place(960, 270, 340)}><IconTile I={Eye} size={300} color={C.green} /></At>
        <At sec={842.0} out={856.2} anim="up" style={{position: 'absolute', left: 0, right: 0, top: 640, display: 'flex', justifyContent: 'center'}}><Words sec={842.1} size={56} gap={5} words={['شركة', 'صاحبة', 'نظام', 'AI', 'توفرلك', ['معلومات', C.green], ['تفصيلية', C.green], 'عن النظام']} /></At>
        <At sec={850.0} out={856.2} anim="pop" sfx="success" style={place(960, 800, 600)}><Chip color={C.green} size={54}>هنا الشركة بتتصف بالشفافية ✓</Chip></At>

        {/* university example */}
        <At sec={856.6} anim="down" sfx="whoosh_soft" style={{position: 'absolute', left: 0, right: 0, top: 130, display: 'flex', justifyContent: 'center'}}><Chip color={C.violet} size={52}><GraduationCap size={50} style={{verticalAlign: 'middle', marginLeft: 14}} />مثال: نظام AI رفض طالب من جامعة</Chip></At>
        {rows.map((r, i) => (
          <At key={i} sec={r.at} anim="right" dist={160} sfx="pop" style={{position: 'absolute', left: 150, right: 150, top: 300 + i * 190}}>
            <Glass accent={r.c} pad={0} r={26} style={{height: 160, display: 'flex', direction: 'rtl', alignItems: 'center', overflow: 'hidden'}}>
              <div style={{width: 440, height: '100%', background: `${r.c}1f`, display: 'flex', alignItems: 'center', gap: 20, padding: '0 28px', borderLeft: `3px solid ${r.c}`}}><Ico I={r.I} size={64} color={r.c} /><T size={50} w={900} color={r.c} align="right">{r.t}</T></div>
              <div style={{flex: 1, padding: '0 34px'}}><T size={40} w={600} align="right" lh={1.4}>{r.v}</T></div>
            </Glass>
          </At>
        ))}
      </Camera>
    </AbsoluteFill>
  );
};

/* ───────────────────────── Principles ───────────────────────── */
export const Principles: React.FC = () => {
  const P = [
    {I: Scale, t: 'العدالة', s: 'لا تمييز: أبيض وأسود، عربي وأجنبي', c: C.cyan, at: 898.6},
    {I: Eye, t: 'الشفافية', s: 'معلومات واضحة وصادقة عن حدوده ومميزاته وعيوبه', c: C.green, at: 911.7},
    {I: Lock, t: 'الخصوصية', s: 'حماية بياناتك الشخصية', c: C.violet, at: 920.9},
    {I: Gavel, t: 'المساءلة', s: 'تحديد الجهة المسؤولة عن النظام ونتائجه وأخطائه', c: C.amber, at: 924.5},
  ];
  return (
    <AbsoluteFill>
      <Camera from={{s: 1}} to={{s: 1.04}} punches={P.map((p, i) => ({at: p.at, s: 1.05, fx: X4[i] - 960, until: p.at + 3}))}>
        <Title sec={885.8} out={892.0} num="4" kicker="رابعًا" title="المبادئ الأساسية" sub="4 مبادئ لأخلاقيات الذكاء الاصطناعي" I={ShieldCheck} color={C.pink} />
        <At sec={892.4} anim="down" sfx="whoosh_soft" style={{position: 'absolute', left: 0, right: 0, top: 150, display: 'flex', justifyContent: 'center'}}><Words sec={892.5} size={64} gap={5} words={['عشان', 'نستخدم', 'الـ AI', ['بمسؤولية', C.pink], 'و', ['بحرص', C.pink], 'و', ['بأمان', C.pink]]} /></At>
        {P.map((p, i) => (
          <At key={i} sec={p.at} anim="drop" dist={100} sfx="pop" style={place(X4[i], 330, 380)}>
            <PointCard I={p.I} title={p.t} sub={p.s} color={p.c} w={380} h={560} size={60} subSize={36} />
            <div style={{position: 'absolute', top: -34, right: 26, width: 70, height: 70, borderRadius: '50%', background: p.c, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: FONT, fontWeight: 900, fontSize: 42, color: '#06102a', boxShadow: `0 0 26px ${p.c}`}}>{i + 1}</div>
          </At>
        ))}
        <At sec={930.0} anim="pop" sfx="shimmer" style={{position: 'absolute', left: 0, right: 0, top: 930, display: 'flex', justifyContent: 'center'}}><Chip color={C.pink} size={46}>دستور الذكاء الاصطناعي الأخلاقي</Chip></At>
      </Camera>
    </AbsoluteFill>
  );
};

/* ───────────────────────── Conclusion ───────────────────────── */
export const Conclusion: React.FC = () => {
  const pillars = [
    {I: Search, t: 'التحقق من التحيز', c: C.cyan, at: 945.0},
    {I: ScanSearch, t: 'القدرة على شرح قراراته', c: C.green, at: 949.0},
    {I: Gavel, t: 'معرفة من هو المسؤول', c: C.amber, at: 952.6},
  ];
  return (
    <AbsoluteFill>
      <Camera from={{s: 1}} to={{s: 1.05}} punches={[{at: 936.0, s: 1.05, until: 940}, ...pillars.map((p, i) => ({at: p.at, s: 1.06, fx: X3[i] - 960, until: p.at + 3}))]}>
        <At sec={933.6} out={943.6} anim="down" sfx="whoosh_soft" style={{position: 'absolute', left: 0, right: 0, top: 150, display: 'flex', justifyContent: 'center'}}><Chip color={C.cyan} size={52}>نرجع للفكرة الرئيسية</Chip></At>
        <At sec={935.0} out={943.6} anim="blur" style={{position: 'absolute', left: 0, right: 0, top: 330, display: 'flex', justifyContent: 'center'}}>
          <Words sec={935.1} size={66} gap={6} style={{maxWidth: 1700}} words={['إذا', 'كانت', ['بيانات التدريب', C.cyan], ['متحيزة', C.red], '،', 'يمكن', 'للذكاء الاصطناعي', 'أن', ['يكرر', C.amber], 'هذا', 'التحيز', 'في', 'أحكامه']} />
        </At>
        <At sec={943.9} anim="down" sfx="swish_down" style={{position: 'absolute', left: 0, right: 0, top: 150, display: 'flex', justifyContent: 'center'}}><Chip color={C.green} size={52}>استخدام الـ AI بمسؤولية يعني…</Chip></At>
        {pillars.map((p, i) => (
          <At key={i} sec={p.at} anim="up" dist={110} sfx="success" sfxVol={0.45} style={place(X3[i], 340, 430)}>
            <PointCard I={p.I} title={p.t} color={p.c} w={430} h={420} size={50} />
            <div style={{position: 'absolute', top: -30, right: 26, width: 64, height: 64, borderRadius: '50%', background: p.c, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: `0 0 26px ${p.c}`}}><Check size={42} color="#06102a" strokeWidth={3.5} /></div>
          </At>
        ))}
        <At sec={956.4} anim="zoom" dur={26} sfx="impact" style={{position: 'absolute', left: 0, right: 0, top: 830, display: 'flex', justifyContent: 'center'}}><Glass accent={C.pink} pad={22} style={{display: 'flex', alignItems: 'center', gap: 24}}><PartyPopper size={64} color={C.pink} /><T size={64} w={900}><Shine size={64} colors={[C.pink, '#fff']}>انتهى الدرس</Shine></T></Glass></At>
      </Camera>
    </AbsoluteFill>
  );
};

/* ───────────────────────── Outro ───────────────────────── */
export const Outro: React.FC = () => {
  const f = useCurrentFrame(); const {dur} = useScene();
  const click = useCue(964.6);
  const subbed = click >= 0;
  const press = click >= 0 && click < 8 ? 0.94 : 1;
  const cursorP = ease(prog(useCue(963.2), 40));
  const cx = lerp(1250, 1000, cursorP), cy = lerp(960, 730, cursorP);
  const bell = useCue(965.4);
  const bellRot = bell >= 0 && bell < 60 ? Math.sin(bell * 0.7) * 22 * (1 - bell / 60) : 0;
  const fade = ease(prog(f - (dur - 26), 24));
  return (
    <AbsoluteFill>
      <Camera from={{s: 1.0}} to={{s: 1.04}} punches={[{at: 964.4, s: 1.07, fx: 40, fy: 150, until: 967}]}>
        {/* thanks + logo */}
        <At sec={960.1} out={966.2} anim="zoom" dur={28} sfx="shimmer" style={{position: 'absolute', left: 0, right: 0, top: 120, display: 'flex', justifyContent: 'center'}}><Logo h={220} /></At>
        <At sec={961.0} out={966.2} anim="blur" style={{position: 'absolute', left: 0, right: 0, top: 380, display: 'flex', justifyContent: 'center'}}><Words sec={961.1} size={84} gap={6} words={['شكرًا', 'لمتابعتك', 'يا', ['صديقي', C.cyan]]} /></At>
        <At sec={962.4} out={966.2} anim="up" style={{position: 'absolute', left: 0, right: 0, top: 520, display: 'flex', justifyContent: 'center'}}><T size={46} w={600} color={C.mute}>لو وصلت لحد هنا فأكيد إنت استفدت</T></At>

        {/* subscribe */}
        <At sec={963.0} out={966.3} anim="pop" sfx="whoosh" style={{position: 'absolute', left: 0, right: 0, top: 650, display: 'flex', justifyContent: 'center', gap: 36, direction: 'ltr'}}>
          <div style={{display: 'flex', alignItems: 'center', gap: 28, direction: 'rtl'}}>
            <div style={{position: 'relative', width: 120, height: 120, borderRadius: '50%', background: '#ffffff14', border: `3px solid ${C.amber}88`, display: 'flex', alignItems: 'center', justifyContent: 'center', transform: `rotate(${bellRot}deg)`}}><Bell size={64} color={C.amber} fill={bell >= 0 ? C.amber : 'none'} /></div>
            <div style={{transform: `scale(${press})`, padding: '22px 70px', borderRadius: 24, background: subbed ? '#2a3550' : 'linear-gradient(135deg,#ff2d4a,#d90429)', fontFamily: FONT, fontWeight: 900, fontSize: 76, color: '#fff', boxShadow: subbed ? 'none' : '0 0 60px #ff2d4a88, 0 14px 40px #0008', display: 'flex', alignItems: 'center', gap: 20}}>
              {subbed ? <><Check size={70} strokeWidth={3.5} />تم الاشتراك</> : <><Play size={60} fill="#fff" />اشترك في القناة</>}
            </div>
          </div>
        </At>
        {click >= 0 && click < 40 ? <div style={{position: 'absolute', left: 960, top: 710, width: 0, height: 0}}><Pulse color="#ff4d6a" size={360} n={2} period={40} /></div> : null}
        <At sec={963.2} out={966.0} anim="none" style={{position: 'absolute', left: cx, top: cy}}><MousePointer2 size={80} color="#fff" fill="#000" style={{filter: 'drop-shadow(0 6px 10px #000a)'}} /></At>
        <Sfx name="click" at={964.6} vol={0.7} /><Sfx name="ding" at={965.4} vol={0.5} /><Sfx name="bell" at={965.5} vol={0.4} />

        {/* hadith */}
        <At sec={966.4} out={971.3} anim="zoom" dur={30} sfx="shimmer" style={{position: 'absolute', left: 0, right: 0, top: 150, display: 'flex', justifyContent: 'center'}}>
          <Glass accent={C.pink} pad={50} strong style={{width: 1400, textAlign: 'center'}}>
            <T size={44} w={700} color={C.pink}>قال النبي ﷺ</T>
            <div style={{height: 4, width: 220, background: C.pink, margin: '18px auto 28px', borderRadius: 3}} />
            <div style={{whiteSpace: 'nowrap'}}><Shine size={92} colors={[C.pink, '#fff']}>{HADITH}</Shine></div>
          </Glass>
        </At>

        {/* salaam end card */}
        <At sec={971.6} anim="blur" dur={30} sfx="ding" style={{position: 'absolute', left: 0, right: 0, top: 200, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28}}>
          <Logo h={260} />
          <T size={84} w={900}>السلام عليكم ورحمة الله وبركاته</T>
          <Chip color={C.cyan} size={48}>{CHANNEL.ar} | {CHANNEL.en}</Chip>
        </At>
      </Camera>
      <AbsoluteFill style={{background: '#000', opacity: fade}} />
    </AbsoluteFill>
  );
};
