import React from 'react';
import {AbsoluteFill, useCurrentFrame} from 'remotion';
import {School, Cpu, Users, ClipboardCheck, UserRound, ScanFace, Bot, CircleHelp, Volume2, Siren} from 'lucide-react';
import {C, FONT, H, W} from '../config';
import {At, Beat} from '../components/At';
import {Camera} from '../components/Camera';
import {Sfx} from '../components/Sfx';
import {Chip, Scales, Wave} from '../components/widgets';
import {CountUp, Col, GlitchText, Glass, Hl, IconTile, Ico, Link, Pulse, Shine, Stamp, T, Words} from '../components/ui';
import {useCue} from '../lib/ctx';
import {ease, prog, sp, map} from '../lib/anim';

const Frame: React.FC<{scan?: number; verdict?: boolean}> = ({scan = 0, verdict}) => {
  const f = useCurrentFrame();
  const col = verdict ? C.red : C.cyan;
  return (
    <Glass w={1100} h={640} pad={0} accent={col} r={26} style={{position: 'relative', overflow: 'hidden', background: 'linear-gradient(160deg,#1a3a78,#0a1a40)'}}>
      <div style={{position: 'absolute', left: 90, right: 90, top: 70, height: 230, borderRadius: 12, border: '3px solid #ffffff22', background: '#ffffff0c'}}>
        {[0, 1, 2, 3].map((i) => <div key={i} style={{margin: '26px 40px 0', height: 8, width: `${80 - i * 14}%`, background: '#ffffff22', borderRadius: 4, marginRight: 40}} />)}
      </div>
      <div style={{position: 'absolute', left: 0, right: 0, bottom: 20, display: 'flex', justifyContent: 'center'}}><Ico I={UserRound} size={330} color="#9fd3ff" sw={1.4} /></div>
      <div style={{position: 'absolute', left: 30, top: 24, fontFamily: FONT, fontSize: 30, fontWeight: 700, color: '#fff', display: 'flex', gap: 12, alignItems: 'center'}}>
        <span style={{width: 18, height: 18, borderRadius: '50%', background: C.red, opacity: f % 30 < 18 ? 1 : 0.2}} /> REC
      </div>
      <div style={{position: 'absolute', left: 280 + 0, right: 280, top: 270 + 0, height: 190, border: `4px solid ${col}`, borderRadius: 14, boxShadow: `0 0 30px ${col}`, opacity: scan}} />
      <div style={{position: 'absolute', left: 0, right: 0, top: 70 + ((f * 6) % 520), height: 6, background: `linear-gradient(90deg,transparent,${col},transparent)`, boxShadow: `0 0 30px ${col}`, opacity: scan}} />
      <div style={{position: 'absolute', right: 285, top: 220, fontFamily: 'monospace', fontSize: 24, color: col, opacity: scan}}>AI · ANALYZING {Math.min(99, Math.round(f * 1.3) % 100)}%</div>
    </Glass>
  );
};

export const HookA: React.FC = () => {
  const el = useCue(0);
  return (
    <AbsoluteFill>
      <Camera from={{s: 1.0}} to={{s: 1.07, x: -20}} punches={[{at: 9.6, s: 1.06, until: 13.5}, {at: 14.0, s: 1.05, until: 18.5}, {at: 19.4, s: 1.05, until: 22.2, rot: -0.6}]}>
        {/* greeting */}
        <Beat sec={0.2} out={3.0} anim="zoom" exit="zoom">
          <Shine size={128} colors={[C.cyan, '#fff']}>السلام عليكم ورحمة الله وبركاته</Shine>
          <Sfx name="shimmer" at={0.3} vol={0.4} />
        </Beat>
        {/* imagine */}
        <At sec={3.3} out={9.2} anim="pop" sfx="pop" style={{position: 'absolute', left: 1220, top: 190}}><IconTile I={School} size={300} color={C.amber} /></At>
        <At sec={3.5} out={5.0} anim="blur" style={{position: 'absolute', left: 120, top: 330, width: 1000}}><T size={104} w={900} align="right">تخيّلوا أن <Col sec={4.2} color={C.amber}>مدرستنا</Col>…</T></At>
        <At sec={5.1} out={9.2} anim="up" style={{position: 'absolute', left: 120, right: 120, top: 640}}>
          <T size={64} w={700} color={C.mute}>قررت تستخدم نظام <Col sec={6.2} color={C.cyan}>ذكاء اصطناعي</Col> لتقييم أداء <Col sec={7.6} color={C.green}>المعلمين</Col></T>
        </At>
        <Link sec={6.0} out={9.2} x1={1230} y1={340} x2={1090} y2={340} color={C.amber} />
        <At sec={6.0} out={9.2} anim="pop" sfx="blip" style={{position: 'absolute', left: 810, top: 215}}><IconTile I={Cpu} size={250} color={C.cyan} /></At>
        <Link sec={6.9} out={9.2} x1={800} y1={340} x2={660} y2={340} color={C.cyan} />
        <At sec={7.4} out={9.2} anim="pop" sfx="blip" style={{position: 'absolute', left: 380, top: 215}}><IconTile I={Users} size={250} color={C.green} /></At>
        <At sec={8.3} out={9.2} anim="drop" sfx="success" style={{position: 'absolute', left: 130, top: 215}}><IconTile I={ClipboardCheck} size={250} color={C.violet} /></At>
        {/* analyse the lesson videos */}
        <At sec={9.4} out={22.2} anim="zoom" style={{position: 'absolute', left: 120, top: 235, transform: 'scale(0.9)', transformOrigin: 'top left'}}>
          <Frame scan={ease(prog(useCue(9.8), 12))} verdict={useCue(18.8) > 0} />
        </At>
        <At sec={9.4} out={22.2} anim="down" style={{position: 'absolute', left: 120, top: 140, width: 990, display: 'flex', justifyContent: 'center'}}><Chip color={C.cyan} size={46}>النظام حلّل فيديوهات الحصص</Chip></At>
        <Sfx name="scan" at={9.8} vol={0.4} />
        <At sec={13.8} out={16.6} anim="right" sfx="pop" style={{position: 'absolute', left: 1210, top: 250}}><Glass w={600} pad={26} accent={C.amber}><T size={46} color={C.amber} w={800}>المعلم فلان: صوته عالي</T><Wave n={24} w={540} h={120} color={C.amber} level={0.9} /></Glass></At>
        <At sec={16.6} out={22.2} anim="right" style={{position: 'absolute', left: 1210, top: 250}}><Glass w={600} pad={26} accent={C.red}><T size={54} w={800} color="#ffd3da">يبقى هو <Hl sec={16.9} color={C.red}>غاضب</Hl></T><T size={54} w={800} color="#ffd3da">ومش <Hl sec={17.9} color={C.red}>كفء</Hl></T></Glass></At>
        <At sec={19.2} anim="drop" sfx="stamp" sfxVol={0.7} style={{position: 'absolute', left: 1260, top: 520}}><Stamp text="غاضب ✗" size={80} rot={-7} /></At>
        <At sec={19.9} anim="drop" sfx="stamp" sfxVol={0.7} style={{position: 'absolute', left: 1230, top: 680}}><Stamp text="غير كفء ✗" size={80} rot={5} /></At>
        <At sec={20.9} anim="pop" sfx="alert" style={{position: 'absolute', left: 120, top: 840, width: 990}}><T size={62} w={900} color={C.amber}>هل توافقون على القرار ده؟</T></At>
      </Camera>
    </AbsoluteFill>
  );
};

export const HookB: React.FC = () => {
  const f = useCurrentFrame();
  const tilt = (() => { const e = useCue(26.6); const s = sp(e, 8, 60, 1.2); return -s * 15 + (e < 0 ? Math.sin(f * 0.2) * 5 : 0); })();
  return (
    <AbsoluteFill>
      <Camera from={{s: 1.0}} to={{s: 1.1, y: -10}} punches={[{at: 25.7, s: 1.08, until: 27.5}, {at: 32.1, s: 1.08, until: 36.2, rot: 0.6}]}>
        <Beat sec={22.2} out={26.4} anim="zoom" style={{gap: 120}}>
          <div style={{position: 'relative', width: 520, height: 520, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
            <Pulse color={C.cyan} size={620} /><Ico I={ScanFace} size={440} color={C.cyan} sw={1.2} />
          </div>
          <div style={{width: 900}}>
            <T size={62} w={800} align="right" color={C.mute}>هل الآلة تقدر تفهم تعابير وجوهنا وسلوكنا بدقة</T>
            <div style={{display: 'flex', alignItems: 'center', justifyContent: 'flex-end', gap: 30}}>
              <At sec={25.7} anim="pop" sfx="error" style={{}}><T size={230} w={900} color={C.red} latin>؟</T></At>
              <CountUp sec={22.6} to={100} dur={85} suffix="%" size={260} color={C.cyan} />
            </div>
          </div>
          <Sfx name="riser" at={23.0} vol={0.3} />
        </Beat>
        <Beat sec={26.4} out={36.4} anim="blur" style={{alignItems: 'flex-start', paddingTop: 130}}>
          <div style={{position: 'absolute', top: 120, left: 0, right: 0}}>
            <Words sec={26.5} size={96} words={['الذكاء', 'الاصطناعي', ['مش', C.red], ['دايماً', C.red], ['عادل', C.red]]} gap={5} />
          </div>
          <div style={{position: 'absolute', left: 280, top: 330}}>
            <Scales tilt={tilt} size={760} color={C.cyan} left={<Ico I={Bot} size={130} color={C.red} />} right={<Ico I={UserRound} size={130} color={C.green} />} />
          </div>
          <Sfx name="whoosh_soft" at={26.4} vol={0.4} />
          <Sfx name="sub_drop" at={26.8} vol={0.5} />
        </Beat>
        <At sec={32.0} out={36.4} anim="right" style={{position: 'absolute', right: 160, top: 390, width: 860}}>
          <T size={64} w={700} align="right" color={C.mute}>وإن قراراته ممكن تكون</T>
          <At sec={33.0} anim="drop" sfx="impact" sfxVol={0.45} style={{}}><GlitchText sec={33.0} size={170} color={C.red}>متحيزة</GlitchText></At>
          <At sec={34.6} anim="drop" sfx="impact" sfxVol={0.45} style={{}}><GlitchText sec={34.6} size={170} color={C.amber}>وظالمة</GlitchText></At>
        </At>
      </Camera>
    </AbsoluteFill>
  );
};
