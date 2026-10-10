import React, {useEffect, useState} from 'react';
import {AbsoluteFill, Audio, Composition, Sequence, continueRender, delayRender, interpolate, staticFile, useCurrentFrame} from 'remotion';
import {C, FPS, H, SPLIT, TOTAL, W, toFrame} from './config';
import {SCENES, CHAPTERS, chapterAt} from './timeline';
import {SceneCtx} from './lib/ctx';
import {Background} from './components/Background';
import {ChapterChip, LowerThird, ProgressBar, SubToast, Watermark} from './components/Overlays';
import {TRANS_LEN, Transition} from './components/Transitions';
import {SCENE_COMPONENTS} from './scenes';
import {Intro} from './scenes/Intro';

const useFonts = () => {
  const [h] = useState(() => delayRender('fonts'));
  useEffect(() => {
    const defs: [string, string, string][] = [
      ['Cairo Aqlani', 'fonts/cairo-arabic-wght-normal.woff2', 'U+0600-06FF,U+200C-200E,U+2010-2011,U+204F,U+2E41,U+FB50-FDFF,U+FE80-FEFC'],
      ['Cairo Aqlani', 'fonts/cairo-latin-wght-normal.woff2', 'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD'],
      ['Montserrat Aqlani', 'fonts/montserrat-latin-wght-normal.woff2', 'U+0000-00FF,U+0131,U+0152-0153,U+02BB-02BC,U+02C6,U+02DA,U+02DC,U+2000-206F,U+2074,U+20AC,U+2122,U+2191,U+2193,U+2212,U+2215,U+FEFF,U+FFFD'],
    ];
    Promise.all(defs.map(([fam, url, range]) => new FontFace(fam, `url(${staticFile(url)})`, {weight: '200 1000', unicodeRange: range}).load().then((ff) => (document.fonts as any).add(ff))))
      .then(() => continueRender(h)).catch(() => continueRender(h));
  }, [h]);
};

const Video: React.FC = () => {
  useFonts();
  const f = useCurrentFrame();
  const introFrom = toFrame(SPLIT, true);
  // ambient bed: quiet under the voice, swells over intro / outro
  const outFrom = toFrame(960);
  const vol = (fr: number) => {
    const b = 0.09, cl = {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'} as const;
    const i = interpolate(fr, [introFrom - 15, introFrom + 10, introFrom + 110, introFrom + 135], [b, 0.45, 0.45, b], cl);
    const o = interpolate(fr, [outFrom - 30, outFrom + 60], [b, 0.2], cl);
    return Math.max(i, o) * interpolate(fr, [TOTAL - 45, TOTAL], [1, 0], cl);
  };
  return (
    <AbsoluteFill style={{background: C.bg0}}>
      <Background />
      <Audio src={staticFile('voice.m4a')} volume={1} />
      <Audio src={staticFile('sfx/ambient.wav')} loop volume={vol} />
      {SCENES.map((s) => {
        const from = toFrame(s.start), to = toFrame(s.end, true);
        const ch = CHAPTERS[chapterAt(s.start)];
        const Comp = SCENE_COMPONENTS[s.id];
        return (
          <Sequence key={s.id} from={from} durationInFrames={to - from} name={s.id}>
            <SceneCtx.Provider value={{start: s.start, dur: to - from, accent: ch.color, accent2: ch.color2}}>
              <Comp />
            </SceneCtx.Provider>
          </Sequence>
        );
      })}
      <Sequence from={introFrom} durationInFrames={GAP_F} name="intro"><Intro /></Sequence>
      <ProgressBar total={TOTAL} /><ChapterChip total={TOTAL} /><Watermark total={TOTAL} />
      <LowerThird at={38.5} /><LowerThird at={300.5} /><LowerThird at={700.5} />
      <SubToast at={402} /><SubToast at={640} />
      {SCENES.map((s, i) => {
        if (s.out === 'none' || i === SCENES.length - 1) return null;
        const cut = toFrame(s.end, true);
        return <Sequence key={'t' + s.id} from={cut - TRANS_LEN / 2} durationInFrames={TRANS_LEN} name={'tr-' + s.id}><Transition type={s.out} at={14} /></Sequence>;
      })}
      <Sequence from={introFrom - 12} durationInFrames={TRANS_LEN} name="tr-hook"><Transition type="glitch" at={14} /></Sequence>
      <Sequence from={toFrame(SPLIT) - 12} durationInFrames={TRANS_LEN} name="tr-intro"><Transition type="ring" at={14} /></Sequence>
    </AbsoluteFill>
  );
};
const GAP_F = 120;
export const Root: React.FC = () => (
  <Composition id="AqlaniEthics" component={Video} durationInFrames={TOTAL} fps={FPS} width={W} height={H} />
);
