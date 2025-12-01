<template>
  <div class="min-h-screen flex flex-col bg-gray-50">
    <header class="bg-white/90 backdrop-blur-md fixed w-full z-50 transition-all duration-300 border-b border-gray-100">
      <nav class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <!-- Logo -->
        <div class="flex-shrink-0 flex items-center cursor-pointer">
          <NuxtLink to="/" class="flex items-center gap-2 group">
            <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:shadow-blue-500/30 transition-all duration-300">
              P
            </div>
            <span class="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">ProfitMax</span>
          </NuxtLink>
        </div>

        <!-- Desktop Navigation -->
        <div class="hidden md:flex items-center space-x-8">
          <NuxtLink to="/" class="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200">Home</NuxtLink>
          <NuxtLink to="#features" class="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200">Features</NuxtLink>
          <NuxtLink to="#pricing" class="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200">Pricing</NuxtLink>
        </div>

        <!-- CTA Button -->
        <div class="hidden md:flex items-center">
          <button class="bg-gray-900 text-white px-6 py-2.5 rounded-full font-medium hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/30 transform hover:-translate-y-0.5 transition-all duration-300">
            Try Now
          </button>
        </div>

        <!-- Mobile menu button -->
        <div class="md:hidden flex items-center">
          <button class="text-gray-600 hover:text-gray-900 focus:outline-none">
            <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </nav>
    </header>

    <main class="flex-grow">
      <div class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <slot />
      </div>
    </main>

    <footer class="bg-white border-t border-gray-200 mt-auto">
      <div class="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <p class="text-center text-gray-500 text-sm">
          &copy; {{ new Date().getFullYear() }} NuxtApp. All rights reserved.
        </p>
      </div>
    </footer>
  </div>
</template>
