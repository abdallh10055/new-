import {C} from './config';
export type Trans = 'iris' | 'slats' | 'diagonal' | 'glitch' | 'mosaic' | 'ring' | 'sweep' | 'hex' | 'doors' | 'none';
export interface Chapter {id: string; label: string; start: number; color: string; color2: string}
export const CHAPTERS: Chapter[] = [
  {id: 'hook', label: 'مقدمة', start: 0, color: C.red, color2: C.cyan},
  {id: 'intro', label: 'التمهيد', start: 36.7, color: C.cyan, color2: C.blue},
  {id: 'bias', label: 'التحيز الخوارزمي', start: 257.0, color: C.amber, color2: C.red},
  {id: 'privacy', label: 'قضايا الخصوصية', start: 646.7, color: C.violet, color2: C.blue},
  {id: 'xai', label: 'الذكاء الاصطناعي القابل للتفسير', start: 694.3, color: C.green, color2: C.cyan},
  {id: 'terms', label: 'المصطلحات الثلاثة', start: 790.9, color: C.blue, color2: C.violet},
  {id: 'principles', label: 'المبادئ الأربعة', start: 885.8, color: C.amber, color2: C.cyan},
  {id: 'end', label: 'الخاتمة', start: 933.5, color: C.cyan, color2: C.violet},
];
export const chapterAt = (sec: number) => {
  let i = 0;
  CHAPTERS.forEach((c, k) => { if (sec >= c.start) i = k; });
  return i;
};
export interface SceneDef {id: string; start: number; end: number; out: Trans}
// Times are in AUDIO seconds (original recording). Boundaries come from the transcript + silence detection.
export const SCENES: SceneDef[] = [
  {id: 'hookA', start: 0, end: 22.2, out: 'glitch'},
  {id: 'hookB', start: 22.2, end: 36.7, out: 'none'},
  {id: 'recap', start: 36.7, end: 65.9, out: 'slats'},
  {id: 'title', start: 65.9, end: 78.8, out: 'ring'},
  {id: 'meaning', start: 78.8, end: 93.2, out: 'doors'},
  {id: 'today', start: 93.2, end: 131.2, out: 'mosaic'},
  {id: 'warning', start: 131.2, end: 175.7, out: 'sweep'},
  {id: 'blackbox', start: 175.7, end: 198.3, out: 'hex'},
  {id: 'mainq', start: 198.3, end: 216.9, out: 'iris'},
  {id: 'mainidea', start: 216.9, end: 257.0, out: 'doors'},
  {id: 'biasdef', start: 257.0, end: 298.6, out: 'slats'},
  {id: 'cause1', start: 298.6, end: 388.9, out: 'diagonal'},
  {id: 'cause2', start: 388.9, end: 507.6, out: 'hex'},
  {id: 'cause3', start: 507.6, end: 555.0, out: 'ring'},
  {id: 'blackbox2', start: 555.0, end: 593.3, out: 'glitch'},
  {id: 'summary', start: 593.3, end: 646.7, out: 'slats'},
  {id: 'privacy', start: 646.7, end: 694.3, out: 'mosaic'},
  {id: 'xai', start: 694.3, end: 790.9, out: 'sweep'},
  {id: 'terms', start: 790.9, end: 885.8, out: 'doors'},
  {id: 'principles', start: 885.8, end: 933.5, out: 'ring'},
  {id: 'conclusion', start: 933.5, end: 960.0, out: 'iris'},
  {id: 'outro', start: 960.0, end: 975.17, out: 'none'},
];
