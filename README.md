# jackbarham.com

Personal site. Nuxt 4 (SSR) + Sanity CMS, deployed to Cloudflare Pages.

## Stack

- [Nuxt 4](https://nuxt.com)
- [@nuxtjs/sanity](https://sanity.nuxtjs.org/)
- [@nuxt/image](https://image.nuxt.com), [@nuxt/fonts](https://fonts.nuxt.com), [nuxt-svgo](https://github.com/cpsoinos/nuxt-svgo)
- Cloudflare Pages (Nitro `cloudflare-pages` preset)

## Local development

```bash
pnpm install
cp .env.example .env   # fill in Sanity values when ready
pnpm dev               # http://localhost:3000
```

To run against the actual Cloudflare Workers runtime (verifies `nodejs_compat` and bindings work):

```bash
pnpm build
pnpm cf:dev
```

## Environment variables

| Key                              | Where           | Purpose                                    |
| -------------------------------- | --------------- | ------------------------------------------ |
| `NUXT_PUBLIC_SANITY_PROJECT_ID`  | client + server | Sanity project ID                          |
| `NUXT_PUBLIC_SANITY_DATASET`     | client + server | Sanity dataset name (e.g. `production`)    |
| `NUXT_SANITY_TOKEN`              | server only     | Read token (set as **Secret** in CF dash)  |

Locally these go in `.env`. In production they're set in the Cloudflare Pages project settings (see below).

## Deploys

Pushes to `main` auto-deploy to production via the Cloudflare Pages git integration. Other branches get a preview URL automatically. No manual step required.

If you need to deploy without going through git:

```bash
pnpm cf:deploy
```

(Requires a `wrangler login` first.)

## One-time Cloudflare setup

1. **Connect repo**: Cloudflare dashboard → Workers & Pages → Create → Pages → Connect to Git
   - Production branch: `main`
   - Build command: `pnpm build`
   - Build output directory: `dist`
   - Framework preset: Nuxt
2. **Set env vars**: Pages project → Settings → Variables and Secrets — add the three keys above for the Production environment (and Preview when you have a staging dataset)
3. **Custom domains**: Pages project → Custom domains — add both `www.jackbarham.com` and `jackbarham.com`
4. **Apex → www redirect**: zone for `jackbarham.com` → Rules → Redirect Rules → Create rule
   - When: `(http.host eq "jackbarham.com")`
   - Then: Dynamic → `concat("https://www.jackbarham.com", http.request.uri.path)`
   - Status: 301, Preserve query string: on

## Compatibility

`wrangler.jsonc` pins `compatibility_date` and the `nodejs_compat` flag — required for Nitro's runtime polyfills on Cloudflare Workers.
