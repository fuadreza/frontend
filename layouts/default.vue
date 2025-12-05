<template>
  <div class="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <header 
      class="fixed z-50 ease-[cubic-bezier(0.25, 1, 0.5, 1.2)] transition-[margin,width,max-width,border-radius,box-shadow,background-color,backdrop-filter] duration-300"
      :class="[
        isScrolled 
          ? 'top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-7xl rounded-2xl bg-white/30 dark:bg-gray-800/30 backdrop-blur-xl shadow-lg border border-white/20 dark:border-gray-700/20' 
          : 'w-full top-0 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-700'
      ]"
    >
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center cursor-pointer">
          <NuxtLink to="/" class="flex items-center gap-2 group">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:shadow-blue-500/30 transition-all duration-300">
              P
            </div>
            <span class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300">ProfitMax</span>
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink to="/" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200">Home</NuxtLink>
          <NuxtLink to="#features" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200">Features</NuxtLink>
          <NuxtLink to="#pricing" class="text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors duration-200">Pricing</NuxtLink>
        </div>

        <!-- Right Side: Theme Toggle + CTA Button -->
        <div class="hidden md:flex items-center gap-3">
          <ThemeToggle />
          <NuxtLink to="/login">
            <button class="bg-gray-900 dark:bg-blue-600 text-white px-6 py-2.5 rounded-full font-medium hover:bg-blue-600 dark:hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-300">
              Try Now
            </button>
          </NuxtLink>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden flex items-center gap-2">
          <ThemeToggle />
          <button class="text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 focus:outline-none">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>

    <main class="pt-20 flex-grow">
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <slot />
      </div>
    </main>

    <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-auto transition-colors duration-300">
      <div class="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div class="flex flex-col md:flex-row justify-between items-center gap-8">
          
          <!-- Logo (Left) -->
          <div class="flex-shrink-0">
            <NuxtLink to="/" class="flex items-center gap-2 group">
              <div class="w-8 h-8 bg-gradient-to-br from-blue-600 to-teal-500 rounded-lg flex items-center justify-center text-white font-bold text-lg shadow-md group-hover:shadow-blue-500/30 transition-all duration-300">
                P
              </div>
              <span class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300">ProfitMax</span>
            </NuxtLink>
          </div>

          <!-- Menu Links (Center/Right) -->
          <nav class="flex flex-wrap justify-center gap-x-8 gap-y-4">
            <NuxtLink to="#" class="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 text-sm font-medium">
              Contact Us
            </NuxtLink>
            <NuxtLink to="#" class="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 text-sm font-medium">
              Terms and Conditions
            </NuxtLink>
            <NuxtLink to="#" class="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 text-sm font-medium">
              Privacy Policy
            </NuxtLink>
          </nav>

          <!-- Copyright (Right) -->
          <div class="text-gray-400 dark:text-gray-500 text-sm">
            &copy; {{ new Date().getFullYear() }} ProfitMax. All rights reserved.
          </div>
          
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const isScrolled = ref(false)

const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>
