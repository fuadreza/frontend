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

  <!-- Features & Benefits Section -->
  <section class="py-24 bg-gray-50 relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          How We Maximize Your Profit
        </h2>
        <p class="text-lg text-gray-600">
          Unlock the full potential of your business with our cutting-edge tools and strategies designed for sustainable growth.
        </p>
      </div>

      <div 
        ref="featuresGrid"
        class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <FeatureCard
          v-for="(feature, index) in features"
          :key="feature.title"
          :title="feature.title"
          :description="feature.description"
          class="transition-all duration-700 ease-out transform"
          :class="[
            areFeaturesVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          ]"
          :style="{ transitionDelay: `${index * 150}ms` }"
        >
          <template #icon>
            <svg class="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" :d="feature.iconPath" />
            </svg>
          </template>
        </FeatureCard>
      </div>
    </div>
  </section>

  <!-- Social Proof / Testimonials Section -->
  <section class="py-24 bg-white relative overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="text-center max-w-3xl mx-auto mb-16">
        <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
          Trusted by Visionary Entrepreneurs
        </h2>
        <p class="text-lg text-gray-600">
          See how our data-driven approach is transforming businesses and driving real results.
        </p>
      </div>

      <div 
        ref="testimonialsGrid"
        class="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <TestimonialCard
          v-for="(testimonial, index) in testimonials"
          :key="testimonial.author"
          :quote="testimonial.quote"
          :author="testimonial.author"
          :handle="testimonial.handle"
          class="transition-all duration-700 ease-out transform"
          :class="[
            areTestimonialsVisible 
              ? 'opacity-100 translate-y-0' 
              : 'opacity-0 translate-y-12'
          ]"
          :style="{ transitionDelay: `${index * 200}ms` }"
        />
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

definePageMeta({
  layout: 'default',
})

const featuresGrid = ref<HTMLElement | null>(null)
const areFeaturesVisible = ref(false)

const testimonialsGrid = ref<HTMLElement | null>(null)
const areTestimonialsVisible = ref(false)

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          areFeaturesVisible.value = true
          observer.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: '50px',
    }
  )

  if (featuresGrid.value) {
    observer.observe(featuresGrid.value)
  }

  const testimonialsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          areTestimonialsVisible.value = true
          testimonialsObserver.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: '50px',
    }
  )

  if (testimonialsGrid.value) {
    testimonialsObserver.observe(testimonialsGrid.value)
  }
})

const features = [
  {
    title: 'AI-Powered Profit Analytics',
    description: 'Gain deep insights into your revenue streams and identify hidden opportunities for growth.',
    iconPath: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
  },
  {
    title: 'Dynamic Pricing Strategies',
    description: 'Adjust your product prices in real-time to maximize margins without losing sales.',
    iconPath: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  },
  {
    title: 'Automated Cost Optimization',
    description: 'Automatically detect and eliminate unnecessary expenditures to boost your bottom line.',
    iconPath: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z M15 12a3 3 0 11-6 0 3 3 0 016 0z'
  },
  {
    title: 'Personalized Growth Roadmaps',
    description: 'Receive tailored strategies to scale your business efficiently based on your unique data.',
    iconPath: 'M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7'
  }
]

const testimonials = [
  {
    quote: "Our revenue increased by 30% after just three months using their strategy. The insights were actionable and immediate.",
    author: "Budi Santoso",
    handle: "@Budis_Coffee"
  },
  {
    quote: "The deep cost analysis saved us thousands monthly and transformed our operation. Highly recommended for any growing business.",
    author: "Lina Wijaya",
    handle: "@LinaBeauty_ID"
  }
]
</script>
