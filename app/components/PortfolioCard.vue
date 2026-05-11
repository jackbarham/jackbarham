<template>
  <NuxtLink :to="`/portfolio/${post.slug?.current}`" class="block group">
    <div class="relative aspect-3/2 mb-3 bg-stone-100 rounded-lg overflow-hidden">
      <NuxtImg
        v-if="post.previewImage?.asset?._ref"
        provider="sanity"
        :src="post.previewImage.asset._ref"
        :width="imageWidth(post.previewImage.asset._ref)"
        :height="imageHeight(post.previewImage.asset._ref)"
        loading="lazy"
        :alt="post.title"
        sizes="100vw md:50vw xl:450px"
        class="w-full h-full object-cover scale-100 opacity-100 group-hover:scale-[102%] group-hover:opacity-90 duration-300"
      />
    </div>
    <h3 class="text-2xl/9 md:text-[22px]/6 tracking-normal group-hover:text-brand-red duration-200">{{ post.title }}</h3>
    <p v-if="post.tagline" class="opacity-60 md:mt-px">{{ post.tagline }}</p>
  </NuxtLink>
</template>

<script setup lang="ts">
const { imageWidth, imageHeight } = useImageDimensions()

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
  post: PortfolioPreview
}>()
</script>
