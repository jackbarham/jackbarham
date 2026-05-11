<template>
  <div v-if="portfolio" class="page-portfolio">
    <article class="layout-large">
      <div class="max-w-2xl lg:max-w-full mx-auto">
        <HeadingLarge :title="portfolio.title" :intro="portfolio.intro" />
        <div class="pb-4 md:pb-0">
          <div class="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 lg:gap-10 xl:gap-12">
            <div class="w-full">
              <div v-if="portfolio.vimeoId" class="mb-4 lg:mb-8 bg-gray-100 rounded-xl overflow-hidden">
                <div class="aspect-video">
                  <iframe
                    :src="`https://player.vimeo.com/video/${portfolio.vimeoId}?autoplay=1&loop=1&muted=1`"
                    width="100%"
                    height="100%"
                    frameborder="0"
                    allow="autoplay; fullscreen"
                    allowfullscreen
                  />
                </div>
              </div>
              <div
                v-for="(item, index) in portfolio.gallery"
                :key="item._key"
                class="mb-4 lg:mb-8 bg-gray-100 rounded-xl overflow-hidden"
              >
                <NuxtImg
                  v-if="item.asset?._ref"
                  provider="sanity"
                  :src="item.asset._ref"
                  :width="imageWidth(item.asset._ref)"
                  :height="imageHeight(item.asset._ref)"
                  :alt="item.alt || portfolio.title"
                  :loading="index === 0 ? 'eager' : 'lazy'"
                  sizes="360px sm:100vw md:670px"
                  class="w-full"
                />
              </div>
            </div>
            <div class="w-full lg:w-90 xl:w-110">
              <div v-if="portfolio.client" class="mb-12">
                <h2 class="text-2xl lg:text-3xl mb-4">Client</h2>
                <div class="prose">
                  <PortableText :value="portfolio.client" />
                </div>
              </div>
              <div class="mb-8">
                <h2 v-if="portfolio.scope" class="text-2xl lg:text-3xl mb-4">Scope</h2>
                <div v-if="portfolio.scope" class="prose mb-8">
                  <PortableText :value="portfolio.scope" />
                </div>
                <ul>
                  <li v-if="portfolio.technology" class="mb-1">
                    <strong>Stack:</strong> {{ portfolio.technology }}
                  </li>
                  <li v-if="portfolio.role" class="mb-1">
                    <strong>Role:</strong> {{ portfolio.role }}
                  </li>
                  <li v-if="portfolio.published">
                    <strong>Published:</strong> {{ portfolio.published }}
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  </div>
  <div v-else>
    <h1>Portfolio not found</h1>
  </div>
</template>

<script setup lang="ts">
import { PortableText } from '@portabletext/vue'
import type { Portfolio } from '~/types/sanity'

const { imageWidth, imageHeight } = useImageDimensions()

const route = useRoute()
const slug = route.params.slug as string

const { data: portfolio } = await useSanityQuery<Portfolio>(groq`
  *[_type == "portfolio" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    publishedAt,
    previewImage{
      asset->{url}
    },
    tagline,
    vimeoId,
    gallery[]{
      _key,
      alt,
      asset
    },
    intro,
    client,
    scope,
    technology,
    role,
    published
  }
`, { slug })

useSeoMeta({
  title: () => portfolio.value?.title,
  description: () => portfolio.value?.tagline || portfolio.value?.intro,
})
</script>
