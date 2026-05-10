// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  modules: [
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxtjs/sanity',
    'nuxt-svgo',
    'vue3-carousel-nuxt',
  ],

  nitro: {
    preset: 'cloudflare-module',
  },

  sanity: {
    projectId: process.env.NUXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NUXT_PUBLIC_SANITY_DATASET,
    apiVersion: '2026-02-01',
    useCdn: true,
    visualEditing: {
      studioUrl: process.env.NUXT_PUBLIC_SANITY_STUDIO_URL,
      token: process.env.NUXT_SANITY_VIEWER_TOKEN,
      stega: true,
      mode: 'live-visual-editing',
    },
  },
})
