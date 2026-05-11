<template>
  <section class="navigation-bar">
    <div class="bg-stone-800 max-w-xl mx-auto rounded-full px-4 sm:px-8">
      <div class="grid grid-cols-3 items-center">
        
        <!-- Left: Recent Post -->
        <div class="flex justify-start">
          <NuxtLink
            v-if="nextPost"
            :to="`/portfolio/${nextPost.slug}`"
            class="flex items-center text-white h-12 md:h-14 group"
          >
            <span class="inline-block h-6 w-6 mr-2 transition-transform duration-300 group-hover:-translate-x-1">
              <svgo-arrow-left filled class="text-white" />
            </span>
            <span class="font-medium">Recent</span>
          </NuxtLink>
          <div
            v-else
            class="flex items-center text-white h-12 md:h-14 opacity-50 cursor-not-allowed"
          >
            <span class="inline-block h-6 w-6 mr-2">
              <svgo-arrow-left filled class="text-white" />
            </span>
            <span class="font-medium">Recent</span>
          </div>
        </div>

        <!-- Center: Counter -->
        <div class="flex items-center justify-center">
          <span class="font-medium text-white">
            {{ (posts?.length ?? 0) - currentIndex }} / {{ posts?.length ?? 0 }}
          </span>
        </div>

        <!-- Right: Previous Post -->
        <div class="flex justify-end">
          <NuxtLink
            v-if="previousPost"
            :to="`/portfolio/${previousPost.slug}`"
            class="flex items-center text-white text-right h-12 md:h-14 group"
          >
            <span class="font-medium">Previous</span>
            <span class="inline-block h-6 w-6 ml-2 transition-transform duration-300 group-hover:translate-x-1">
              <svgo-arrow-right filled class="text-white" />
            </span>
          </NuxtLink>
          <div
            v-else
            class="flex items-center text-white text-right h-12 md:h-14 opacity-50 cursor-not-allowed"
          >
            <span class="font-medium">Previous</span>
            <span class="inline-block h-6 w-6 ml-2">
              <svgo-arrow-right filled class="text-white" />
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface PortfolioPost {
  _id: string
  title: string
  slug: string
}

const props = defineProps<{
  currentSlug: string
}>()

// Fetch all portfolio posts sorted by publishedAt (most recent first)
const { data: posts } = await useSanityQuery<PortfolioPost[]>(groq`
  *[_type == "portfolio"] | order(publishedAt desc) {
    _id,
    title,
    "slug": slug.current
  }
`)

const currentIndex = computed(() => {
  return posts.value?.findIndex(post => post.slug === props.currentSlug) ?? -1
})

const nextPost = computed(() => {
  if (currentIndex.value > 0) {
    return posts.value?.[currentIndex.value - 1] ?? null
  }
  return null
})

const previousPost = computed(() => {
  if (currentIndex.value !== -1 && currentIndex.value < (posts.value?.length ?? 0) - 1) {
    return posts.value?.[currentIndex.value + 1] ?? null
  }
  return null
})
</script>