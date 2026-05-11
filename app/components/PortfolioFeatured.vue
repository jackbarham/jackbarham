<template>
  <section class="portfolio-featured">
    <div class="pb-16 md:pb-20 lg:pb-28">
      <div class="layout-wide">
        <div class="max-w-lg md:max-w-full mx-auto md:grid md:grid-cols-3 md:gap-x-12">
          <div class="md:col-span-1">
            <h1 class="max-w-4xl font-heading text-4xl md:text-5xl">{{ heading }}</h1>
            <p v-if="intro" class="text-xl/7 text-gray-800 font-medium mt-4">{{ intro }}</p>
          </div>
          <div class="md:col-span-2 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2">
            <PortfolioCard v-for="post in items || []" :key="post._id" :post="post" />
          </div>
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
    }
  }
}

defineProps<{
  heading: string
  intro: string
  items?: PortfolioPreview[]
}>()
</script>
