<template>
  <section class="hero-intro">
    <div class="layout-mid">
      <div class="max-w-xl lg:max-w-full mx-auto py-12 md:pt-20 lg:py-28">
        <div class="flex flex-col lg:flex-row gap-8 md:gap-16 items-center">
          <div class="w-full lg:w-2/5 px-6 md:px-0 relative -left-1">
            <svg
            class="w-full h-auto max-w-115 mx-auto"
            :viewBox="viewBox"
            preserveAspectRatio="xMidYMid meet"
          >
            <defs>
              <clipPath id="blob-mask">
                <path :transform="blobTransform" :d="blobPath" />
              </clipPath>
            </defs>
            <foreignObject
              :x="blobBox.x"
              :y="blobBox.y"
              :width="blobBox.width"
              :height="blobBox.height"
              clip-path="url(#blob-mask)"
            >
              <NuxtImg
                v-if="image?.asset?._ref"
                provider="sanity"
                quality="85"
                :src="image.asset._ref"
                :width="imageWidth(image.asset._ref)"
                :height="imageHeight(image.asset._ref)"
                loading="lazy"
                :alt="image.alt || heading"
                sizes="100vw md:700px lg:600px"
                class="w-full h-full object-cover"
              />
            </foreignObject>
          </svg>
          </div>
          <div class="w-full lg:w-3/5 flex flex-col gap-4 md:gap-6 max-w-sm sm:max-w-full text-center lg:text-left px-8 md:px-0">
            <h1 class="text-4xl/11 sm:text-6xl/18 lg:text-6xl/18 xl:text-7xl/20 font-extrabold">{{ heading }}</h1>
            <p v-if="tagline" class="text-xl/7 sm:text-2xl/8.5 text-gray-800 font-medium">{{ tagline }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface Props {
  image?: {
    asset?: { _ref?: string }
    alt?: string
  }
  heading: string
  tagline?: string
}

defineProps<Props>()

const { imageWidth, imageHeight } = useImageDimensions()

const blobBox = { x: 190, y: 62, width: 510, height: 475 }
const viewBox = `${blobBox.x} ${blobBox.y} ${blobBox.width} ${blobBox.height}`
const blobTransform = 'translate(441.675 311.788)'
const blobPath = 'M173.1 -202.3C219.4 -167.5 248.6 -108.2 255.2 -48.3C261.9 11.7 246.1 72.3 214 119.3C181.8 166.3 133.3 199.7 82.1 212.8C30.9 225.8 -23 218.6 -80.5 204.8C-137.9 191 -198.9 170.5 -224.4 128.5C-250 86.5 -240.2 22.9 -223.6 -33.9C-207 -90.7 -183.5 -140.7 -145.1 -176.9C-106.7 -213.2 -53.4 -235.6 5 -241.6C63.4 -247.6 126.8 -237.2 173.1 -202.3'
</script>
