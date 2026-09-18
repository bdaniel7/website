# Escape from the Secret Space Station

A self-contained browser game for children aged 10–11.

## Contents

- `index.html` — entry page
- `css/game.css` — styling
- `js/game.js` — game logic, challenges, timer and teacher controls
- `images/` — reserved for future custom artwork

## Deploy

This is a static website. No database, backend or build step is required.

Copy the contents of this folder to any web server or static hosting service and open `index.html`.

Examples of compatible hosting:
- Apache / Nginx
- IIS
- GitHub Pages
- Cloudflare Pages
- Netlify
- Vercel static hosting
- Any ordinary web hosting account

## Classroom use

Recommended team size: 2–4.

The global timer starts when START MISSION is clicked. Each stage also displays a suggested time budget:

1. Airlock — 5 min
2. Supply Robot — 6 min
3. Reactor Fuel Room — 7 min
4. Navigation Computer — 7 min
5. Security System — 7 min
6. Final Door — 8 min

Total: 40 minutes.

## Teacher controls

Each challenge contains a collapsed "Teacher controls" section.

- Restart mission
- Reveal answer

These controls are intentionally simple and are not a security boundary.

## Answers

1. 517
2. 192
3. 72
4. 17.5
5. 55
6. 385

## Customization

All story text, answers, hints and red herrings are in `js/game.js` inside the `stages` array.

Replace the emoji scene art with custom images later if desired.
