<template>
  <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
    <PortfolioCard v-for="post in posts" :key="post._id" :post="post" />
  </div>
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

defineProps<{ posts: PortfolioPreview[] }>()
</script>
