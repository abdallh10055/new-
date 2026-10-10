import React from 'react';
import {Audio, Sequence, staticFile} from 'remotion';
import {cueFrame, useScene} from '../lib/ctx';
export type SfxName = 'alert'|'bell'|'blip'|'click'|'ding'|'error'|'glitch'|'impact'|'logo_sting'|'pop'|'pop_low'|'riser'|'scan'|'shimmer'|'stamp'|'sub_drop'|'success'|'swish_down'|'swish_up'|'tick'|'type'|'whoosh'|'whoosh_big'|'whoosh_soft';
/** One-shot sound effect at an absolute audio-second cue (inside a scene). */
export const Sfx: React.FC<{name: SfxName; at: number; vol?: number; offset?: number}> = ({name, at, vol = 0.5, offset = 0}) => {
  const {start} = useScene();
  return (
    <Sequence from={cueFrame(at, start) + offset} durationInFrames={150} layout="none">
      <Audio src={staticFile(`sfx/${name}.wav`)} volume={vol} />
    </Sequence>
  );
};
/** Sfx on absolute video frame (used by transitions / intro / global layers). */
export const SfxF: React.FC<{name: SfxName; frame: number; vol?: number}> = ({name, frame, vol = 0.5}) => (
  <Sequence from={frame} durationInFrames={200} layout="none">
    <Audio src={staticFile(`sfx/${name}.wav`)} volume={vol} />
  </Sequence>
);
