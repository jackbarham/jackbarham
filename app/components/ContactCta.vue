<template>
  <section class="contact-cta">
    <div class="py-20 md:py-24">
      <div class="layout-wide">
        <div class="max-w-2xl mx-auto px-8 md:px-0">
          <h1 class="text-3xl md:text-4xl mb-7">{{ heading }}</h1>
          <div class="prose">
            <p class="mb-8">{{ copy }}</p>
            <a class="inline-flex font-semibold items-center text-lg" :href="`mailto:${email}`">{{ email }}</a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  heading: string
  copy: string
  email: string
}

defineProps<Props>()
</script>
