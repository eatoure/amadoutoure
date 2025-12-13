---
date: '2'
title: 'DeeboAI Studio'
cover: './deeboai.png'
github: ''
external: 'https://www.deeboai.com'
tech:
  - PyTorch
  - Neural Vocoders
  - Digital Signal Processing
  - React
  - TypeScript
  - AWS Lambda
  - ffmpeg
  - DAW Automation
---

DeeboAI Studio is an AI-powered audio editing environment that ingests raw studio sessions, detects sensitive or non-compliant speech, and auto-censors waveforms in place without breaking timing. I’m architecting the inference stack that stitches together profanity classification, semantic diarization, and voice-activity-driven masking to produce clean stems ready for broadcast or platform guidelines in minutes instead of hours.

Working alongside <a href="https://www.linkedin.com/in/aaosakwe/">Albert Osakwe</a>, I’m building a hybrid pipeline that marries transformer-based lyric parsing with neural vocoder re-synthesis so explicit phrases can be overdubbed by context-aware voice doubles. We layer in controllable diffusion models to regenerate delivery that matches prior inflection, then export DAW-ready tracks—Logic, Pro Tools, and Ableton—through a plugin bridge that writes clips directly into the producer’s timeline.

The platform also generates synchronized lyric sheets, shot clocks, and compliance audit trails for labels by fusing forced alignment with sequence tagging. DeeboAI Studio ultimately functions as a co-pilot for sound engineers: it listens, edits, versions, and documents every iteration, turning what used to be an overnight mastering cycle into an interactive, data-rich workflow that scales with artist backlogs.
