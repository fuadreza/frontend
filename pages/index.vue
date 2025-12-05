<template>
  <div>
    <div class="relative overflow-hidden bg-gray-50 dark:bg-gray-900 transition-colors duration-300 pt-20">
      <!-- Background Elements -->
      <div class="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div class="absolute -top-[20%] -right-[10%] w-[70%] h-[70%] rounded-full bg-blue-100/30 dark:bg-blue-900/20 blur-3xl"/>
        <div class="absolute top-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-teal-100/30 dark:bg-teal-900/20 blur-3xl"/>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="flex flex-col lg:flex-row items-center justify-between py-12 lg:py-24 gap-12">
          
          <!-- Text Content -->
          <div class="flex-1 text-center lg:text-left space-y-8">
            <div class="space-y-4">
              <span class="inline-block px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold tracking-wide uppercase">
                Manajemen Produksi Cerdas
              </span>
              <h1 class="text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-100 leading-tight tracking-tight">
                Kelola Produksi & <br>
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500 dark:from-blue-400 dark:to-teal-400">Maksimalkan Profit</span>
              </h1>
              <p class="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Sistem manajemen produksi terintegrasi untuk menghitung HPP, kelola stok bahan & kemasan, dan optimalkan kapasitas produksi Anda.
              </p>
            </div>

            <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <NuxtLink to="/login">
                <button class="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white rounded-full font-semibold text-lg shadow-lg shadow-blue-500/30 hover:bg-blue-700 hover:shadow-blue-600/40 transform hover:-translate-y-1 transition-all duration-300">
                  Mulai Sekarang
                </button>
              </NuxtLink>
              <button class="w-full sm:w-auto px-8 py-4 bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-full font-semibold text-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-all duration-300 flex items-center justify-center gap-2 group">
                <svg class="w-5 h-5 text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Lihat Demo
              </button>
            </div>

            <div class="pt-8 flex items-center justify-center lg:justify-start gap-6 flex-wrap">
              <!-- Tagline Badges -->
              <div class="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md border border-gray-200 dark:border-gray-700">
                <svg class="w-5 h-5 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">0 Depo</span>
              </div>
              <div class="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md border border-gray-200 dark:border-gray-700">
                <svg class="w-5 h-5 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">MaxWin</span>
              </div>
              <div class="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-full shadow-md border border-gray-200 dark:border-gray-700">
                <svg class="w-5 h-5 text-purple-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span class="text-sm font-semibold text-gray-700 dark:text-gray-300">MaxProfit</span>
              </div>
            </div>
          </div>

          <!-- Hero Image -->
          <div class="flex-1 w-full max-w-lg lg:max-w-xl relative">
            <div class="relative rounded-2xl overflow-hidden shadow-2xl shadow-blue-500/20 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-2">
              <img 
                src="/illustration-profit.png" 
                alt="Business Growth Analytics" 
                class="w-full h-auto rounded-xl transform hover:scale-105 transition-transform duration-700"
              >
            </div>
            <!-- Decorative Elements -->
            <div class="absolute -bottom-6 -right-6 w-24 h-24 bg-yellow-400 dark:bg-yellow-600 rounded-full blur-2xl opacity-20 animate-pulse"/>
            <div class="absolute -top-6 -left-6 w-32 h-32 bg-blue-400 dark:bg-blue-600 rounded-full blur-2xl opacity-20 animate-pulse delay-700"/>
          </div>

        </div>
      </div>
    </div>

    <!-- Features & Benefits Section -->
    <section class="py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900 transition-colors duration-300 relative overflow-hidden">
      <!-- Background Decorations -->
      <div class="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-30">
        <div class="absolute top-[10%] right-[10%] w-72 h-72 rounded-full bg-blue-200 dark:bg-blue-900 blur-3xl"/>
        <div class="absolute bottom-[10%] left-[10%] w-72 h-72 rounded-full bg-purple-200 dark:bg-purple-900 blur-3xl"/>
      </div>

      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center max-w-3xl mx-auto mb-16">
          <span class="inline-block px-4 py-1.5 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-semibold tracking-wide uppercase mb-4">
            Fitur Lengkap
          </span>
          <h2 class="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            Fitur Unggulan Sistem Kami
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-400 leading-relaxed">
            Kelola seluruh aspek produksi Anda dengan mudah dan efisien menggunakan sistem terintegrasi kami.
          </p>
        </div>

        <div 
          ref="featuresGrid"
          class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto"
        >
          <FeatureCard
            v-for="(feature, index) in features"
            :key="feature.title"
            :title="feature.title"
            :description="feature.description"
            class="transition-all duration-700 ease-out transform hover:scale-105"
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
    <section class="py-20 bg-gray-50 dark:bg-gray-800 transition-colors duration-300 relative overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="bg-white dark:bg-gray-700 rounded-3xl p-8 sm:p-12 shadow-2xl dark:shadow-gray-900/50 border border-gray-100 dark:border-gray-600">
          <div class="text-center max-w-3xl mx-auto mb-16">
            <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
              Dipercaya oleh Pelaku UMKM
            </h2>
            <p class="text-lg text-gray-600 dark:text-gray-400">
              Lihat bagaimana sistem kami membantu bisnis produksi berkembang dan meningkatkan efisiensi.
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
      </div>
    </section>

    <!-- Primary CTA Section -->
    <section class="pb-12 sm:py-24 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="bg-gradient-to-r from-blue-900 to-indigo-900 dark:from-blue-950 dark:to-indigo-950 rounded-3xl relative overflow-hidden py-20 px-6 sm:px-12 shadow-2xl">
          <!-- Background Decoration -->
          <div class="absolute top-0 left-0 w-full h-full overflow-hidden z-0 opacity-20">
            <div class="absolute -top-[50%] -right-[20%] w-[100%] h-[100%] rounded-full bg-blue-500 blur-3xl"/>
            <div class="absolute -bottom-[50%] -left-[20%] w-[100%] h-[100%] rounded-full bg-teal-500 blur-3xl"/>
          </div>

          <div 
            ref="ctaSection"
            class="relative z-10 text-center transition-all duration-1000 ease-out transform"
            :class="[
              isCtaVisible 
                ? 'opacity-100 translate-y-0' 
                : 'opacity-0 translate-y-12'
            ]"
          >
            <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
              Siap Optimalkan Produksi & Profit Bisnis Anda?
            </h2>
            <p class="text-lg sm:text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
              Bergabunglah dengan ratusan pelaku UMKM yang telah meningkatkan efisiensi produksi mereka. Mulai kelola bisnis dengan lebih cerdas.
            </p>
            <NuxtLink to="/login">
              <button class="inline-block px-10 py-5 bg-yellow-400 text-blue-900 rounded-full font-bold text-xl shadow-xl shadow-yellow-400/20 hover:bg-yellow-300 hover:shadow-yellow-400/40 transform hover:-translate-y-1 transition-all duration-300 animate-pulse">
                Mulai Gratis Sekarang
              </button>
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>
  </div>
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

  const ctaObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          isCtaVisible.value = true
          ctaObserver.unobserve(entry.target)
        }
      })
    },
    {
      threshold: 0.1,
      rootMargin: '50px',
    }
  )

  if (ctaSection.value) {
    ctaObserver.observe(ctaSection.value)
  }
})

const features = [
  {
    title: 'Kalkulator HPP Otomatis',
    description: 'Hitung Harga Pokok Produksi secara akurat dengan memperhitungkan bahan baku, tenaga kerja, dan overhead.',
    iconPath: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z'
  },
  {
    title: 'Manajemen Stok Terintegrasi',
    description: 'Kelola stok bahan baku dan kemasan dengan sistem peringatan otomatis untuk restock.',
    iconPath: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4'
  },
  {
    title: 'Analisis Kapasitas Produksi',
    description: 'Ketahui maksimal produksi berdasarkan stok yang tersedia dan optimalkan perencanaan produksi.',
    iconPath: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z'
  },
  {
    title: 'Manajemen Produk & Margin',
    description: 'Kelola katalog produk, hitung margin keuntungan, dan tentukan strategi harga yang optimal.',
    iconPath: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
  }
]

const testimonials = [
  {
    quote: "Sistem ini sangat membantu kami menghitung HPP dengan akurat. Sekarang kami bisa tentukan harga jual yang tepat dan profit meningkat 35%!",
    author: "Fuad Reza",
    handle: "@Dev1"
  },
  {
    quote: "Manajemen stok jadi lebih mudah. Tidak ada lagi bahan yang habis mendadak atau over-stock. Efisiensi produksi meningkat drastis!",
    author: "Tyas Nur T",
    handle: "@Dev2"
  }
]

const ctaSection = ref<HTMLElement | null>(null)
const isCtaVisible = ref(false)
</script>