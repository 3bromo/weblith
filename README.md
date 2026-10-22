# Weblith

**Build Beyond Templates.** Weblith is an AI-powered website creation platform for
people who want professional websites without writing code. This repository contains
**Phase 1: the application foundation** — a real, production-buildable web app with
working navigation, a reusable design system, and honest architecture preparation for
AI generation, authentication, 3D, and publishing.

> **Honesty note:** this phase ships the platform shell. AI generation, the visual
> editor, project storage, 3D scenes, and publishing are **designed for, not
> implemented**. Nothing in this codebase fakes those features — forms and endpoints
> that depend on missing integrations say so explicitly.

---

## 1. What was built

- **Landing page** (`/`) — premium editorial design: hero with an interface-concept
  mock of the editor, a full product-preview workspace composition, a template
  showcase with six art-directed miniature website previews, a now-vs-roadmap
  features section, a three-step flow, and a final CTA + footer.
- **Template gallery** (`/templates`) — seven category concept cards with a working
  client-side category filter, per-category empty state, and a clear coming-soon
  banner.
- **AI builder** (`/ai-builder`) — a real prompt-composition interface that submits
  to `POST /api/generate`, plus a seven-stage architecture pipeline diagram.
- **Account routes** (`/login`, `/signup`) — real credential forms wired to Supabase
  server actions that activate when credentials are configured; without credentials
  they display an exact configuration notice and never simulate a session.
- **Dashboard** (`/dashboard`) — first-time empty state, getting-started links, and
  (when Supabase is configured) real session checks and sign-out.
- **Pricing** (`/pricing`) — the intended tier structure, explicitly labeled as
  non-purchasable planned pricing.
- **Error handling** — custom 404, route error boundary, root `global-error`,
  robots.txt and sitemap.xml.

## 2. Technology stack & architecture decisions

| Layer | Choice | Why |
| --- | --- | --- |
| Framework | **Next.js 16.4** (App Router, Turbopack) + **React 19.3** | Server components, server actions, file routing, first-class TS, Vercel-ready |
| Language | **TypeScript 5.9** (strict) | Typed contracts between UI, API, and future spec validation |
| Styling | **CSS Modules + global design tokens** (no CSS framework) | One token file drives the whole system; zero utility-class lock-in; smallest dependency footprint |
| Typography | **Fraunces** + **Inter** via `@fontsource-variable` | Self-hosted from npm — no Google Fonts requests at build or runtime |
| Auth/DB | **`@supabase/ssr` + `@supabase/supabase-js`** | Server-side client bound to request cookies; dormant until real keys are added |
| Images | `next/image` + **sharp** | Local generated art direction, AVIF/WebP, sized responsive variants |
| Lint | ESLint 9 + `eslint-config-next` flat config | `npm run lint` |
| Icons | Hand-drawn inline SVG set | No icon dependency |

**Architecture shape**

```
src/
├── app/                    # Routes, layouts, API, error boundaries
│   ├── api/generate/       # Future AI entry point (validates now, 501 until integrated)
│   ├── ai-builder/         # Prompt composer + pipeline architecture
│   ├── dashboard/          # Empty workspace + session check
│   ├── login/ signup/      # Real auth forms (Supabase-gated)
│   ├── pricing/ templates/ # Public pages
│   ├── error.tsx  global-error.tsx  not-found.tsx
│   └── robots.ts  sitemap.ts
├── components/
│   ├── auth/               # AuthShell, AuthForm (client, useActionState)
│   ├── ai-builder/         # PromptComposer, Pipeline
│   ├── layout/             # Header, MobileNav, Footer, PageHeader, Logo
│   ├── marketing/          # Hero, ProductPreview, Showcase, Features, Steps, CTA
│   ├── previews/           # In-canvas miniature site renderings
│   ├── templates/          # TemplateCard (7 variants), TemplateBrowser
│   └── icons.tsx           # Inline SVG icon set
├── lib/
│   ├── actions/auth.ts     # "use server" — signIn / signUp / signOut
│   ├── ai/spec.ts          # WebsiteSpec contract + validation gates
│   ├── auth/form-state.ts  # Shared form state types
│   ├── supabase/server.ts  # Cookie-bound server client (null until configured)
│   ├── env.ts              # Server-side config detection (never leaks keys)
│   ├── site.ts             # Nav, footer, copy, example prompt
│   └── templates.ts        # Template concept model (mirrors future DB rows)
└── styles/
    ├── tokens.css          # The design system: color, type, space, radius, shadow, motion
    ├── globals.css         # Reset, base type, shared primitives
    └── dashboard.css       # Dashboard-only classes
```

**Key decisions**

1. **Tokens first.** Every color, size, and easing is a CSS variable in
   `tokens.css` (palette: warm paper neutrals, near-black ink, one vermilion
   accent). Dark sections override the same tokens via an `.on-ink` scope.
2. **AI contract without AI.** `lib/ai/spec.ts` defines `WebsiteSpec` and
   `validateWebsiteSpec()` — the gate that will sit between model output and the
   renderer. `POST /api/generate` already validates prompts (400) and returns a
   structured `501 Not Implemented` payload naming the required env vars. Model
   keys are only ever read server-side, in that route.
3. **Auth that cannot lie.** Server actions check `isSupabaseConfigured()`; without
   credentials they return an explicit "not connected" state. With credentials they
   perform genuine `signInWithPassword`/`signUp` round-trips through the
   cookie-bound `@supabase/ssr` client. No password is ever "accepted" locally.
4. **3D-ready, 3D-free.** The design system and section architecture reserve space
   for React Three Fiber scenes (e.g. the inspector's `3D scene · soon` row), but no
   Three.js dependency ships in Phase 1.
5. **Honest UI states.** Every future capability is labeled (`Concept`,
   `Planned`, `Coming later`), and every empty state explains what unlocks it.

## 3. Routes

| Route | Purpose | Rendering |
| --- | --- | --- |
| `/` | Landing page | Static |
| `/templates` | Template gallery (concepts + filter + empty states) | Static |
| `/ai-builder` | AI builder intro, live prompt validation UI, pipeline | Static |
| `/pricing` | Planned tiers with disclaimers | Static |
| `/login` | Sign-in form (Supabase-gated) | Static* |
| `/signup` | Registration form (Supabase-gated) | Static* |
| `/dashboard` | Workspace empty state (session-gated when configured) | Static* |
| `/api/generate` | `POST` — prompt validation contract (501 until AI exists) | Dynamic |
| `/robots.txt`, `/sitemap.xml` | Crawl metadata | Static |
| 404 / error boundaries | `not-found`, `error`, `global-error` | — |

\* These become dynamic automatically once Supabase credentials are present
(they read request cookies).

## 4. Genuinely functional today

- All routes serve real, responsive, accessible pages; navigation, mobile menu
  (keyboard + Escape + focus management), and anchor links work.
- Template category filter with `aria-pressed` chips, live result counts, and a
  per-category empty state.
- `POST /api/generate`: real server-side prompt validation (400 on failure,
  GET → 405) and structured 501 responses describing exactly what is missing.
- The AI-builder form performs real fetch/validation flow states (idle, loading,
  rejected, not-implemented, network error).
- Login/signup validation (email shape, ≥8-char password) runs on the server;
  with Supabase keys configured, **real sign-up, sign-in, session cookies, and
  sign-out** work end-to-end.
- Dashboard enforces login when Supabase is configured.
- Production build (`next build`) passes; ESLint and `tsc --noEmit` are clean;
  images optimize through sharp; fonts are self-hosted.

## 5. Placeholders for later phases

| Capability | State in Phase 1 |
| --- | --- |
| AI website generation | Contract + validation only; endpoint returns `501`; no model call, no fake output |
| Visual editor | Interface-concept preview only, labeled as such |
| Template installation | Concepts viewable, not installable; gallery banner says so |
| Project saving / autosave | Not implemented; dashboard explains storage arrives in Phase 2 |
| Interactive 3D | Architecture reserved (component slots, copy, tokens) — no Three.js dep yet |
| Publishing / subdomains / custom domains | Described in roadmap copy only |
| Billing | Pricing page is informational; nothing purchasable |
| Middleware-level route protection | Page-level session checks; upgrade to middleware when auth ships |

## 6. Required accounts, credentials, and environment variables

Nothing is pre-configured. Copy `.env.example` → `.env.local`:

| Variable | Needed for | Where to get it |
| --- | --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Real sign-up/sign-in/sessions | supabase.com → Project Settings → API |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Same (public key, safe in client) | Same |
| `SUPABASE_SERVICE_ROLE_KEY` | Future privileged server ops (keep server-only) | Same |
| `AI_PROVIDER`, `AI_API_KEY` (, `AI_MODEL`) | Enabling `POST /api/generate` generation | Your AI provider — **server-side only** |
| `SITE_URL` | Absolute sitemap/canonical URLs in production | Your deployed origin |

**Known limitation:** no AI provider integration is written in Phase 1 (per scope —
keys must not be shipped without a real, reviewable integration). Configure
`AI_PROVIDER`/`AI_API_KEY` in Phase 2 and implement the provider call inside
`src/lib/ai/`, keeping `validateWebsiteSpec()` as the response gate.

## 7. Run, test, deploy

```bash
npm install          # install dependencies
npm run dev          # development server → http://localhost:3000

npm run lint         # ESLint (flat config, eslint-config-next)
npm run typecheck    # tsc --noEmit
npm run build        # production build
npm start            # serve the production build
```

**Deploy (Vercel):** push this repo to GitHub and import it in Vercel — defaults
are detected automatically (Next.js 16, no custom config needed). Set the
environment variables from §6 in the project settings; set `SITE_URL` to the
deployed origin. For self-hosting, `npm run build && npm start` works as-is
(sharp is bundled).

**Verification performed for Phase 1**

- `npm run build` — passes; 13 static/dynamic routes generated.
- `npm run lint` + `npm run typecheck` — 0 errors.
- HTTP smoke test of every route (200), unknown path (404), robots/sitemap (200),
  all 33 internal links and assets (no broken links), image optimization (200),
  font files served locally (200).
- API contract test: GET → 405, malformed JSON → 400, short prompt → 400,
  valid prompt → 501 `ai_not_configured` with required env names.

## 8. Recommended next phase (Phase 2)

1. **Supabase project + schema** — `profiles`, `projects` (user-id ownership),
   `project_specs` (validated JSON), row-level security; switch auth pages from
   "not connected" to live; add middleware session refresh.
2. **First AI provider integration** — server-only route in `src/lib/ai/` that
   sends the validated prompt, receives JSON, and passes it through
   `validateWebsiteSpec()` before returning a 200.
3. **Spec → renderer MVP** — map approved section types to the existing reusable
   components; render generated specs on a preview route.
4. **Editable canvas** — start with text/color controls writing back to the spec
   (the inspector UI already models this).
5. **Project persistence + dashboard list** — save/load specs per account, then
   device previews, publishing to `*.weblith` subdomains, and Three.js scenes for
   product heroes.
