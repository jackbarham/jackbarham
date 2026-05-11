<template>
  <section class="heading-intro">
    <div class="layout-slim">
      <HeadingLarge :title="heading" :intro="intro" />
    </div>
  </section>
</template>

<script setup lang="ts">
defineProps<{
  _key: string
  _type: string
  heading: string
  intro?: string
}>()
</script>