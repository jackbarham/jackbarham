<template>
  <section class="testimonials">
    <div class="layout-wide pb-32">
      <div class="relative bg-brand-yellow/70 pt-12 pb-20 md:pt-24 md:pb-32 lg:pt-20 lg:pb-28 rounded-2xl">

        <carousel
          ref="testimonyCarousel"
          :items-to-show="1"
          :wrap-around="true"
          :touch-drag="{ threshold: 0.1 }"
          :mouse-drag="{ threshold: 0.1 }"
          :transition="500"
        >
          <slide v-for="testimony in items" :key="testimony._key">
            <div class="text-center px-8 sm:px-20 md:px-40 lg:max-w-5xl mx-auto">
              <p class="text-xl/8 md:text-2xl/9 font-medium mb-8">{{ testimony.quote }}</p>
              <div class="md:flex justify-center items-center text-sm md:text-base font-heading font-medium">
                <span class="block mb-1 md:mr-2 md:mb-0">{{ testimony.name }}</span>
                <span class="hidden md:block mr-2">&dash;</span>
                <span class="block">{{ testimony.company }}</span>
              </div>
            </div>
          </slide>

          <template #addons>
            <Pagination />
          </template>

        </carousel>

        <button
          @click="testimonyCarousel?.prev()"
          aria-label="Previous testimonial"
          class="hidden md:block absolute z-10 left-10 xl:left-14 bottom-1/2 translate-y-1/2 w-8 h-8 md:w-14 md:h-14 rounded-full cursor-pointer"
        >
          <svgo-arrow-left filled class="text-brand-red" />
        </button>
        <button
          @click="testimonyCarousel?.next()"
          aria-label="Next testimonial"
          class="hidden md:block absolute z-10 right-14 xl:right-14 bottom-1/2 translate-y-1/2 w-8 h-8 md:w-14 md:h-14 rounded-full cursor-pointerr"
        >
          <svgo-arrow-right filled class="text-brand-red" />
        </button>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
interface TestimonialItem {
  _key: string
  quote: string
  name: string
  company: string
}

interface Props {
  items?: TestimonialItem[]
}

defineProps<Props>()

const testimonyCarousel = ref<{ prev: () => void; next: () => void } | null>(null)
</script>