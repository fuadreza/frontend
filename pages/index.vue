<template>
  <div class="relative overflow-hidden bg-white pt-20">
    <!-- Background Elements -->
    <div class="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
      <div class="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-blue-50/50 blur-3xl"></div>
      <div class="absolute top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-teal-50/50 blur-3xl"></div>
    </div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="flex flex-col lg:flex-row items-center justify-between py-12 lg:py-24 gap-12">
        
        <!-- Text Content -->
        <div class="flex-1 text-center lg:text-left space-y-8">
          <div class="space-y-4">
            <span class="inline-block px-4 py-1.5 rounded-full bg-blue-50 text-blue-600 text-sm font-semibold tracking-wide uppercase">
              Growth Intelligence
            </span>
            <h1 class="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
              Unlock Your Business's <br/>
              <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">Full Profit Potential</span>
            </h1>
            <p class="text-xl text-gray-600 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Our data-driven strategies empower entrepreneurs to achieve unprecedented growth and financial efficiency. Stop guessing, start scaling.
            </p>
          </div>

          <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <button class="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-full font-semibold text-lg shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:shadow-blue-600/40 transform hover:-translate-y-1 transition-all duration-300">
              Start Free Trial
            </button>
            <button class="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 border border-gray-200 rounded-full font-semibold text-lg hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 flex items-center justify-center gap-2 group">
              <svg class="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Watch Demo
            </button>
          </div>

          <div class="pt-8 flex items-center justify-center lg:justify-start gap-8 text-gray-400 grayscale opacity-70">
            <!-- Trust Badges / Partner Logos Placeholder -->
            <div class="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
            <div class="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
            <div class="h-8 w-24 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>

        <!-- Hero Image -->
        <div class="flex-1 w-full max-w-lg lg:max-w-xl relative">
          <div class="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/20 border border-gray-100 bg-white p-2">
             <img 
              src="/hero-illustration.png" 
              alt="Business Growth Analytics" 
              class="w-full h-auto rounded-xl transform hover:scale-105 transition-transform duration-700"
            />
          </div>
          <!-- Decorative Elements -->
          <div class="absolute -bottom-6 -right-6 w-24 h-24 bg-yellow-400 rounded-full blur-2xl opacity-20 animate-pulse"></div>
          <div class="absolute -top-6 -left-6 w-32 h-32 bg-blue-400 rounded-full blur-2xl opacity-20 animate-pulse delay-700"></div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
})
</script>
