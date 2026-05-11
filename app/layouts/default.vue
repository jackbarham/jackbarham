<template>
  <div class="flex flex-col h-screen">
    <MainHeader :site-title="settings?.siteTitle" :menu="settings?.mainMenu" />
    <main 
      role="main" 
      class="flex-1 pt-16 md:pt-20 relative"
      :class="{ 'pb-6 md:pb-8': isPortfolioItem }"
    >
      <div class="relative min-h-full">
        <slot />

        <Transition
          name="slide-up"
          enter-active-class="transition-transform duration-200 ease-out"
          leave-active-class="transition-transform duration-200 ease-in"
          enter-from-class="transform translate-y-full"
          enter-to-class="transform translate-y-0"
          leave-from-class="transform translate-y-0"
          leave-to-class="transform translate-y-full"
        >
          <NavigationBar
            v-if="isPortfolioItem"
            :current-slug="(route.params.slug as string)"
            class="sticky bottom-4 left-0 right-0 z-30 mx-8"
          />
        </Transition>
      </div>
    </main>
    <MainFooter
      :site-title="settings?.siteTitle"
      :footer="settings?.footer"
      :social-media="settings?.socialMedia"
    />
  </div>
</template>

<script setup lang="ts">
import type { Settings } from '~/types/sanity'

const { data: settings } = await useSanityQuery<Settings>(
  groq`*[_type == "settings" && _id == "settings"][0]{
    siteTitle,
    mainMenu[]->{
      title,
      "url": "/" + select(slug.current == "home" => "", slug.current)
    },
    footer,
    socialMedia,
    defaultMeta {
      description,
      "imageUrl": image.asset->url
    }
  }`
)

const route = useRoute()

const isPortfolioItem = computed(() => {
  return route.path.startsWith('/portfolio/') && !!route.params.slug
})

// Set default SEO meta from CMS settings
useCustomSeoMeta({
  siteTitle: () => settings.value?.siteTitle,
  description: () => settings.value?.defaultMeta?.description,
  image: () => settings.value?.defaultMeta?.imageUrl,
})
</script>