# Aqlani – Lesson 4 (AI Ethics) · Remotion project
1920×1080 @30fps, ~16:20 (cold open → 4s logo sting → 22 scenes → outro).

    npm i
    npm run studio            # preview
    npm run build             # -> out/aqlani-lesson4.mp4  (use --concurrency=N for more cores)

- Timing: src/timeline.ts (scenes/chapters, audio-seconds). Every element is cued by audio second via <At sec=...>.
- Voice: public/voice.m4a (original lecture + 4 s silence inserted at 36.7 s for the logo sting).
- SFX: synthesized (tools_sfx.py -> public/sfx/*.wav); replace any wav with the same name to swap.
- Final hadith text: src/config.ts (HADITH).
