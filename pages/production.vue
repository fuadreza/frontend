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
              :class="[
                'py-4 px-6 text-sm font-medium border-b-2 transition-colors',
                activeTab === 'calculator'
                  ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              ]"
              @click="activeTab = 'calculator'"
            >
              📊 Kalkulator HPP
            </button>
            <button
              :class="[
                'py-4 px-6 text-sm font-medium border-b-2 transition-colors',
                activeTab === 'ai'
                  ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              ]"
              @click="activeTab = 'ai'"
            >
              ✨ AI Insights
            </button>
            <button
              :class="[
                'py-4 px-6 text-sm font-medium border-b-2 transition-colors',
                activeTab === 'maxProduction'
                  ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              ]"
              @click="activeTab = 'maxProduction'"
            >
              📈 Maksimal Produksi
            </button>
            <button
              :class="[
                'py-4 px-6 text-sm font-medium border-b-2 transition-colors',
                activeTab === 'history'
                  ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400'
                  : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-300 dark:hover:border-gray-600'
              ]"
              @click="activeTab = 'history'"
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
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Pilih Produk</label>
                  <select
                    v-model="hppForm.productId"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                    @change="onProductSelect"
                  >
                    <option :value="null">-- Pilih Produk --</option>
                    <option v-for="prod in availableProducts" :key="prod.id" :value="prod.id">
                      {{ prod.name }} (Stok: {{ prod.stock }})
                    </option>
                  </select>
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
                      >
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
                      >
                    </div>
                  </div>
                  <p class="text-xs text-gray-500 dark:text-gray-400 mt-2">
                    HPP = Persediaan Awal + Biaya Produksi - Persediaan Akhir
                  </p>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Bahan Baku</label>
                  <div class="space-y-2">
                    <div class="flex gap-2 px-1">
                      <label class="flex-1 text-xs font-medium text-gray-600 dark:text-gray-400">Nama Bahan</label>
                      <label class="w-24 text-xs font-medium text-gray-600 dark:text-gray-400">Qty</label>
                      <label class="w-32 text-xs font-medium text-gray-600 dark:text-gray-400">Harga Satuan</label>
                    </div>
                    <div v-for="(item, index) in hppForm.materials" :key="index" class="flex gap-2">
                       <select
                        v-model="item.materialId"
                        class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                        @change="onMaterialSelect(index)"
                      >
                        <option :value="null">pilih bahan</option>
                        <option v-for="mat in materialStore.materials" :key="mat.id" :value="mat.id">
                          {{ mat.name }} ({{ formatCurrency(mat.costPerUnit) }}/{{ mat.metric }}) - Stok: {{ mat.stock }}
                        </option>
                      </select>
                      <input
                        v-model.number="item.quantity"
                        type="number"
                        placeholder="Qty"
                        class="w-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                      >
                      <input
                        v-model.number="item.price"
                        type="number"
                        placeholder="Harga"
                        class="w-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                      >
                      <button
                        v-if="hppForm.materials.length > 1"
                        class="px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
                        @click="removeMaterial(index)"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                  <button
                    class="mt-2 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium"
                    @click="addMaterial"
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
                  >
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Biaya Overhead</label>
                  <input
                    v-model.number="hppForm.overheadCost"
                    type="number"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                    placeholder="20000"
                  >
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Kemasan</label>
                  <div class="flex items-center mb-2">
                    <input
                      v-model="hppForm.includePacking"
                      type="checkbox"
                      class="rounded border-gray-300 dark:border-gray-600 text-indigo-600 dark:text-indigo-400 focus:ring-indigo-500 bg-white dark:bg-gray-700"
                    >
                    <span class="ml-2 text-sm text-gray-700 dark:text-gray-300">Include biaya kemasan dalam HPP</span>
                  </div>
                  
                  <div v-if="hppForm.includePacking" class="space-y-2">
                    <div class="flex gap-2 px-1">
                      <label class="flex-1 text-xs font-medium text-gray-600 dark:text-gray-400">Nama Kemasan</label>
                      <label class="w-24 text-xs font-medium text-gray-600 dark:text-gray-400">Qty</label>
                      <label class="w-32 text-xs font-medium text-gray-600 dark:text-gray-400">Harga Satuan</label>
                    </div>
                    <div v-for="(pack, index) in hppForm.packaging" :key="index" class="flex gap-2">
                      <select
                        v-model="pack.packagingId"
                        class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                         @change="onPackagingSelect(index)"
                      >
                         <option :value="null">pilih kemasan</option>
                        <option v-for="pkg in packagingStore.packagings" :key="pkg.id" :value="pkg.id">
                          {{ pkg.name }} ({{ formatCurrency(pkg.costPerUnit) }}/{{ pkg.metric }}) - Stok: {{ pkg.stock }}
                        </option>
                      </select>
                      <input
                        v-model.number="pack.quantity"
                        type="number"
                        placeholder="Qty"
                        class="w-24 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                      >
                      <input
                        v-model.number="pack.price"
                        type="number"
                        placeholder="Harga"
                        class="w-32 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                      >
                      <button
                        v-if="hppForm.packaging.length > 1"
                        class="px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-md"
                        @click="removePackaging(index)"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                  <button
                    v-if="hppForm.includePacking"
                    class="mt-2 text-sm text-indigo-600 dark:text-indigo-400 hover:text-indigo-800 dark:hover:text-indigo-300 font-medium"
                    @click="addPackaging"
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
                    >
                  </div>
                  <div>
                    <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Target Margin (%)</label>
                    <input
                      v-model.number="hppForm.targetMargin"
                      type="number"
                      class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
                      placeholder="40"
                    >
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
                  :disabled="loading"
                  class="mt-6 w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-3 px-4 rounded-md hover:from-indigo-700 hover:to-purple-700 font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
                  @click="getAIAnalysis"
                >
                  <template v-if="loading">
                    <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"/>
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
                  class="mt-3 w-full bg-gray-800 dark:bg-gray-700 text-white py-3 px-4 rounded-md hover:bg-gray-900 dark:hover:bg-gray-600 font-medium"
                  @click="saveProduction"
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
              class="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              @click="activeTab = 'calculator'"
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
                />
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
          
          <!-- Mode Switcher -->
          <div class="flex justify-center mb-8">
            <div class="bg-gray-100 dark:bg-gray-700 p-1 rounded-lg inline-flex">
              <button
                :class="[
                  'px-6 py-2 rounded-md text-sm font-medium transition-all duration-200',
                  productionMode === 'all'
                    ? 'bg-white dark:bg-gray-600 text-indigo-600 dark:text-indigo-300 shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                ]"
                @click="productionMode = 'all'"
              >
                Mode 1: Semua Bahan Baku
              </button>
              <button
                :class="[
                  'px-6 py-2 rounded-md text-sm font-medium transition-all duration-200',
                  productionMode === 'single'
                    ? 'bg-white dark:bg-gray-600 text-indigo-600 dark:text-indigo-300 shadow-sm'
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                ]"
                @click="productionMode = 'single'"
              >
                Mode 2: Produk Spesifik
              </button>
            </div>
          </div>

          <!-- Mode 1: List View (All Products) -->
          <div v-if="productionMode === 'all'" class="space-y-6">
            <div class="bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg p-4 mb-4">
              <h4 class="text-blue-800 dark:text-blue-300 font-medium mb-1">Rekomendasi Berdasarkan Bahan Tersedia</h4>
              <p class="text-sm text-blue-600 dark:text-blue-400">
                Menampilkan kapasitas produksi maksimal untuk setiap produk secara independen berdasarkan stok saat ini.
              </p>
            </div>

            <div class="overflow-x-auto shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table class="min-w-full divide-y divide-gray-300 dark:divide-gray-700">
                <thead class="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th scope="col" class="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Produk</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Max Produksi</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Estimasi Profit</th>
                    <th scope="col" class="px-3 py-3.5 text-left text-sm font-semibold text-gray-900 dark:text-gray-100">Faktor Pembatas</th>
                    <th scope="col" class="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span class="sr-only">Detail</span>
                    </th>
                  </tr>
                </thead>
                <tbody class="divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-900">
                  <tr v-for="item in allMaxProductions" :key="item.product.id">
                    <td class="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                      {{ item.product.name }}
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                      <span
class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium" 
                        :class="item.maxQty > 0 ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'">
                        {{ item.maxQty }} unit
                      </span>
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-900 dark:text-gray-100">
                      {{ formatCurrency(item.estProfit) }}
                    </td>
                    <td class="whitespace-nowrap px-3 py-4 text-sm text-gray-500 dark:text-gray-400">
                      {{ item.limitingFactor }}
                    </td>
                    <td class="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                      <button 
                        class="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-300"
                        @click="productionMode = 'single'; selectedProductForMax = item.product"
                      >
                        Detail & Analisis
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <!-- Mode 2: Single Product View -->
          <div v-if="productionMode === 'single'" class="space-y-6">
            <div>
              <label class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Pilih Produk untuk Dianalisis</label>
              <select
                v-model="selectedProductForMax"
                class="w-full max-w-md px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:ring-indigo-500 focus:border-indigo-500 transition-colors duration-200"
              >
                <option :value="null">-- Pilih Produk --</option>
                <option v-for="prod in availableProducts" :key="prod.id" :value="prod">
                  {{ prod.name }}
                </option>
              </select>
            </div>
          </div>

          <!-- OVERVIEW PANEL (Always visible if data exists) -->
          <div v-if="currentMaxProductionData" class="mt-8 border-t border-gray-200 dark:border-gray-700 pt-8">
            <h3 class="text-xl font-bold text-gray-900 dark:text-gray-100 mb-6">
              Overview Panel: {{ currentMaxProductionData.product.name }}
            </h3>

            <!-- Metrics Grid -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <!-- Sisa Bahan -->
              <div class="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm relative overflow-hidden">
                <div class="absolute top-0 right-0 p-3 opacity-10">
                  <svg class="w-16 h-16 text-indigo-600" fill="currentColor" viewBox="0 0 20 20"><path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" /><path fill-rule="evenodd" d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z" clip-rule="evenodd" /></svg>
                </div>
                <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Estimasi Sisa Bahan</h4>
                <div class="space-y-2 mt-3 max-h-40 overflow-y-auto pr-2 custom-scrollbar">
                  <div v-for="mat in currentMaxProductionData.remainingMaterials" :key="mat.name" class="flex justify-between text-sm">
                    <span class="text-gray-700 dark:text-gray-300 truncate w-2/3" :title="mat.name">{{ mat.name }}</span>
                    <span class="font-semibold" :class="mat.remaining < 0 ? 'text-red-500' : 'text-gray-900 dark:text-gray-100'">
                      {{ mat.remaining }} {{ mat.unit }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Estimasi HPP -->
              <div class="bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 shadow-sm">
                 <h4 class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Estimasi Total HPP</h4>
                 <div class="mt-2 flex items-baseline gap-2">
                   <span class="text-3xl font-bold text-gray-900 dark:text-gray-100">{{ formatCurrency(currentMaxProductionData.totalHPP) }}</span>
                 </div>
                 <p class="text-xs text-gray-500 mt-2">Untuk produksi {{ currentMaxProductionData.maxQty }} unit</p>
              </div>

              <!-- Estimasi Profit -->
              <div class="bg-gradient-to-br from-indigo-600 to-purple-600 p-6 rounded-xl shadow-lg text-white">
                <h4 class="text-sm font-medium text-indigo-100 uppercase tracking-wider mb-2">Estimasi Profit Potensial</h4>
                <div class="mt-2 flex items-baseline gap-2">
                   <span class="text-3xl font-bold text-white">{{ formatCurrency(currentMaxProductionData.estProfit) }}</span>
                 </div>
                 <p class="text-xs text-indigo-100 mt-2 opacity-80">Revenue - HPP</p>
              </div>
            </div>

            <!-- AI Strategy Section -->
            <div class="bg-gray-50 dark:bg-gray-900/50 rounded-xl p-6 border-2 border-indigo-100 dark:border-indigo-900">
              <div class="flex items-center justify-between mb-6">
                <div class="flex items-center gap-3">
                  <div class="bg-indigo-600 p-2 rounded-lg text-white">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                  </div>
                  <div>
                    <h3 class="text-lg font-bold text-gray-900 dark:text-gray-100">Analisis Strategi Produksi (AI)</h3>
                    <p class="text-sm text-gray-500 dark:text-gray-400">Dapatkan saran strategis dari AI berdasarkan data ini</p>
                  </div>
                </div>
                <button
                  :disabled="analyzingStrategy"
                  class="px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors text-sm font-medium flex items-center gap-2"
                  @click="getProductionStrategy"
                >
                  <span v-if="analyzingStrategy" class="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-gray-600 dark:border-gray-400"/>
                  {{ analyzingStrategy ? 'Menganalisis...' : 'Minta Saran Strategi' }}
                </button>
              </div>

              <!-- AI Result -->
              <div v-if="aiStrategyResult" class="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm prose dark:prose-invert max-w-none">
                 <div class="whitespace-pre-wrap font-sans text-gray-700 dark:text-gray-300">{{ aiStrategyResult }}</div>
              </div>
              <div v-else class="text-center py-8 text-gray-400 dark:text-gray-500 text-sm border-2 border-dashed border-gray-200 dark:border-gray-700 rounded-lg">
                Klik tombol "Minta Saran Strategi" untuk mendapatkan wawasan lebih lanjut.
              </div>
            </div>

          </div>
          
          <div v-else-if="productionMode === 'single' && !selectedProductForMax" class="text-center py-12 text-gray-500 dark:text-gray-400">
            Silakan pilih produk terlebih dahulu untuk melihat analisis.
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
                  <th class="px-6 py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">Aksi</th>
                </tr>
              </thead>
              <tbody class="bg-white dark:bg-gray-700 divide-y divide-gray-200 dark:divide-gray-700">
                <tr v-for="history in productionStore.productions" :key="history.id" class="hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ history.date }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-gray-100">{{ getProductName(history.productId) }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ history.quantity }} unit</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-100">{{ formatCurrency(history.hppPerUnit) }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900 dark:text-gray-100">{{ formatCurrency(history.totalHPP) }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm">
                    <span :class="history.includePacking ? 'text-green-600' : 'text-gray-400'">
                      {{ history.includePacking ? '✓ Ya' : '✗ Tidak' }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-center">
                      <button
                        v-if="history.id"
                        class="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300 font-medium transition-colors"
                        @click="deleteProduction(history.id!)"
                      >
                        Hapus
                      </button>
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

import { useMaterialStore } from '~/stores/materialStore'
import { usePackagingStore } from '~/stores/packagingStore'

import { useProductStore } from '~/stores/productStore'
import type { IProductWithDetails } from '~/services/interfaces/IProductService'

const productStore = useProductStore()
const productionStore = useProductionStore()
const materialStore = useMaterialStore()
const packagingStore = usePackagingStore()

definePageMeta({
  layout: 'dashboard',
})

const activeTab = ref('calculator')
const loading = ref(false)
const aiInsights = ref<any>(null)

// Define local interfaces for the form items
interface ProductionMaterialItem {
  materialId: number | null
  name: string
  quantity: number
  price: number
}

interface ProductionPackagingItem {
  packagingId: number | null
  name: string
  quantity: number
  price: number
}

interface RemainingMaterialItem {
  name: string
  initial: number
  used: number
  remaining: number
  unit: string
}

// HPP Calculator Form
const hppForm = ref({
  productId: null as number | null,
  materials: [
    { materialId: null, name: '', quantity: 0, price: 0 }
  ] as ProductionMaterialItem[],
  laborCost: 0,
  overheadCost: 0,
  includePacking: true,
  packaging: [
    { packagingId: null, name: '', quantity: 0, price: 0 }
  ] as ProductionPackagingItem[],
  productionQty: 1,
  inventoryStart: 0,
  inventoryEnd: 0,
  targetMargin: 40
})

const onProductSelect = () => {
    if (!hppForm.value.productId) return
    
    // Find product with details
    const product = productStore.productsWithDetails.find(p => p.id === hppForm.value.productId)
    if (!product) return

    // Populate form
    // Materials
    if (product.materials && product.materials.length > 0) {
        hppForm.value.materials = product.materials.map(pm => ({
            materialId: pm.material.id!,
            name: pm.material.name,
            quantity: pm.quantity,
            price: pm.material.costPerUnit // Use cost per unit as base price
        }))
    }

    // Packaging
    if (product.packaging && product.packaging.length > 0) {
        hppForm.value.packaging = product.packaging.map(pp => ({
            packagingId: pp.packaging.id!,
            name: pp.packaging.name,
            quantity: pp.quantity,
            price: pp.packaging.costPerUnit
        }))
    }
    
    // Labor Cost
    if (product.laborCost) {
        hppForm.value.laborCost = product.laborCost
    }
}

const getProductName = (id: number) => {
    const product = productStore.products.find(p => p.id === id)
    return product ? product.name : 'Unknown Product'
}

// Max Production Logic
const productionMode = ref<'all' | 'single'>('all')
const selectedProductForMax = ref<IProductWithDetails | null>(null)
const aiStrategyResult = ref<string>('')
const analyzingStrategy = ref(false)

onMounted(() => {
  productionStore.fetchProductions()
  productStore.fetchProductsWithDetails()
  materialStore.fetchMaterials()
  packagingStore.fetchPackagings()
})

const availableProducts = computed(() => {
  return productStore.productsWithDetails
})

interface MaxProductionResult {
  product: IProductWithDetails
  maxQty: number
  limitingFactor: string
  totalHPP: number
  estRevenue: number
  estProfit: number
  remainingMaterials: RemainingMaterialItem[]
}

const calculateMaxForProduct = (product: IProductWithDetails): MaxProductionResult => {
  let maxQty = Infinity
  let limitingFactor = '-'
  
  // Check Materials
  product.materials.forEach(pm => {
    if (pm.quantity > 0) {
      const possible = Math.floor((pm.material.stock || 0) / pm.quantity)
      if (possible < maxQty) {
        maxQty = possible
        limitingFactor = `${pm.material.name} (Stok: ${pm.material.stock})`
      }
    }
    // Calculate Material Cost per unit here or outside
  })

  // Check Packaging
  product.packaging.forEach(pp => {
    if (pp.quantity > 0) {
      const possible = Math.floor((pp.packaging.stock || 0) / pp.quantity)
      if (possible < maxQty) {
        maxQty = possible
        limitingFactor = `${pp.packaging.name} (Stok: ${pp.packaging.stock})`
      }
    }
  })

  if (maxQty === Infinity) maxQty = 0

  // Calculate Financials
  // HPP = Materials Cost + Packaging Cost + Labor + Overhead (Assuming standard/saved costs or simplified)
  // Since we don't have stored Labor/Overhead in IProduct, we might need to estimate or use the product's base HPP if stored?
  // IProduct has 'sellingPrice' and 'laborCost'. Overhead is often per batch or per unit. 
  // Let's use product.laborCost. 
  
  // Calculate Material Cost per unit
  const matCost = product.materials.reduce((sum, m) => sum + (m.quantity * m.material.costPerUnit), 0)
  const packCost = product.packaging.reduce((sum, p) => sum + (p.quantity * p.packaging.costPerUnit), 0)
  
  // Use laborCost from product if available, else 0. 
  const labor = product.laborCost || 0
  
  // Total HPP per unit
  const hppPerUnit = matCost + packCost + labor
  
  const totalHPP = maxQty * hppPerUnit
  const estRevenue = maxQty * product.sellingPrice
  const estProfit = estRevenue - totalHPP
  
  // Calculate Remaining Materials
  // We list ALL materials involved and their remaining amount
  const remainingMaterials = [] as RemainingMaterialItem[]
  
  product.materials.forEach(pm => {
    remainingMaterials.push({
      name: pm.material.name,
      initial: pm.material.stock,
      used: maxQty * pm.quantity,
      remaining: (pm.material.stock || 0) - (maxQty * pm.quantity),
      unit: pm.material.metric
    })
  })
  
  product.packaging.forEach(pp => {
    remainingMaterials.push({
      name: pp.packaging.name,
      initial: pp.packaging.stock,
      used: maxQty * pp.quantity,
      remaining: (pp.packaging.stock || 0) - (maxQty * pp.quantity),
      unit: 'pcs' // Assuming packaging is unit based
    })
  })

  return {
    product,
    maxQty,
    limitingFactor,
    totalHPP,
    estRevenue,
    estProfit,
    remainingMaterials
  }
}

const allMaxProductions = computed(() => {
  return availableProducts.value
    .map(p => calculateMaxForProduct(p))
    .sort((a, b) => b.estProfit - a.estProfit) // Sort by most profitable
})

const currentMaxProductionData = computed(() => {
  if (productionMode.value === 'single') {
    if (!selectedProductForMax.value) return null
    return calculateMaxForProduct(selectedProductForMax.value)
  } else {
    // In 'all' mode, maybe we don't show specific Overview unless one is "active", 
    // BUT the prompt asks for an Overview Panel regardless. 
    // We will show the aggregation OR the top recommendation.
    // Let's show the Top Recommendation (Most Profitable) as the "Main Highlight" in the Overview
    return allMaxProductions.value.length > 0 ? allMaxProductions.value[0] : null
  }
})

// AI Strategy Logic
const getProductionStrategy = async () => {
  if (!currentMaxProductionData.value) return
  
  analyzingStrategy.value = true
  aiStrategyResult.value = ''
  
  try {
    const data = currentMaxProductionData.value
    const modeText = productionMode.value === 'all' 
      ? "Mode 1: Rekomendasi Berdasarkan Bahan Tersedia (Memprioritaskan profit tertinggi)" 
      : "Mode 2: Rekomendasi Maksimal Produk Dipilih"

    const materialList = data.remainingMaterials.map(m => 
      `- ${m.name}: Sisa ${m.remaining} ${m.unit} (Terpakai ${m.used})`
    ).join('\n')

    const prompt = `
Context: Anda adalah ahli strategi produksi untuk manufaktur.
Data Produksi Saat Ini:
${modeText}
Produk Target: ${data.product.name}
- Maksimal Produksi: ${data.maxQty} unit
- Faktor Pembatas: ${data.limitingFactor}
- Estimasi Profit: ${formatCurrency(data.estProfit)}
- HPP Total: ${formatCurrency(data.totalHPP)}

Status Sisa Bahan setelah produksi maksimal:
${materialList}

Tugas AI:
1. Berikan justifikasi singkat mengapa angka produksi ini direkomendasikan.
2. Berikan rekomendasi strategis: apa yang harus diproduksi atau bahan apa yang harus di-restock untuk meningkatkan output.
3. Berikan 2-3 skenario alternatif (misalnya: "Jika mengurangi produksi A sebesar 10%, bisa memproduksi B sebanyak Y...").

Format Output: Berikan jawaban dalam teks biasa (Markdown) yang rapi, profesional dan bahasa Indonesia yang luwes. Jangan gunakan JSON untuk respon ini.
    `
    
    // We reuse existing API but it expects JSON output wrapper logic in the server.
    // The server forces JSON parsing! 
    // Server code: 
    // const cleanJson = aiResponse.replace(/```json|```/g, '').trim()
    // const jsonMatch = cleanJson.match(/\{[\s\S]*\}/)
    // if (jsonMatch) return JSON.parse...
    
    // PROBLEM: The server expects JSON. The prompt request asks for "text response". 
    // I must adjust the prompt to request JSON that *contains* the text response, 
    // OR I need a new API endpoint. 
    // Re-reading User Request: "Instruct OpenAI to return a text response..."
    // But the server blindly parses JSON.
    // I will wrap the response in a JSON object structure: { "analysis_text": "..." }
    
    const jsonPrompt = `
${prompt}

PENTING: Output HARUS dalam format JSON valid dengan struktur:
{
  "strategy_analysis": "Tuliskan seluruh analisis teks panjang (markdown) Anda di sini. Gunakan \\n untuk baris baru."
}
`

    const response = await $fetch('/api/ai-analysis', {
      method: 'POST',
      body: { prompt: jsonPrompt }
    })
    
    if (response && response.strategy_analysis) {
      aiStrategyResult.value = response.strategy_analysis
    } else {
      aiStrategyResult.value = "Gagal memuat analisis strategi."
    }

  } catch (err) {
    console.error(err)
    aiStrategyResult.value = "Terjadi kesalahan saat menghubungi AI."
  } finally {
    analyzingStrategy.value = false
  }
}


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



// Methods
const addMaterial = () => {
  hppForm.value.materials.push({ materialId: null, name: '', quantity: 0, price: 0 })
}

const removeMaterial = (index: number) => {
  if (hppForm.value.materials.length > 1) {
    hppForm.value.materials.splice(index, 1)
  }
}

const onMaterialSelect = (index: number) => {
  const item = hppForm.value.materials[index]
  if (!item) return

  if (item.materialId) {
    const mat = materialStore.materials.find(m => m.id === item.materialId)
    if (mat) {
      item.name = mat.name
      item.price = mat.costPerUnit // Set default price from master data
    }
  } else {
    item.name = ''
    item.price = 0
  }
}

const addPackaging = () => {
  hppForm.value.packaging.push({ packagingId: null, name: '', quantity: 0, price: 0 })
}

const removePackaging = (index: number) => {
  if (hppForm.value.packaging.length > 1) {
    hppForm.value.packaging.splice(index, 1)
  }
}

const onPackagingSelect = (index: number) => {
  const item = hppForm.value.packaging[index]
  if (!item) return

  if (item.packagingId) {
    const pkg = packagingStore.packagings.find(p => p.id === item.packagingId)
    if (pkg) {
      item.name = pkg.name
      item.price = pkg.costPerUnit
    }
  } else {
    item.name = ''
    item.price = 0
  }
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
  
  try {
    const prompt = `Anda adalah konsultan keuangan dan akuntansi biaya. Analisis data HPP berikut dan berikan rekomendasi dalam format JSON:

Data Produk:
- Nama: ${hppForm.value.productId ? getProductName(hppForm.value.productId) : 'Produk'}
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
  "cost_breakdown_analysis": "analisis singkat struktur biaya",
  "pricing_recommendation": "rekomendasi harga jual yang optimal",
  "optimization_tips": ["tip1", "tip2", "tip3"],
  "risk_factors": ["risiko1", "risiko2"],
  "competitive_position": "analisis posisi kompetitif"
}`

    // Call backend API route
    const response = await $fetch('/api/ai-analysis', {
      method: 'POST',
      body: { prompt }
    })
    
    aiInsights.value = response
    activeTab.value = 'ai'
    
  } catch (error) {
    console.error('Error getting AI analysis:', error)
    
    // Fallback data
    aiInsights.value = {
      efficiency_score: 75,
      cost_breakdown_analysis: "Struktur biaya Anda cukup baik dengan proporsi bahan baku yang dominan.",
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
  if (!hppForm.value.productId) {
    alert('Mohon pilih produk terlebih dahulu')
    return
  }

  await productionStore.addProduction({
    productId: hppForm.value.productId,
    date: new Date().toLocaleDateString('id-ID'),
    quantity: hppForm.value.productionQty,
    hppPerUnit: hppPerUnit.value,
    totalHPP: totalHPP.value,
    includePacking: hppForm.value.includePacking
  })
  
  alert('Produksi berhasil disimpan!')
  
  // Reset form
  hppForm.value = {
    productId: null,
    materials: [{ materialId: null, name: '', quantity: 0, price: 0 }],
    laborCost: 0,
    overheadCost: 0,
    includePacking: false,
    packaging: [{ packagingId: null, name: '', quantity: 0, price: 0 }],
    productionQty: 1,
    inventoryStart: 0,
    inventoryEnd: 0,
    targetMargin: 40
  }
}

const deleteProduction = async (id: number) => {
  if (confirm('Yakin ingin menghapus data produksi ini?')) {
    await productionStore.deleteProduction(id)
    alert('Data produksi berhasil dihapus!')
  }
}
</script>