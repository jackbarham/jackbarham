<template>
  <figure v-if="imageId" class="portable-text-image">
    <NuxtImg
      provider="sanity"
      :src="imageId"
      :width="imageWidth(imageId)"
      :height="imageHeight(imageId)"
      :alt="value?.alt || ''"
      sizes="100vw sm:100vw md:780px"
      loading="lazy"
      class="rounded-lg bg-gray-100"
    />
    <figcaption v-if="value?.caption" class="text-center">{{ value.caption }}</figcaption>
  </figure>
</template>

<script setup lang="ts">
import type { SanityImage } from '~/types/sanity'

const props = defineProps<{
  value: SanityImage
}>()

const imageId = computed(() => props.value?.asset?._ref || '')

const { imageWidth, imageHeight } = useImageDimensions()
</script>
