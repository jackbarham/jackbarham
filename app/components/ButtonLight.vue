<template>
  <NuxtLink
    :to="url"
    class="inline-flex items-center text-lg text-brand-red-dark font-medium group"
  >
    <span class="inline-block">{{ text }}</span>
    <span class="inline-block h-7 w-7 ml-0.5 -mt-px transition-transform duration-200 group-hover:translate-x-1">
      <svgo-arrow-right filled class="text-brand-red opacity-90" />
    </span>
  </NuxtLink>
</template>

<script setup lang="ts">
interface Props {
  url: string
  text: string
}

defineProps<Props>()
</script>
