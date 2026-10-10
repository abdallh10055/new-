// Global config + time mapping.  "Audio time" = seconds inside the original lecture recording.
// The video inserts a GAP (logo sting) at SPLIT, so voice.m4a in /public is the original padded with silence there.
export const FPS = 30;
export const W = 1920;
export const H = 1080;
export const SPLIT = 36.7;
export const GAP = 4.0;
export const AUDIO_SEC = 973.57;
export const TAIL = 1.6;
export const TOTAL = Math.ceil((AUDIO_SEC + GAP + TAIL) * FPS);

/** audio-second -> video frame. isEnd: a scene ending exactly at SPLIT stays before the gap. */
export const toFrame = (s: number, isEnd = false) =>
  Math.round(s * FPS) + ((isEnd ? s > SPLIT : s >= SPLIT) ? GAP * FPS : 0);
export const audioSecAt = (frame: number) => {
  const sp = SPLIT * FPS;
  if (frame < sp) return frame / FPS;
  if (frame < sp + GAP * FPS) return SPLIT;
  return frame / FPS - GAP;
};

export const C = {
  bg0: '#040a18', bg1: '#081330', bg2: '#0d1d45',
  text: '#eaf6ff', mute: '#9db4cc', dim: '#5f7896',
  cyan: '#22d3ee', blue: '#3b82f6', violet: '#8b5cf6',
  amber: '#fbbf24', red: '#fb4d6a', green: '#34d399', pink: '#f472b6',
};
export const FONT = "'Cairo Aqlani', 'Montserrat Aqlani', sans-serif";
export const FONT_LATIN = "'Montserrat Aqlani', 'Cairo Aqlani', sans-serif";

export const CHANNEL = {ar: 'عقلاني', en: 'Aqlani', owner: 'عبدالله قريطم'};
// Spoken wording in the audio. (Authentic narration: «أحبّ الأعمال إلى الله أدومها وإن قلّ») – change here if you prefer.
export const HADITH = 'خير الأعمال أدومها وإن قل';
