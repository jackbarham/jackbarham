<template>
  <header 
    class="header fixed top-0 left-0 w-full z-50 transform transition-transform duration-400 ease-in-out" 
    :class="headerVisible ? 'translate-y-0' : '-translate-y-full'"
  >
    
    <!-- Main Header -->
    <div class="relative z-50 bg-stone-50">
      <div class="h-16 md:h-20 flex justify-between items-center layout-full">
        
        <!-- Title -->
        <h1 class="text-[26px] md:text-3xl font-heading">
          <NuxtLink to="/" @click="closeMobileMenu()">{{ siteTitle }}</NuxtLink>
        </h1>
        
        <!-- Desktop Navigation -->
        <nav aria-label="Main navigation">
          <ul class="hidden md:flex md:space-x-12 lg:space-x-16 items-center">
            <li v-for="link in menu" :key="link.url">
              <NuxtLink :to="link.url" :aria-label="link.title" class="relative group">
                <span class="block font-medium tracking-wide text-lg">{{ link.title }}</span>
                <span class="relative block">
                  <span class="absolute left-0 bottom-0 h-0.5 bg-gray-950 w-full transform scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-in-out origin-left opacity-90"></span>
                </span>
              </NuxtLink>
            </li>
          </ul>
        </nav>

        <!-- Desktop CTA -->
        <a href="mailto:jack@airboxmedia.com" class="hidden md:inline-flex items-center bg-stone-800 hover:bg-brand-red group h-12 px-8 rounded-full transition-colors duration-300">
          <span class="inline-block h-5 w-5 mr-3">
            <svgo-email filled class="text-white group-hover:text-stone-50" />
          </span>
          <span class="block font-medium tracking-wide text-lg text-white">Contact</span>
        </a>

        <!-- Toggle Menu Button -->
        <button
          @click="toggleMobileMenu()"
          :aria-expanded="menuOpen"
          aria-controls="mobile-navigation"
          aria-label="Toggle menu"
          class="relative z-50 visible md:hidden w-8 h-8 cursor-pointer"
        >
          <svgo-burger v-if="!menuOpen" filled class="text-gray-950" />
          <svgo-close v-else filled class="text-gray-950" />
        </button>
        
      </div>
    </div>
    
    <!-- Mobile Navigation -->
    <nav
      aria-label="Mobile navigation"
      id="mobile-navigation"
      class="absolute -z-10 left-0 w-full bg-stone-50 p-12 transform transition-transform ease-in-out duration-300"
      :class="menuOpen ? 'translate-y-0' : '-translate-y-full'"
      :style="{ top: `${HEADER_HEIGHT}px`, height: `calc(100dvh - ${HEADER_HEIGHT}px)` }"
    >
      <ul class="space-y-4">
        <li 
          v-for="(link, index) in menu" 
          :key="link.url"
          class="transform transition-all ease-in-out duration-300"
          :class="menuOpen ? 'translate-x-0 opacity-100' : 'translate-x-4 opacity-0'"
          :style="{ transitionDelay: menuOpen ? `${200 + (index * 150)}ms` : '0ms' }"
        >
          <NuxtLink 
            :to="link.url" 
            @click="closeMobileMenu"
            :aria-label="link.title"
            class="block text-3xl font-semibold tracking-wide py-3"
          >{{ link.title }}</NuxtLink>
        </li>
      </ul>

      <!-- CTA button -->
      <div 
        class="absolute bottom-12 min-w-48 transform transition-opacity duration-700 ease-in-out"
        :class="menuOpen ? 'opacity-100' : 'opacity-0'"
        :style="{ 
          transitionDelay: menuOpen ? '400ms' : '0ms',
          transitionDuration: menuOpen ? '700ms' : '150ms'
        }"
      >
        <a href="mailto:jack@airboxmedia.com" class="">
          <span class="inline-block opacity-75 mb-1.5">Discuss your project or idea</span>
          <span class="block text-2xl font-heading font-semibold md:text-lg">jack@airboxmedia.com</span>
        </a>
      </div>
      
    </nav>

  </header>
</template>

<script setup lang="ts">
import type { MainMenu } from '~/types/sanity'

// Constants (px)
const HEADER_HEIGHT = 64
const SCROLL_THRESHOLD = 50

defineProps<{
  siteTitle?: string | null
  menu?: MainMenu[] | null
}>()

// Mobile menu state
const menuOpen = ref(false)

// Header visibility state
const headerVisible = ref(true)
const lastScrollY = ref(0)

// Mobile menu functions
const toggleMobileMenu = () => {
  menuOpen.value = !menuOpen.value
}

const closeMobileMenu = () => {
  menuOpen.value = false
}

// Lock/unlock body scroll when menu state changes
watchEffect(() => {
  if (import.meta.client) {
    document.body.classList.toggle('overflow-hidden', menuOpen.value)
  }
})

// Close menu when route changes
const router = useRouter()
router.afterEach(() => {
  closeMobileMenu()
})

// Handle scroll for header show/hide
const handleScroll = () => {
  if (!import.meta.client) return

  const currentScrollY = window.scrollY

  // At top of page - always show header
  if (currentScrollY <= SCROLL_THRESHOLD) {
    headerVisible.value = true
    lastScrollY.value = currentScrollY
    return
  }

  // Determine scroll direction
  if (currentScrollY > lastScrollY.value) {
    // Scrolling down - hide header
    headerVisible.value = false
  } else if (currentScrollY < lastScrollY.value) {
    // Scrolling up - show header
    headerVisible.value = true
  }

  lastScrollY.value = currentScrollY
}

// Handle window resize to close mobile menu
const handleResize = () => {
  if (menuOpen.value) {
    closeMobileMenu()
  }
}

// Setup scroll and resize listeners
onMounted(() => {
  if (import.meta.client) {
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', handleResize)
  }
})

// Cleanup on unmount
onUnmounted(() => {
  if (import.meta.client) {
    document.body.classList.remove('overflow-hidden')
    window.removeEventListener('scroll', handleScroll)
    window.removeEventListener('resize', handleResize)
  }
})
</script>