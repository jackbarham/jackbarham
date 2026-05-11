<template>
  <footer class="footer">
    <div class="pt-16 pb-14 md:py-14 border-t-2 border-stone-200/70 bg-stone-50">
      <div class="lg:flex justify-between items-center md:flex-row-reverse layout-full">
        <div v-if="socialMedia?.socialLinks?.length" class="flex justify-center lg:justify-normal lg:mr-0 mb-8 lg:mb-0 gap-4 md:gap-8">
          <a
            v-for="link in socialMedia.socialLinks"
            :key="link._key"
            :href="link.url"
            target="_blank"
            rel="noopener noreferrer"
            class="hover:text-brand-red transition-colors font-medium text-base"
          >{{ link.name }}</a>
        </div>
        <div class="text-center lg:text-left">
          <h1 class="text-3xl font-heading mb-1">
            <NuxtLink to="/" class="hover:text-brand-red">{{ siteTitle }}</NuxtLink>
          </h1>
          <!-- <p class="max-w-56 lg:max-w-full mx-auto mb-6 md:mb-2">{{ footer?.tagline }}</p> -->
          <p class="mx-auto text-sm opacity-60">Copyright &copy; 2010 - 2026 Airbox Media Ltd</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import type { Settings } from '~/types/sanity'

defineProps<{
  siteTitle?: string | null
  footer?: Settings['footer']
  socialMedia?: Settings['socialMedia']
}>()
</script>