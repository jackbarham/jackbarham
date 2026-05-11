<template>
  <section class="portfolio-feed">
    <div class="pb-16 md:pb-20 lg:pb-28">
      <div class="layout-wide">
        <div class="max-w-lg md:max-w-full mx-auto">
          <HeadingLarge :title="heading" :intro="intro" />
          <PortfolioGrid :posts="portfolio || []" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface PortfolioPreview {
  _id: string
  title: string
  slug: { current: string }
  tagline?: string
  previewImage?: {
    asset?: {
      _ref?: string
      url?: string
    }
  }
}

interface Props {
  heading: string
  intro?: string
}

defineProps<Props>()

const { data: portfolio } = await useSanityQuery<PortfolioPreview[]>(groq`
  *[_type == "portfolio"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    tagline,
    previewImage { asset }
  }
`)
</script>
