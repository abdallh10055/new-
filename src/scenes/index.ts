import React from 'react';
import {HookA, HookB} from './s1_hook';
import {Warning, BlackBox1, MainQ, MainIdea} from './s3_core';
import {BiasDef, Cause1} from './s4a_bias';
import {Cause2, Cause3} from './s4b_bias';
import {BlackBox2, Summary, Privacy} from './s5_mid';
import {Recap, Title, Meaning, Today} from './s2_intro';
import {Xai, Terms, Principles, Conclusion, Outro} from './s6_end';
export const SCENE_COMPONENTS: Record<string, React.FC> = {
  hookA: HookA, hookB: HookB,
  recap: Recap, title: Title, meaning: Meaning, today: Today, warning: Warning, blackbox: BlackBox1, mainq: MainQ, mainidea: MainIdea, biasdef: BiasDef,
  cause1: Cause1, cause2: Cause2, cause3: Cause3, blackbox2: BlackBox2, summary: Summary, privacy: Privacy, xai: Xai, terms: Terms, principles: Principles, conclusion: Conclusion, outro: Outro,
};
