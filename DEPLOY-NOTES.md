# Cloudflare Workers deploy notes

## What changed

- Switched from Nitro (`preset: "vercel"`) to the official TanStack Start + Cloudflare path:
  - Added `@cloudflare/vite-plugin` and kept `wrangler` as devDependencies.
  - `vite.config.ts`: removed `nitro()`; added `cloudflare({ viteEnvironment: { name: "ssr" } })` **before** `tanstackStart()`.
  - Kept Vite plugins that still apply: `tailwindcss`, `viteReact`, `grokPwaPlugin`, `appEnvPlugin`, `pgliteBootstrap`, `authPopup`.
  - Added `wrangler.jsonc` (Workers entry `@tanstack/react-start/server-entry`, `nodejs_compat`, observability).
  - `package.json` scripts: `deploy`, `cf-typegen`, and `build:cf` (vite-only, no migrate). Default `build` still runs `with-app-env` + `db:migrate`.

## How to deploy

```bash
# Node 22+
npm install
npx wrangler login   # or set CLOUDFLARE_API_TOKEN
npm run deploy
```

After a successful deploy, Wrangler prints a `*.workers.dev` URL (and any custom routes).

Useful:

- `npm run build` / `npm run build:cf` — production build (Cloudflare Vite plugin)
- `npm run preview` — local Workers-runtime preview via Vite
- `npm run cf-typegen` — generate Worker types (`wrangler types`)

## Live deploy (2026-09-22)

- Authenticated with `wrangler login` (OAuth).
- Registered account subdomain `tianqi-zhou.workers.dev`.
- Deployed Worker: **https://tianqi-zhou-portfolio.tianqi-zhou.workers.dev**
- Redeploy: `npm run deploy` (Node 22+).

## Env vars / secrets

| Variable | Required? | Notes |
|---|---|---|
| `CLOUDFLARE_API_TOKEN` (or `wrangler login`) | Yes for deploy | Account token with Workers deploy permission |
| `DATABASE_URL` | Optional | Neon/Postgres. If unset, app uses in-process **PGLite** (`src/lib/db.ts`) — fine for a static+SSR portfolio with no schema. Build-time `db:migrate` **skips** when unset. |
| Better Auth / OAuth secrets | Only if sign-in is enabled | Not required for a public portfolio shell |

Set Worker secrets with:

```bash
npx wrangler secret put DATABASE_URL
# plus any BETTER_AUTH_* / OAuth client secrets if used
```

## DB / migrate on Workers

- Top-level `migrations/*.sql` is empty (only `migrations/auth/` opt-in). `db:migrate` exits 0 without `DATABASE_URL`.
- PGLite is embedded WASM Postgres for preview/local; it works in Node/dev. On Cloudflare Workers it may be heavy or unsupported for durable data — prefer Neon + `DATABASE_URL` if the app later needs real persistence.
- Prefer a working static+SSR deploy over preserving Vercel-only migrate. `build:cf` skips migrate entirely if CI/Workers build cannot talk to Postgres.

## PWA gap (Nitro middleware removed)

- `server/middleware/grok-pwa.ts` was auto-registered by Nitro (`serverDir: "./server"`). That path is **gone** on Cloudflare builds.
- `grokPwaPlugin` still provides PWA/install/manifest behavior for **Vite `dev` / `preview`**.
- Production Workers deploy: site SSR/static assets still load; `?install=1`, `/__grok/manifest.webmanifest`, and HTML head injection from Nitro middleware are **not** wired unless reimplemented as a TanStack Start middleware / Worker fetch wrapper. Documented gap — portfolio pages should still render.

## `nitro` package

- Still listed in `devDependencies` but unused by `vite.config.ts`. Safe to remove later; left in lockfile to minimize unrelated churn.

## Build result (2026-09-22)

- Node 22.23.2 / npm 10.9.8
- `npm install`: ok
- `npm run build`: **ok** (client + SSR; migrate skipped — no `DATABASE_URL`)
- Artifacts: `dist/client/`, `dist/server/` (includes `dist/server/wrangler.json`)
