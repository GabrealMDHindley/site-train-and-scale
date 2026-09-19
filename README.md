# Train & Scale — site-train-and-scale

The public brand site for [Train & Scale LLC](https://trainandscale.com) — done-for-you
client-acquisition systems for high-ticket agencies, coaches, and consultants.

Built and deployed by the Universal Business Studio pipeline
(`clients/train-and-scale/` in the studio repo carries the intake, research, and
design brief this site was built from).

## Stack

- **Next.js App Router** + TypeScript + Tailwind CSS v4
- **React Three Fiber / drei** — the ascending wireframe-peak hero scene, built from
  the brand's own chevron mark
- **GSAP ScrollTrigger** — the scroll-driven "How It Works" timeline (organic 90-day /
  paid-ads 120-day tracks)
- **Framer Motion** — section reveals throughout
- An OpenArt-generated logo-reveal video powers the loading screen
  (`public/videos/brand/logo-reveal.mp4`), with a code-only chevron draw-in as the
  fallback when it's absent — see `src/components/Preloader.tsx`

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build   # production build — must pass before every push
npm run lint    # eslint
```

## Integrations

- Primary CTA routes to the existing GoHighLevel scheduler
  (`trainandscale.com/bookrightnow`) — booking is not rebuilt on this site.
- The contact form posts to `/api/lead`, which forwards to `CRM_WEBHOOK_URL` (a
  GoHighLevel inbound webhook) once that env var is set in this Vercel project. Until
  then it falls back to a `mailto:` link client-side.

## Deploys

Auto-deploys on every push to `main` via the connected GitHub repository (Vercel team
**SHAI**).
