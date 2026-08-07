# 3D Portfolio — Vasu Mekala (AI/ML Engineer)

Cinematic 3D animated portfolio built with React 18 + Vite, Three.js / React Three Fiber, GSAP, Tailwind CSS, and the browser Web Speech API.

Inspired by / content sourced from [vasu-mekala-portfolio.vercel.app](https://vasu-mekala-portfolio.vercel.app/#about).

## Features

- **3D office scene** (`src/components/ThreeCanvas.jsx`) — procedural desk, monitor with a glowing holographic AI/ML graph overlay, laptop, ergonomic chair, and two potted plants, rendered with `@react-three/fiber` + `@react-three/drei`.
- **Light / dark mode** — bright office in light mode, deep navy scene with glowing neon accents in dark mode. Toggle lives in the header.
- **Glassmorphism UI** (`src/components/GlassUI.jsx`) — every text block sits in a frosted `backdrop-blur` card for contrast over the 3D scene.
- **3D robot assistant** (`src/components/RobotAssistant.jsx`) — a procedural rigged-style robot with idle float/rotate animation, hover glow, and a Web Speech API voice greeting. Click it anytime to replay the greeting.
- **GSAP guided camera tour** — "Start Guided 3D Tour" flies the camera through hero → about → projects → skills → contact, with a voice line and a floating HUD (step counter, Next, Exit) at each stop. "Explore Independently" just scrolls the page.
- **Resume download** — header and contact footer both link to `/public/resume.pdf`.

## Getting started

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
```

## Project structure

```
├── index.html
├── public/
│   └── resume.pdf
├── src/
│   ├── main.jsx
│   ├── index.css
│   ├── App.jsx
│   ├── data/
│   │   └── content.js        # profile, experience, projects, skills, tour script
│   └── components/
│       ├── ThreeCanvas.jsx   # 3D scene + GSAP camera rig
│       ├── RobotAssistant.jsx# 3D robot + Web Speech voice
│       └── GlassUI.jsx       # header, hero, section cards, tour HUD
├── tailwind.config.js
├── postcss.config.js
├── vite.config.js
└── package.json
```

## Notes

- The robot and office props are built from Three.js primitives (no external `.glb` assets), so the project runs with zero binary dependencies. To swap in a rigged GLTF robot, drop the file in `public/models/` and replace the mesh in `RobotAssistant.jsx` with a `useGLTF` + `useAnimations` loader.
- Voice greeting uses `window.speechSynthesis`; some browsers require a user gesture before audio plays, so the greeting also replays on robot click.
- Update contact details, resume file, and GitHub link in `src/data/content.js`.
