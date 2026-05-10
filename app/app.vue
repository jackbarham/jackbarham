<template>
  <main style="font-family: system-ui, sans-serif; max-width: 720px; margin: 4rem auto; padding: 0 1.5rem; line-height: 1.6;">
    <h1>{{ data?.settings?.siteTitle || 'Jack Barham' }}</h1>
    <p v-if="data?.settings?.defaultMeta?.description" style="color: #555;">
      {{ data.settings.defaultMeta.description }}
    </p>

    <section style="margin-top: 2.5rem;">
      <h2 style="font-size: 1.1rem; text-transform: uppercase; letter-spacing: 0.05em; color: #888;">
        Pages ({{ data?.pages?.length || 0 }})
      </h2>
      <ul>
        <li v-for="page in data?.pages" :key="page._id">
          <strong>{{ page.title }}</strong>
          <code style="margin-left: 0.5rem; color: #888;">/{{ page.slug }}</code>
        </li>
      </ul>
    </section>

    <section style="margin-top: 2.5rem;">
      <h2 style="font-size: 1.1rem; text-transform: uppercase; letter-spacing: 0.05em; color: #888;">
        Portfolio ({{ data?.portfolioCount || 0 }} items)
      </h2>
      <ul>
        <li v-for="item in data?.portfolio" :key="item._id">
          <strong>{{ item.title }}</strong>
          <span v-if="item.client" style="color: #888;"> — {{ item.client }}</span>
        </li>
      </ul>
    </section>

    <p v-if="!data" style="color: crimson;">
      No data returned — check NUXT_PUBLIC_SANITY_PROJECT_ID / DATASET in .env.
    </p>
  </main>
</template>

<script setup lang="ts">
type Page = { _id: string; title: string; slug: string }
type Portfolio = { _id: string; title: string; client?: string }
type Data = {
  settings: { siteTitle: string; defaultMeta?: { description?: string } } | null
  pages: Page[]
  portfolio: Portfolio[]
  portfolioCount: number
}

const query = groq`{
  "settings": *[_type == "settings"][0]{ siteTitle, defaultMeta },
  "pages": *[_type == "page"] | order(title asc){ _id, title, "slug": slug.current },
  "portfolio": *[_type == "portfolio"] | order(_createdAt desc)[0...6]{ _id, title, "client": pt::text(client) },
  "portfolioCount": count(*[_type == "portfolio"])
}`

const { data } = await useSanityQuery<Data>(query)
</script>
