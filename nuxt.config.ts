import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  css: ['./app/assets/css/main.css'],

  components: [
    { path: '~/components', pathPrefix: false, global: true },
  ],

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

  vite: {
    plugins: [tailwindcss()],
  },

  image: {
    provider: 'sanity',
    quality: 80,
    sanity: {
      projectId: process.env.NUXT_PUBLIC_SANITY_PROJECT_ID || 'wc9rahco',
      dataset: process.env.NUXT_PUBLIC_SANITY_DATASET || 'production',
    },
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
