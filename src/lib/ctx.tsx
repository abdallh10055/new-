import React, {createContext, useContext} from 'react';
import {useCurrentFrame} from 'remotion';
import {FPS} from '../config';
export interface SceneCtxT {start: number; dur: number; accent: string; accent2: string}
export const SceneCtx = createContext<SceneCtxT>({start: 0, dur: 1, accent: '#22d3ee', accent2: '#3b82f6'});
export const useScene = () => useContext(SceneCtx);
/** Frames elapsed since an absolute audio-second cue (negative before it). */
export const useCue = (sec: number) => {
  const f = useCurrentFrame();
  const {start} = useScene();
  return f - (Math.round(sec * FPS) - Math.round(start * FPS));
};
export const cueFrame = (sec: number, start: number) => Math.round(sec * FPS) - Math.round(start * FPS);
