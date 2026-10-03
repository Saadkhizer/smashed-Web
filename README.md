# SMASHED — fast-food ordering site (Next.js demo)

Next.js 14 (App Router) · plain CSS · GSAP + ScrollTrigger + SplitText · Lenis · three.js (hero burger).

## Run
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # production
```
Open **this folder** in VS Code (not your user folder) before running.

## Where things live
- `src/lib/data.js` — menu, prices, add-ons, reviews. **Set `WHATSAPP` to the owner's number** (country code, no +).
- `public/images/hero/` — the full-bleed hero scene (wide + tall, each with and without the burger). Swap these for a real photo of the same name/size and the live 3D burger can simply be switched off (delete the `<canvas>` in `Hero.jsx`).
- `public/images/menu/<id>.jpg` — one square image per dish. Swap any file with a real photo of the same name (1000px+, square) and nothing else changes.
- `src/lib/motion.js` — motion tokens (duotone personality: back.out(1.4), 0.5s, 0.06 stagger). Signature move: "pill wave" menu cards.
- `src/app/globals.css` — design tokens (`:root`): warm white canvas, tomato `--accent-deep`, bun-gold `--accent-pop`, tiny green `--accent-fresh`, glow colours `--glow-a`/`--glow-b`. Light only (no dark mode). When the official logo arrives, change those token values and nothing else.
- `src/components/` — Nav, Hero (3D burger), Menu (chips/search/cards), Order (customiser, cart drawer, mobile cart bar), Sections, Motion (Lenis + reveals).

## Notes
- Dish and hero images are currently 3D renders composed into a scene, not photographs; real photography will always look better. Add-on prices (size/meal/extras/dips) are demo placeholders.
- Checkout hands the order to WhatsApp (`wa.me`) — no payment processing.
