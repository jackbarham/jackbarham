<template>
  <header class="heading-large">
    <div class="py-10 md:py-16 lg:py-24">
      <h1 class="max-w-4xl font-heading font-black text-4xl md:text-5xl lg:text-6xl">{{ title }}</h1>
      <div class="max-w-xl md:max-w-3xl mt-4">
        <p v-if="intro" class="text-xl/7 text-gray-800 font-medium">{{ intro }}</p>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
interface Props {
  title: string
  intro?: string
}

defineProps<Props>()
</script>