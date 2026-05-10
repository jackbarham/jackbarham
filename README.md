# jackbarham.com

Personal site. Nuxt 4 (SSR) + Sanity CMS, deployed to Cloudflare Workers (Workers Builds + Static Assets).

## Stack

- [Nuxt 4](https://nuxt.com)
- [@nuxtjs/sanity](https://sanity.nuxtjs.org/)
- [@nuxt/image](https://image.nuxt.com), [@nuxt/fonts](https://fonts.nuxt.com), [nuxt-svgo](https://github.com/cpsoinos/nuxt-svgo)
- Cloudflare Workers + Static Assets (Nitro `cloudflare-module` preset)

## Local development

```bash
pnpm install
cp .env.example .env   # fill in Sanity values when ready
pnpm dev               # http://localhost:3000
```

To run against the actual Cloudflare Workers runtime (verifies `nodejs_compat` and bindings work):

```bash
pnpm build
pnpm cf:dev   # wrangler dev — uses wrangler.jsonc
```

## Environment variables

| Key                              | Where           | Purpose                                    |
| -------------------------------- | --------------- | ------------------------------------------ |
| `NUXT_PUBLIC_SANITY_PROJECT_ID`  | client + server | Sanity project ID                          |
| `NUXT_PUBLIC_SANITY_DATASET`     | client + server | Sanity dataset name (e.g. `production`)    |
| `NUXT_SANITY_TOKEN`              | server only     | Read token (set as **Secret** in CF dash)  |

Locally these go in `.env`. In production they're set in the Cloudflare Pages project settings (see below).

## Deploys

Pushes to `main` auto-deploy to production via Cloudflare Workers Builds (git integration). Other branches get a preview deployment automatically. The deploy command Cloudflare runs is `npx wrangler deploy`, which reads `wrangler.jsonc`.

If you need to deploy without going through git:

```bash
pnpm cf:deploy
```

(Requires a `wrangler login` first.)

## One-time Cloudflare setup

1. **Connect repo**: Cloudflare dashboard → Workers & Pages → Create → Workers → Connect to Git
   - Production branch: `main`
   - Build command: `pnpm build`
   - Deploy command: `npx wrangler deploy` (default)
2. **Set env vars**: Worker → Settings → Variables and Secrets — add the three keys above for the Production environment (and Preview when you have a staging dataset). Mark `NUXT_SANITY_TOKEN` as a **Secret**
3. **Custom domains**: Worker → Settings → Domains & Routes — add `www.jackbarham.com`. Add `jackbarham.com` only if needed by the redirect rule
4. **Apex → www redirect**: zone for `jackbarham.com` → Rules → Redirect Rules → Create rule
   - When: `(http.host eq "jackbarham.com")`
   - Then: Dynamic → `concat("https://www.jackbarham.com", http.request.uri.path)`
   - Status: 301, Preserve query string: on

## Compatibility

`wrangler.jsonc` pins `compatibility_date` and the `nodejs_compat` flag — required for Nitro's runtime polyfills on Cloudflare Workers. The `assets` block points at the static output and binds to `ASSETS`, which Nitro's `cloudflare-module` preset wires automatically.
