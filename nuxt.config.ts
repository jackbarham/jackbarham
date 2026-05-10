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

  runtimeConfig: {
    sanity: {
      token: '',
    },
    public: {
      sanity: {
        projectId: '',
        dataset: '',
      },
    },
  },

  sanity: {
    projectId: '',
    dataset: '',
    apiVersion: '2025-01-01',
    useCdn: true,
  },
})
