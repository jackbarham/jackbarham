<template>
  <section class="image-wide">
    <div class="max-w-5xl w-full mx-auto px-4 sm:px-8 lg:px-12 xl:px-16 mb-16">
      <div class="bg-stone-100 rounded-xl aspect-video overflow-hidden">
        <NuxtImg
          provider="sanity"
          :src="image.asset._ref"
          :alt="image.alt"
          :width="imageWidth(image.asset._ref)"
          :height="imageHeight(image.asset._ref)"
          loading="lazy"
          sizes="100vw md:700px lg:100px xl:1200px"
          class="w-full h-full object-cover"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  _key: string
  _type: string
  image: {
    asset: { _ref: string }
    alt: string
  }
}

defineProps<Props>()

const { imageWidth, imageHeight } = useImageDimensions()
</script>