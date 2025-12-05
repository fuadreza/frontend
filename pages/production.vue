<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Header -->
      <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-6 mb-6">
        <div class="flex items-center gap-3 mb-2">
          <svg class="w-8 h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
          </svg>
          <h1 class="text-3xl font-bold text-gray-800 dark:text-gray-100">Kalkulator HPP Professional</h1>
        </div>
        <p class="text-gray-600 dark:text-gray-400">Sesuai Standar Akuntansi Indonesia dengan AI Analysis</p>
      </div>

      <!-- Tabs -->
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow dark:shadow-gray-900/50 transition-colors duration-300 mb-8">
        <div class="border-b border-gray-200 dark:border-gray-700">
          <nav class="flex -mb-px">
            <button
              @click="activeTab = 'calculator'"
              :class="[
                'py-4 px-6 text-sm font-medium border-b-2 transition-colors',
                activeTab === 'calculator'
                  ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              ]"
            >
              📊 Kalkulator HPP
            </button>
            <button
              @click="activeTab = 'ai'"
              :class="[
                'py-4 px-6 text-sm font-medium border-b-2 transition-colors',
                activeTab === 'ai'
                  ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              ]"
            >
              ✨ AI Insights
            </button>
            <button
              @click="activeTab = 'maxProduction'"
              :class="[
                'py-4 px-6 text-sm font-medium border-b-2 transition-colors',
                activeTab === 'maxProduction'
                  ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              ]"
            >
              📈 Maksimal Produksi
            </button>
            <button
              @click="activeTab = 'history'"
              :class="[
                'py-4 px-6 text-sm font-medium border-b-2 transition-colors',
                activeTab === 'history'
                  ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              ]"
            >
              📜 Riwayat Produksi
            </button>
          </nav>
        </div>

        <!-- Kalkulator HPP Tab -->
        <div v-if="activeTab === 'calculator'" class="p-6">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Form Input -->
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Input Biaya Produksi</h3>
              
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nama Produk</label>
                  <input
                    v-model="hppForm.productName"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                    placeholder="Contoh: Kopi Arabica 250g"
                  />
                </div>

                <!-- Persediaan (Standar Indonesia) -->
                <div class="bg-amber-50 dark:bg-amber-900/20 border-2 border-amber-200 dark:border-amber-700 rounded-lg p-4">
                  <h4 class="font-semibold text-amber-800 dark:text-amber-300 mb-3 flex items-center gap-2">
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Persediaan (Standar Indonesia)
                  </h4>
                  <div class="grid grid-cols-2 gap-3">
                    <div>
                      <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                        Persediaan Awal (Rp)
                      </label>
                      <input
                        v-model.number="hppForm.inventoryStart"
                        type="number"
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="0"
                      />
                    </div>
                    <div>
                      <label class="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
                        Persediaan Akhir (Rp)
                      </label>
                      <input
                        v-model.number="hppForm.inventoryEnd"
                        type="number"
                        class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500"
                        placeholder="0"
                      />
                    </div>
                  </div>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    HPP = Persediaan Awal + Biaya Produksi - Persediaan Akhir
                  </p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bahan Baku</label>
                  <div class="space-y-2">
                    <div v-for="(item, index) in hppForm.materials" :key="index" class="flex gap-2">
                      <input
                        v-model="item.name"
                        type="text"
                        placeholder="Nama bahan"
                        class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                      />
                      <input
                        v-model.number="item.quantity"
                        type="number"
                        placeholder="Qty"
                        class="w-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                      />
                      <input
                        v-model.number="item.price"
                        type="number"
                        placeholder="Harga"
                        class="w-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                      />
                      <button
                        v-if="hppForm.materials.length > 1"
                        @click="removeMaterial(index)"
                        class="px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                  <button
                    @click="addMaterial"
                    class="mt-2 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium"
                  >
                    + Tambah Bahan
                  </button>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Biaya Tenaga Kerja</label>
                  <input
                    v-model.number="hppForm.laborCost"
                    type="number"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                    placeholder="50000"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Biaya Overhead</label>
                  <input
                    v-model.number="hppForm.overheadCost"
                    type="number"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                    placeholder="20000"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Kemasan</label>
                  <div class="flex items-center mb-2">
                    <input
                      v-model="hppForm.includePacking"
                      type="checkbox"
                      class="rounded border-gray-300 dark:border-gray-600 text-indigo-600 dark:text-indigo-400 focus:ring-indigo-500 bg-white dark:bg-gray-700"
                    />
                    <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Include biaya kemasan dalam HPP</span>
                  </div>
                  
                  <div v-if="hppForm.includePacking" class="space-y-2">
                    <div v-for="(pack, index) in hppForm.packaging" :key="index" class="flex gap-2">
                      <input
                        v-model="pack.name"
                        type="text"
                        placeholder="Nama kemasan"
                        class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                      />
                      <input
                        v-model.number="pack.quantity"
                        type="number"
                        placeholder="Qty"
                        class="w-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                      />
                      <input
                        v-model.number="pack.price"
                        type="number"
                        placeholder="Harga"
                        class="w-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                      />
                      <button
                        v-if="hppForm.packaging.length > 1"
                        @click="removePackaging(index)"
                        class="px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                  <button
                    v-if="hppForm.includePacking"
                    @click="addPackaging"
                    class="mt-2 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium"
                  >
                    + Tambah Kemasan
                  </button>
                </div>

                <div class="grid grid-cols-2 gap-4">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Jumlah Produksi (unit)</label>
                    <input
                      v-model.number="hppForm.productionQty"
                      type="number"
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                      placeholder="100"
                    />
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Target Margin (%)</label>
                    <input
                      v-model.number="hppForm.targetMargin"
                      type="number"
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                      placeholder="40"
                    />
                  </div>
                </div>
              </div>
            </div>

            <!-- Result -->
            <div>
              <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Hasil Perhitungan</h3>
              
              <div class="bg-gradient-to-br from-indigo-50 to-purple-50 dark:from-gray-800 dark:to-gray-800 rounded-lg p-6 border border-indigo-200 dark:border-gray-700 transition-colors duration-300">
                <div class="space-y-4">
                  <div class="flex justify-between items-center pb-3 border-b border-indigo-200 dark:border-indigo-800">
                    <span class="text-sm text-gray-700 dark:text-gray-300">Total Biaya Bahan</span>
                    <span class="text-lg font-semibold text-gray-900 dark:text-gray-100">{{ formatCurrency(totalMaterialCost) }}</span>
                  </div>

                  <div v-if="hppForm.includePacking" class="flex justify-between items-center pb-3 border-b border-indigo-200 dark:border-indigo-800">
                    <span class="text-sm text-gray-700 dark:text-gray-300">Total Biaya Kemasan</span>
                    <span class="text-lg font-semibold text-gray-900 dark:text-gray-100">{{ formatCurrency(totalPackagingCost) }}</span>
                  </div>

                  <div class="flex justify-between items-center pb-3 border-b border-indigo-200 dark:border-indigo-800">
                    <span class="text-sm text-gray-700 dark:text-gray-300">Biaya Tenaga Kerja</span>
                    <span class="text-lg font-semibold text-gray-900 dark:text-gray-100">{{ formatCurrency(hppForm.laborCost) }}</span>
                  </div>

                  <div class="flex justify-between items-center pb-3 border-b border-indigo-200 dark:border-indigo-800">
                    <span class="text-sm text-gray-700 dark:text-gray-300">Biaya Overhead</span>
                    <span class="text-lg font-semibold text-gray-900 dark:text-gray-100">{{ formatCurrency(hppForm.overheadCost) }}</span>
                  </div>

                  <div class="flex justify-between items-center py-3 bg-blue-100 dark:bg-blue-900/30 rounded-lg px-4">
                    <span class="text-base font-semibold text-gray-900 dark:text-gray-100">Total Biaya Produksi</span>
                    <span class="text-xl font-bold text-blue-600 dark:text-blue-400">{{ formatCurrency(totalProductionCost) }}</span>
                  </div>

                  <div class="flex justify-between items-center py-3 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg px-4">
                    <span class="text-base font-semibold text-gray-900 dark:text-gray-100">Total HPP</span>
                    <span class="text-2xl font-bold text-indigo-600 dark:text-indigo-400">{{ formatCurrency(totalHPP) }}</span>
                  </div>

                  <div class="flex justify-between items-center py-3 bg-purple-100 dark:bg-purple-900/30 rounded-lg px-4">
                    <span class="text-base font-semibold text-gray-900 dark:text-gray-100">HPP per Unit</span>
                    <span class="text-2xl font-bold text-purple-600 dark:text-purple-400">{{ formatCurrency(hppPerUnit) }}</span>
                  </div>

                  <div class="pt-4">
                    <p class="text-xs text-gray-600 dark:text-gray-400 mb-2">Saran Harga Jual (Margin {{ hppForm.targetMargin }}%)</p>
                    <div class="bg-green-100 dark:bg-green-900/30 rounded-lg px-4 py-3 border border-green-200 dark:border-green-800">
                      <span class="text-xl font-bold text-green-700 dark:text-green-400">{{ formatCurrency(suggestedPrice) }}</span>
                    </div>
                  </div>
                </div>

                <button
                  @click="getAIAnalysis"
                  :disabled="loading"
                  class="mt-6 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-md hover:from-indigo-700 hover:to-purple-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                >
                  <template v-if="loading">
                    <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    Menganalisis dengan AI...
                  </template>
                  <template v-else>
                    <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                    </svg>
                    Analisis dengan AI
                  </template>
                </button>

                <button
                  @click="saveProduction"
                  class="mt-3 w-full bg-gray-800 dark:bg-gray-700 text-white py-3 px-4 rounded-md hover:bg-gray-900 dark:hover:bg-gray-600 font-medium"
                >
                  💾 Simpan Produksi
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- AI Insights Tab -->
        <div v-if="activeTab === 'ai'" class="p-6">
          <div v-if="!aiInsights" class="text-center py-12">
            <svg class="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
            </svg>
            <h3 class="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Belum Ada Analisis AI
            </h3>
            <p class="text-gray-500 dark:text-gray-400 mb-6">
              Isi data di tab Kalkulator HPP, lalu klik tombol "Analisis dengan AI"
            </p>
            <button
              @click="activeTab = 'calculator'"
              class="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Ke Kalkulator
            </button>
          </div>

          <div v-else class="space-y-6">
            <!-- Efficiency Score -->
            <div class="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl p-6 border-2 border-green-200 dark:border-green-800">
              <div class="flex items-center justify-between mb-4">
                <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100">Skor Efisiensi</h3>
                <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                </svg>
              </div>
              <div class="flex items-end gap-4">
                <div class="text-5xl font-bold text-green-600 dark:text-green-400">
                  {{ aiInsights.efficiency_score }}
                </div>
                <div class="text-gray-600 dark:text-gray-400 pb-2">/100</div>
              </div>
              <div class="mt-4 bg-gray-200 dark:bg-gray-700 rounded-full h-3">
                <div
                  class="bg-gradient-to-r from-green-500 to-emerald-500 h-3 rounded-full transition-all duration-500"
                  :style="{ width: `${aiInsights.efficiency_score}%` }"
                ></div>
              </div>
            </div>

            <!-- Cost Breakdown Analysis -->
            <div class="bg-white dark:bg-gray-800 rounded-xl p-6 border-2 border-gray-200 dark:border-gray-700">
              <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3 flex items-center gap-2">
                <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Analisis Struktur Biaya
              </h3>
              <p class="text-gray-700 dark:text-gray-300">{{ aiInsights.cost_breakdown_analysis }}</p>
            </div>

            <!-- Pricing Recommendation -->
            <div class="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 rounded-xl p-6 border-2 border-blue-200 dark:border-blue-800">
              <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
                💰 Rekomendasi Harga
              </h3>
              <p class="text-gray-700 dark:text-gray-300">{{ aiInsights.pricing_recommendation }}</p>
            </div>

            <!-- Optimization Tips -->
            <div class="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-900/20 dark:to-pink-900/20 rounded-xl p-6 border-2 border-purple-200 dark:border-purple-800">
              <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">
                ⚡ Tips Optimasi
              </h3>
              <ul class="space-y-3">
                <li v-for="(tip, index) in aiInsights.optimization_tips" :key="index" class="flex items-start gap-3">
                  <div class="w-6 h-6 bg-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0">
                    {{ index + 1 }}
                  </div>
                  <span class="text-gray-700 dark:text-gray-300">{{ tip }}</span>
                </li>
              </ul>
            </div>

            <!-- Risk Factors -->
            <div class="bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 rounded-xl p-6 border-2 border-amber-200 dark:border-amber-800">
              <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4 flex items-center gap-2">
                <svg class="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Faktor Risiko
              </h3>
              <ul class="space-y-2">
                <li v-for="(risk, index) in aiInsights.risk_factors" :key="index" class="flex items-start gap-2">
                  <span class="text-amber-600">⚠️</span>
                  <span class="text-gray-700 dark:text-gray-300">{{ risk }}</span>
                </li>
              </ul>
            </div>

            <!-- Competitive Position -->
            <div class="bg-gradient-to-br from-cyan-50 to-blue-50 dark:from-cyan-900/20 dark:to-blue-900/20 rounded-xl p-6 border-2 border-cyan-200 dark:border-cyan-800">
              <h3 class="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">
                🎯 Posisi Kompetitif
              </h3>
              <p class="text-gray-700 dark:text-gray-300">{{ aiInsights.competitive_position }}</p>
            </div>
          </div>
        </div>

        <!-- Max Production Tab -->
        <div v-if="activeTab === 'maxProduction'" class="p-6">
          <div class="mb-6">
            <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Pilih Produk</h3>
            <select
              v-model="selectedProductForMax"
              class="w-full max-w-md px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
            >
              <option :value="null">Pilih produk...</option>
              <option v-for="prod in sampleProducts" :key="prod.id" :value="prod">
                {{ prod.name }}
              </option>
            </select>
          </div>

          <div v-if="selectedProductForMax" class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h4 class="font-semibold text-gray-900 dark:text-gray-100 mb-4">Resep & Kebutuhan Bahan</h4>
              <div class="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-3">
                <div v-for="material in selectedProductForMax.recipe" :key="material.name">
                  <div class="flex justify-between items-center mb-2">
                    <span class="text-sm font-medium text-gray-700 dark:text-gray-300">{{ material.name }}</span>
                    <span class="text-sm text-gray-600 dark:text-gray-400">{{ material.needed }} {{ material.unit }} per unit</span>
                  </div>
                  <div class="flex justify-between items-center text-xs">
                    <span class="text-gray-500 dark:text-gray-400">Stok tersedia: {{ material.available }} {{ material.unit }}</span>
                    <span class="font-semibold" :class="maxProductionFromMaterial(material) > 0 ? 'text-green-600' : 'text-red-600'">
                      Max: {{ maxProductionFromMaterial(material) }} unit
                    </span>
                  </div>
                  <div class="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                    <div
                      class="h-2 rounded-full bg-indigo-600"
                      :style="{ width: `${Math.min((material.available / (material.needed * 100)) * 100, 100)}%` }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 class="font-semibold text-gray-900 dark:text-gray-100 mb-4">Hasil Analisis</h4>
              <div class="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 rounded-lg p-6 border border-green-200 dark:border-green-800">
                <div class="text-center mb-6">
                  <p class="text-sm text-gray-600 dark:text-gray-400 mb-2">Maksimal Produksi</p>
                  <p class="text-5xl font-bold text-green-600 dark:text-green-400">{{ maxProduction }}</p>
                  <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">unit produk</p>
                </div>

                <div class="space-y-3 pt-4 border-t border-green-200 dark:border-green-800">
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Bahan Pembatas</span>
                    <span class="text-sm font-semibold text-gray-900 dark:text-gray-100">{{ limitingMaterial }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Total HPP</span>
                    <span class="text-sm font-semibold text-gray-900 dark:text-gray-100">
                      {{ formatCurrency(maxProduction * selectedProductForMax.hpp) }}
                    </span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600 dark:text-gray-400">Estimasi Revenue</span>
                    <span class="text-sm font-semibold text-green-600 dark:text-green-400">
                      {{ formatCurrency(maxProduction * selectedProductForMax.sellingPrice) }}
                    </span>
                  </div>
                  <div class="flex justify-between pt-3 border-t border-green-300 dark:border-green-800">
                    <span class="text-sm font-semibold text-gray-900 dark:text-gray-100">Estimasi Profit</span>
                    <span class="text-lg font-bold text-green-700 dark:text-green-400">
                      {{ formatCurrency(maxProduction * (selectedProductForMax.sellingPrice - selectedProductForMax.hpp)) }}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- History Tab -->
        <div v-if="activeTab === 'history'" class="p-6">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Riwayat Produksi</h3>
          
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead class="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Tanggal</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Produk</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Jumlah</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">HPP/Unit</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Total HPP</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Include Packing</th>
                </tr>
              </thead>
              <tbody class="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-700">
                <tr v-for="history in productionStore.productions" :key="history.id" class="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ history.date }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{{ history.productName }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ history.quantity }} unit</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ formatCurrency(history.hppPerUnit) }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-gray-100">{{ formatCurrency(history.totalHPP) }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <span :class="history.includePacking ? 'text-green-600' : 'text-gray-400'">
                      {{ history.includePacking ? '✓ Ya' : '✗ Tidak' }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Info Footer -->
      <div class="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 mt-6">
        <h3 class="font-semibold text-gray-800 dark:text-gray-100 mb-3">
          📚 Formula HPP Sesuai Standar Akuntansi Indonesia
        </h3>
        <div class="space-y-2 text-sm text-gray-700 dark:text-gray-300">
          <p><strong>HPP = Persediaan Awal + Biaya Produksi - Persediaan Akhir</strong></p>
          <p><strong>Biaya Produksi = Bahan Baku + Tenaga Kerja + Overhead + Kemasan</strong></p>
          <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">
            Kalkulator ini menggunakan metode perhitungan HPP yang sesuai dengan Standar Akuntansi Keuangan (SAK) Indonesia
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useProductionStore } from '~/stores/productionStore'
import OpenAI from 'openai'

interface Material {
  name: string
  quantity: number
  price: number
}

interface Packaging {
  name: string
  quantity: number
  price: number
}

interface Recipe {
  name: string
  needed: number
  unit: string
  available: number
}

interface SampleProduct {
  id: number
  name: string
  hpp: number
  sellingPrice: number
  recipe: Recipe[]
}

definePageMeta({
  layout: 'dashboard',
})

const activeTab = ref('calculator')
const loading = ref(false)
const aiInsights = ref(null)

// HPP Calculator Form
const hppForm = ref({
  productName: '',
  materials: [
    { name: '', quantity: 0, price: 0 }
  ] as Material[],
  laborCost: 0,
  overheadCost: 0,
  includePacking: false,
  packaging: [
    { name: '', quantity: 0, price: 0 }
  ] as Packaging[],
  productionQty: 1,
  inventoryStart: 0,
  inventoryEnd: 0,
  targetMargin: 40
})

// Sample products for max production
const sampleProducts = ref<SampleProduct[]>([
  {
    id: 1,
    name: 'Kopi Arabica Premium 250g',
    hpp: 25000,
    sellingPrice: 45000,
    recipe: [
      { name: 'Kopi Arabica', needed: 0.25, unit: 'kg', available: 150 },
      { name: 'Gula Aren', needed: 0.05, unit: 'kg', available: 50 },
      { name: 'Botol 250ml', needed: 1, unit: 'pcs', available: 500 }
    ]
  },
  {
    id: 2,
    name: 'Teh Hijau Organik 100g',
    hpp: 18000,
    sellingPrice: 32000,
    recipe: [
      { name: 'Teh Hijau', needed: 0.1, unit: 'kg', available: 75 },
      { name: 'Pouch 100g', needed: 1, unit: 'pcs', available: 1000 }
    ]
  }
])

const selectedProductForMax = ref<SampleProduct | null>(null)

const productionStore = useProductionStore()

onMounted(() => {
  productionStore.fetchProductions()
})

// Computed - Sesuai Standar Indonesia
const totalMaterialCost = computed(() => {
  return hppForm.value.materials.reduce((sum, item) => sum + (item.quantity * item.price), 0)
})

const totalPackagingCost = computed(() => {
  if (!hppForm.value.includePacking) return 0
  return hppForm.value.packaging.reduce((sum, item) => sum + (item.quantity * item.price), 0)
})

// Biaya Produksi = Bahan Baku + Tenaga Kerja + Overhead + Kemasan
const totalProductionCost = computed(() => {
  return totalMaterialCost.value + totalPackagingCost.value + hppForm.value.laborCost + hppForm.value.overheadCost
})

// HPP = Persediaan Awal + Biaya Produksi - Persediaan Akhir (Standar Indonesia)
const totalHPP = computed(() => {
  return hppForm.value.inventoryStart + totalProductionCost.value - hppForm.value.inventoryEnd
})

const hppPerUnit = computed(() => {
  if (hppForm.value.productionQty === 0) return 0
  return totalHPP.value / hppForm.value.productionQty
})

const suggestedPrice = computed(() => {
  return hppPerUnit.value / (1 - hppForm.value.targetMargin / 100)
})

const maxProduction = computed(() => {
  if (!selectedProductForMax.value) return 0
  
  const maxValues = selectedProductForMax.value.recipe.map(material => 
    Math.floor(material.available / material.needed)
  )
  
  return Math.min(...maxValues)
})

const limitingMaterial = computed(() => {
  if (!selectedProductForMax.value) return '-'
  
  const materials = selectedProductForMax.value.recipe
  let minValue = Infinity
  let limitingName = ''
  
  materials.forEach(material => {
    const maxUnits = Math.floor(material.available / material.needed)
    if (maxUnits < minValue) {
      minValue = maxUnits
      limitingName = material.name
    }
  })
  
  return limitingName
})

// Methods
const addMaterial = () => {
  hppForm.value.materials.push({ name: '', quantity: 0, price: 0 })
}

const removeMaterial = (index: number) => {
  if (hppForm.value.materials.length > 1) {
    hppForm.value.materials.splice(index, 1)
  }
}

const addPackaging = () => {
  hppForm.value.packaging.push({ name: '', quantity: 0, price: 0 })
}

const removePackaging = (index: number) => {
  if (hppForm.value.packaging.length > 1) {
    hppForm.value.packaging.splice(index, 1)
  }
}

const maxProductionFromMaterial = (material: Recipe) => {
  return Math.floor(material.available / material.needed)
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(value)
}

// AI Analysis Function
const getAIAnalysis = async () => {
  loading.value = true
  
  // Inisialisasi Client
  const client = new OpenAI({
    apiKey: process.env.KOLOSAL_API_KEY,
    baseURL: 'https://api.kolosal.ai/v1',
    dangerouslyAllowBrowser: true
  })
  try {
    const prompt = `Anda adalah konsultan keuangan dan akuntansi biaya. Analisis data HPP berikut dan berikan rekomendasi dalam format JSON:
Data Produk:
- Nama: ${hppForm.value.productName || 'Produk'}
- HPP per Unit: Rp ${hppPerUnit.value.toFixed(0)}
- Biaya Bahan Baku: Rp ${totalMaterialCost.value.toFixed(0)}
- Biaya Produksi Total: Rp ${totalProductionCost.value.toFixed(0)}
- Biaya Tenaga Kerja: Rp ${hppForm.value.laborCost}
- Biaya Overhead: Rp ${hppForm.value.overheadCost}
- Target Margin: ${hppForm.value.targetMargin}%
- Harga Jual Saran: Rp ${suggestedPrice.value.toFixed(0)}
- Jumlah Produksi: ${hppForm.value.productionQty} unit
Berikan analisis dalam format JSON berikut (HANYA JSON, tanpa penjelasan lain):
{
  "efficiency_score": (skor 1-100, number),
  "cost_breakdown_analysis": "analisis singkat struktur biaya (string)",
  "pricing_recommendation": "rekomendasi harga jual yang optimal (string)",
  "optimization_tips": ["tip1", "tip2", "tip3"],
  "risk_factors": ["risiko1", "risiko2"],
  "competitive_position": "analisis posisi kompetitif (string)"
}`
    // Request ke API Kolosal
    const completion = await client.chat.completions.create({
      model: 'GLM 4.6',
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    })
    // Ambil response dengan aman
    const aiResponse = completion.choices[0]?.message?.content
    if (!aiResponse) {
        throw new Error("Respons AI kosong atau gagal.")
    }
    console.log("Raw Response:", aiResponse)
    // Bersihkan Markdown block jika ada
    const cleanJson = aiResponse.replace(/```json|```/g, '').trim()
    // Regex untuk mengambil JSON object saja
    const jsonMatch = cleanJson.match(/\{[\s\S]*\}/)
    if (jsonMatch) {
      aiInsights.value = JSON.parse(jsonMatch[0])
      activeTab.value = 'ai'
    } else {
      throw new Error("Format JSON tidak ditemukan dalam respons.")
    }
  } catch (error) {
    console.error('Error getting AI analysis:', error)
    
    // Fallback data
    aiInsights.value = {
      efficiency_score: 75,
      cost_breakdown_analysis: "Struktur biaya Anda cukup baik dengan proporsi bahan baku yang dominan (Data Fallback).",
      pricing_recommendation: `Dengan HPP ${formatCurrency(hppPerUnit.value)}, harga jual optimal adalah ${formatCurrency(suggestedPrice.value)}`,
      optimization_tips: [
        "Pertimbangkan negosiasi harga bahan baku untuk volume besar",
        "Optimalkan efisiensi tenaga kerja dengan training",
        "Monitor biaya overhead secara berkala"
      ],
      risk_factors: [
        "Fluktuasi harga bahan baku",
        "Margin keuntungan perlu disesuaikan dengan kondisi pasar"
      ],
      competitive_position: "Produk Anda memiliki struktur biaya yang kompetitif di pasar."
    }
    
    activeTab.value = 'ai'
  } finally {
    loading.value = false
  }
}

const saveProduction = async () => {
  await productionStore.addProduction({
    productName: hppForm.value.productName,
    date: new Date().toLocaleDateString('id-ID'),
    quantity: hppForm.value.productionQty,
    hppPerUnit: hppPerUnit.value,
    totalHPP: totalHPP.value,
    includePacking: hppForm.value.includePacking
  })
  
  alert('Produksi berhasil disimpan!')
  
  // Reset form
  hppForm.value = {
    productName: '',
    materials: [{ name: '', quantity: 0, price: 0 }],
    laborCost: 0,
    overheadCost: 0,
    includePacking: false,
    packaging: [{ name: '', quantity: 0, price: 0 }],
    productionQty: 1,
    inventoryStart: 0,
    inventoryEnd: 0,
    targetMargin: 40
  }
}
</script>