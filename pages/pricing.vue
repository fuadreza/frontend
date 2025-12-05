<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <!-- Hero Section -->
    <section class="relative overflow-hidden bg-gradient-to-br from-indigo-600 to-purple-700 dark:from-indigo-900 dark:to-purple-900 pt-32 pb-20">
      <div class="absolute inset-0 overflow-hidden opacity-20">
        <div class="absolute -top-1/2 -right-1/4 w-96 h-96 rounded-full bg-white blur-3xl"/>
        <div class="absolute -bottom-1/2 -left-1/4 w-96 h-96 rounded-full bg-pink-300 blur-3xl"/>
      </div>
      
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div class="text-center">
          <span class="inline-block px-4 py-1.5 rounded-full bg-white/20 text-white text-sm font-semibold tracking-wide uppercase mb-4">
            Harga Terjangkau
          </span>
          <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
            Pilih Paket yang Tepat<br>untuk Bisnis Anda
          </h1>
          <p class="text-xl text-indigo-100 max-w-3xl mx-auto mb-8">
            Mulai gratis, upgrade kapan saja. Tidak ada biaya tersembunyi.
          </p>
          
          
          <!-- Billing Toggle - Modern Pill Design -->
          <div class="inline-flex items-center bg-white/10 backdrop-blur-sm rounded-full p-1.5 mb-8 border-2 border-white/20">
            <button 
              :class="[
                'px-8 py-3 rounded-full font-bold text-base transition-all duration-300',
                billingPeriod === 'monthly' 
                  ? 'bg-white text-indigo-600 shadow-lg' 
                  : 'text-white hover:text-indigo-100'
              ]"
              @click="billingPeriod = 'monthly'"
            >
              Bulanan
            </button>
            <button 
              :class="[
                'px-8 py-3 rounded-full font-bold text-base transition-all duration-300 relative',
                billingPeriod === 'yearly' 
                  ? 'bg-white text-indigo-600 shadow-lg' 
                  : 'text-white hover:text-indigo-100'
              ]"
              @click="billingPeriod = 'yearly'"
            >
              Tahunan
              <span class="absolute -top-2 -right-2 px-2.5 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-xs font-black rounded-full text-gray-900 shadow-lg animate-pulse">
                -20%
              </span>
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Cards -->
    <section class="py-20 -mt-32 relative z-10">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <!-- Starter Plan -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-500 transition-all duration-300">
            <div class="mb-8">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Starter</h3>
              <p class="text-gray-600 dark:text-gray-400">Untuk bisnis kecil yang baru memulai</p>
            </div>
            
            <div class="mb-8">
              <div class="flex items-baseline">
                <span class="text-5xl font-bold text-gray-900 dark:text-gray-100">Rp 0</span>
                <span class="text-gray-600 dark:text-gray-400 ml-2">/bulan</span>
              </div>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">Gratis selamanya</p>
            </div>

            <ul class="space-y-4 mb-8">
              <li class="flex items-start">
                <svg class="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-gray-700 dark:text-gray-300">Hingga 10 produk</span>
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-gray-700 dark:text-gray-300">Kalkulator HPP basic</span>
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-gray-700 dark:text-gray-300">Manajemen stok sederhana</span>
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-gray-700 dark:text-gray-300">1 user</span>
              </li>
              <li class="flex items-start text-gray-400 dark:text-gray-600">
                <svg class="w-5 h-5 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>AI Insights</span>
              </li>
              <li class="flex items-start text-gray-400 dark:text-gray-600">
                <svg class="w-5 h-5 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
                <span>Analisis produksi lanjutan</span>
              </li>
            </ul>

            <NuxtLink to="/login">
              <button class="w-full py-3 px-6 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                Mulai Gratis
              </button>
            </NuxtLink>
          </div>

          <!-- Professional Plan (Popular) -->
          <div class="bg-gradient-to-br from-blue-600 to-indigo-600 dark:from-blue-700 dark:to-indigo-700 rounded-2xl shadow-2xl p-8 border-2 border-blue-400 transform scale-105 relative">
            <div class="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-yellow-400 text-yellow-900 text-sm font-bold rounded-full">
              PALING POPULER
            </div>
            
            <div class="mb-8">
              <h3 class="text-2xl font-bold text-white mb-2">Professional</h3>
              <p class="text-blue-100">Untuk bisnis yang sedang berkembang</p>
            </div>
            
            <div class="mb-8">
              <div class="flex items-baseline">
                <span class="text-5xl font-bold text-white">
                  {{ billingPeriod === 'monthly' ? 'Rp 299K' : 'Rp 239K' }}
                </span>
                <span class="text-blue-100 ml-2">/bulan</span>
              </div>
              <p class="text-sm text-blue-100 mt-2">
                {{ billingPeriod === 'yearly' ? 'Rp 2.868.000/tahun (hemat Rp 720.000)' : 'Atau Rp 2.868.000/tahun' }}
              </p>
            </div>

            <ul class="space-y-4 mb-8">
              <li class="flex items-start">
                <svg class="w-5 h-5 text-yellow-300 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-white font-medium">Produk unlimited</span>
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-yellow-300 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-white font-medium">Kalkulator HPP lengkap + AI</span>
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-yellow-300 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-white font-medium">Manajemen stok terintegrasi</span>
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-yellow-300 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-white font-medium">Analisis kapasitas produksi</span>
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-yellow-300 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-white font-medium">Riwayat produksi lengkap</span>
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-yellow-300 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-white font-medium">Hingga 5 users</span>
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-yellow-300 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-white font-medium">Priority support</span>
              </li>
            </ul>

            <NuxtLink to="/login">
              <button class="w-full py-3 px-6 bg-white text-blue-600 rounded-lg font-bold hover:bg-gray-100 transition-colors shadow-lg">
                Mulai Sekarang
              </button>
            </NuxtLink>
          </div>

          <!-- Enterprise Plan -->
          <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border-2 border-gray-200 dark:border-gray-700 hover:border-purple-300 dark:hover:border-purple-500 transition-all duration-300">
            <div class="mb-8">
              <h3 class="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Enterprise</h3>
              <p class="text-gray-600 dark:text-gray-400">Untuk bisnis besar dengan kebutuhan khusus</p>
            </div>
            
            <div class="mb-8">
              <div class="flex items-baseline">
                <span class="text-5xl font-bold text-gray-900 dark:text-gray-100">Custom</span>
              </div>
              <p class="text-sm text-gray-500 dark:text-gray-400 mt-2">Hubungi kami untuk penawaran</p>
            </div>

            <ul class="space-y-4 mb-8">
              <li class="flex items-start">
                <svg class="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-gray-700 dark:text-gray-300">Semua fitur Professional</span>
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-gray-700 dark:text-gray-300">Users unlimited</span>
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-gray-700 dark:text-gray-300">Custom integrations</span>
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-gray-700 dark:text-gray-300">Dedicated account manager</span>
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-gray-700 dark:text-gray-300">On-premise deployment option</span>
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-gray-700 dark:text-gray-300">24/7 premium support</span>
              </li>
              <li class="flex items-start">
                <svg class="w-5 h-5 text-green-500 mr-3 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
                <span class="text-gray-700 dark:text-gray-300">SLA guarantee</span>
              </li>
            </ul>

            <button class="w-full py-3 px-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg font-semibold hover:from-purple-700 hover:to-indigo-700 transition-all">
              Hubungi Sales
            </button>
          </div>

        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="py-20 bg-white dark:bg-gray-800">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Pertanyaan yang Sering Diajukan
          </h2>
          <p class="text-xl text-gray-600 dark:text-gray-400">
            Punya pertanyaan? Kami punya jawabannya
          </p>
        </div>

        <div class="space-y-6">
          <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
              Apakah saya bisa upgrade atau downgrade paket kapan saja?
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              Ya, Anda dapat mengubah paket langganan kapan saja. Perubahan akan berlaku pada periode billing berikutnya.
            </p>
          </div>

          <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
              Apakah ada biaya setup atau biaya tersembunyi?
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              Tidak ada biaya setup atau biaya tersembunyi. Harga yang tertera adalah harga final yang Anda bayar.
            </p>
          </div>

          <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
              Bagaimana cara pembayarannya?
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              Kami menerima pembayaran melalui transfer bank, kartu kredit, dan e-wallet. Untuk paket tahunan, Anda mendapat diskon 20%.
            </p>
          </div>

          <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
              Apakah data saya aman?
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              Keamanan data adalah prioritas kami. Semua data dienkripsi dan disimpan di server yang aman dengan backup rutin.
            </p>
          </div>

          <div class="bg-gray-50 dark:bg-gray-700 rounded-xl p-6">
            <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100 mb-2">
              Apakah ada trial period?
            </h3>
            <p class="text-gray-600 dark:text-gray-400">
              Paket Starter gratis selamanya! Anda bisa mencoba semua fitur basic tanpa batas waktu sebelum upgrade ke Professional.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-900 dark:to-purple-900">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 class="text-3xl lg:text-4xl font-bold text-white mb-6">
          Masih Ragu? Coba Gratis Dulu!
        </h2>
        <p class="text-xl text-indigo-100 mb-8">
          Tidak perlu kartu kredit. Mulai dengan paket Starter gratis dan rasakan manfaatnya.
        </p>
        <NuxtLink to="/login">
          <button class="px-8 py-4 bg-white text-indigo-600 rounded-full font-bold text-lg shadow-xl hover:bg-gray-100 transform hover:scale-105 transition-all duration-300">
            Mulai Gratis Sekarang
          </button>
        </NuxtLink>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

definePageMeta({
  layout: 'default',
})

const billingPeriod = ref<'monthly' | 'yearly'>('monthly')
</script>
