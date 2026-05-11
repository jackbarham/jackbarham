<template>
  <div>
    <template v-if="page">
      <template v-for="block in page.components" :key="block._key">
        <component
          v-if="getBlockComponent(block._type)"
          :is="getBlockComponent(block._type)"
          v-bind="block"
        />
        <div v-else-if="isDev" class="p-4 bg-yellow-100 border border-yellow-400 text-yellow-800">
          Unknown block type: <strong>{{ block._type }}</strong>
        </div>
      </template>
    </template>
    <template v-else>
      <h1>Page not found</h1>
    </template>
  </div>
</template>

<script setup lang="ts">
import type { Page } from '~/types/sanity'

const route = useRoute()
const slug = route.params.slug
  ? Array.isArray(route.params.slug)
    ? route.params.slug.join('/')
    : route.params.slug
  : 'home'

const { data: page } = await useSanityQuery<Page & { siteTitle?: string }>(groq`
  *[_type == "page" && slug.current == $slug][0]{
    _id,
    title,
    slug,
    "siteTitle": *[_type == "settings" && _id == "settings"][0].siteTitle,
    pageMeta{
      description,
      image{
        asset->{url}
      }
    },
    components[]{
      ...,
      _type,
      _key,
      // Expand portfolioFeed references
      _type == "portfolioFeed" => {
        buttonCta{
          text,
          link->{
            _id,
            slug
          }
        },
        selectedItems[]->{
          _id,
          title,
          slug,
          tagline,
          previewImage{
            asset
          }
        }
      },
      _type == "portfolioFeatured" => {
        items[]->{
          _id,
          title,
          slug,
          tagline,
          previewImage{
            asset
          }
        }
      }
    }
  }
`, { slug })

// Check if in development mode
const isDev = import.meta.dev
const { resolve: getBlockComponent } = useBlockResolver()

// Override default SEO meta for each page
useCustomSeoMeta({
  siteTitle: () => page.value?.siteTitle,
  description: () => page.value?.pageMeta?.description,
  image: () => page.value?.pageMeta?.image?.asset?.url,
})
</script>
