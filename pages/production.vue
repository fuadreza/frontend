<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Produksi & Perhitungan HPP</h1>
          <p class="mt-1 text-sm text-gray-500">Hitung maksimal produksi dan HPP produk</p>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Tabs -->
      <div class="bg-white rounded-lg shadow mb-8">
        <div class="border-b border-gray-200">
          <nav class="flex -mb-px">
            <button
              @click="activeTab = 'calculator'"
              :class="[
                'py-4 px-6 text-sm font-medium border-b-2 transition-colors',
                activeTab === 'calculator'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              Kalkulator HPP
            </button>
            <button
              @click="activeTab = 'maxProduction'"
              :class="[
                'py-4 px-6 text-sm font-medium border-b-2 transition-colors',
                activeTab === 'maxProduction'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              Maksimal Produksi
            </button>
            <button
              @click="activeTab = 'history'"
              :class="[
                'py-4 px-6 text-sm font-medium border-b-2 transition-colors',
                activeTab === 'history'
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              ]"
            >
              Riwayat Produksi
            </button>
          </nav>
        </div>

        <!-- Kalkulator HPP Tab -->
        <div v-if="activeTab === 'calculator'" class="p-6">
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <!-- Form Input -->
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Input Biaya Produksi</h3>
              
              <div class="space-y-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Nama Produk</label>
                  <input
                    v-model="hppForm.productName"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="Contoh: Kopi Arabica 250g"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Bahan Baku</label>
                  <div class="space-y-2">
                    <div v-for="(item, index) in hppForm.materials" :key="index" class="flex gap-2">
                      <input
                        v-model="item.name"
                        type="text"
                        placeholder="Nama bahan"
                        class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <input
                        v-model.number="item.quantity"
                        type="number"
                        placeholder="Qty"
                        class="w-24 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <input
                        v-model.number="item.price"
                        type="number"
                        placeholder="Harga"
                        class="w-32 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <button
                        @click="removeMaterial(index)"
                        class="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                  <button
                    @click="addMaterial"
                    class="mt-2 text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    + Tambah Bahan
                  </button>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Biaya Tenaga Kerja</label>
                  <input
                    v-model.number="hppForm.laborCost"
                    type="number"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="50000"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Biaya Overhead</label>
                  <input
                    v-model.number="hppForm.overheadCost"
                    type="number"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="20000"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-2">Kemasan</label>
                  <div class="flex items-center mb-2">
                    <input
                      v-model="hppForm.includePacking"
                      type="checkbox"
                      class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span class="ml-2 text-sm text-gray-700">Include biaya kemasan dalam HPP</span>
                  </div>
                  
                  <div v-if="hppForm.includePacking" class="space-y-2">
                    <div v-for="(pack, index) in hppForm.packaging" :key="index" class="flex gap-2">
                      <input
                        v-model="pack.name"
                        type="text"
                        placeholder="Nama kemasan"
                        class="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <input
                        v-model.number="pack.quantity"
                        type="number"
                        placeholder="Qty"
                        class="w-24 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <input
                        v-model.number="pack.price"
                        type="number"
                        placeholder="Harga"
                        class="w-32 px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <button
                        @click="removePackaging(index)"
                        class="px-3 py-2 text-red-600 hover:bg-red-50 rounded-md"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                  <button
                    v-if="hppForm.includePacking"
                    @click="addPackaging"
                    class="mt-2 text-sm text-indigo-600 hover:text-indigo-800 font-medium"
                  >
                    + Tambah Kemasan
                  </button>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Jumlah Produksi (unit)</label>
                  <input
                    v-model.number="hppForm.productionQty"
                    type="number"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="100"
                  />
                </div>
              </div>
            </div>

            <!-- Result -->
            <div>
              <h3 class="text-lg font-semibold text-gray-900 mb-4">Hasil Perhitungan</h3>
              
              <div class="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-lg p-6 border border-indigo-200">
                <div class="space-y-4">
                  <div class="flex justify-between items-center pb-3 border-b border-indigo-200">
                    <span class="text-sm text-gray-700">Total Biaya Bahan</span>
                    <span class="text-lg font-semibold text-gray-900">{{ formatCurrency(totalMaterialCost) }}</span>
                  </div>

                  <div v-if="hppForm.includePacking" class="flex justify-between items-center pb-3 border-b border-indigo-200">
                    <span class="text-sm text-gray-700">Total Biaya Kemasan</span>
                    <span class="text-lg font-semibold text-gray-900">{{ formatCurrency(totalPackagingCost) }}</span>
                  </div>

                  <div class="flex justify-between items-center pb-3 border-b border-indigo-200">
                    <span class="text-sm text-gray-700">Biaya Tenaga Kerja</span>
                    <span class="text-lg font-semibold text-gray-900">{{ formatCurrency(hppForm.laborCost) }}</span>
                  </div>

                  <div class="flex justify-between items-center pb-3 border-b border-indigo-200">
                    <span class="text-sm text-gray-700">Biaya Overhead</span>
                    <span class="text-lg font-semibold text-gray-900">{{ formatCurrency(hppForm.overheadCost) }}</span>
                  </div>

                  <div class="flex justify-between items-center py-3 bg-indigo-100 rounded-lg px-4">
                    <span class="text-base font-semibold text-gray-900">Total HPP</span>
                    <span class="text-2xl font-bold text-indigo-600">{{ formatCurrency(totalHPP) }}</span>
                  </div>

                  <div class="flex justify-between items-center py-3 bg-purple-100 rounded-lg px-4">
                    <span class="text-base font-semibold text-gray-900">HPP per Unit</span>
                    <span class="text-2xl font-bold text-purple-600">{{ formatCurrency(hppPerUnit) }}</span>
                  </div>

                  <div class="pt-4">
                    <p class="text-xs text-gray-600 mb-2">Saran Harga Jual (Margin 40%)</p>
                    <div class="bg-green-100 rounded-lg px-4 py-3 border border-green-200">
                      <span class="text-xl font-bold text-green-700">{{ formatCurrency(suggestedPrice) }}</span>
                    </div>
                  </div>
                </div>

                <button
                  @click="saveProduction"
                  class="mt-6 w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 font-medium"
                >
                  Simpan Produksi
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Max Production Tab -->
        <div v-if="activeTab === 'maxProduction'" class="p-6">
          <div class="mb-6">
            <h3 class="text-lg font-semibold text-gray-900 mb-4">Pilih Produk</h3>
            <select
              v-model="selectedProductForMax"
              class="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option :value="null">Pilih produk...</option>
              <option v-for="prod in sampleProducts" :key="prod.id" :value="prod">
                {{ prod.name }}
              </option>
            </select>
          </div>

          <div v-if="selectedProductForMax" class="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h4 class="font-semibold text-gray-900 mb-4">Resep & Kebutuhan Bahan</h4>
              <div class="bg-gray-50 rounded-lg p-4 space-y-3">
                <div v-for="material in selectedProductForMax.recipe" :key="material.name">
                  <div class="flex justify-between items-center mb-2">
                    <span class="text-sm font-medium text-gray-700">{{ material.name }}</span>
                    <span class="text-sm text-gray-600">{{ material.needed }} {{ material.unit }} per unit</span>
                  </div>
                  <div class="flex justify-between items-center text-xs">
                    <span class="text-gray-500">Stok tersedia: {{ material.available }} {{ material.unit }}</span>
                    <span class="font-semibold" :class="maxProductionFromMaterial(material) > 0 ? 'text-green-600' : 'text-red-600'">
                      Max: {{ maxProductionFromMaterial(material) }} unit
                    </span>
                  </div>
                  <div class="mt-2 w-full bg-gray-200 rounded-full h-2">
                    <div
                      class="h-2 rounded-full bg-indigo-600"
                      :style="{ width: `${Math.min((material.available / (material.needed * 100)) * 100, 100)}%` }"
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h4 class="font-semibold text-gray-900 mb-4">Hasil Analisis</h4>
              <div class="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6 border border-green-200">
                <div class="text-center mb-6">
                  <p class="text-sm text-gray-600 mb-2">Maksimal Produksi</p>
                  <p class="text-5xl font-bold text-green-600">{{ maxProduction }}</p>
                  <p class="text-sm text-gray-500 mt-1">unit produk</p>
                </div>

                <div class="space-y-3 pt-4 border-t border-green-200">
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Bahan Pembatas</span>
                    <span class="text-sm font-semibold text-gray-900">{{ limitingMaterial }}</span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Total HPP</span>
                    <span class="text-sm font-semibold text-gray-900">
                      {{ formatCurrency(maxProduction * selectedProductForMax.hpp) }}
                    </span>
                  </div>
                  <div class="flex justify-between">
                    <span class="text-sm text-gray-600">Estimasi Revenue</span>
                    <span class="text-sm font-semibold text-green-600">
                      {{ formatCurrency(maxProduction * selectedProductForMax.sellingPrice) }}
                    </span>
                  </div>
                  <div class="flex justify-between pt-3 border-t border-green-300">
                    <span class="text-sm font-semibold text-gray-900">Estimasi Profit</span>
                    <span class="text-lg font-bold text-green-700">
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
          <h3 class="text-lg font-semibold text-gray-900 mb-4">Riwayat Produksi</h3>
          
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tanggal</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Produk</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Jumlah</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">HPP/Unit</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Total HPP</th>
                  <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Include Packing</th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="history in productionHistory" :key="history.id" class="hover:bg-gray-50">
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ history.date }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{{ history.product }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ history.quantity }} unit</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{{ formatCurrency(history.hppPerUnit) }}</td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm font-semibold text-gray-900">{{ formatCurrency(history.totalHPP) }}</td>
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

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

interface ProductionHistory {
  id: number
  date: string
  product: string
  quantity: number
  hppPerUnit: number
  totalHPP: number
  includePacking: boolean
}

definePageMeta({
  layout: 'default',
})

const activeTab = ref('calculator')

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
  productionQty: 1
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

const productionHistory = ref<ProductionHistory[]>([
  { id: 1, date: '3 Des 2024', product: 'Kopi Arabica Premium 250g', quantity: 50, hppPerUnit: 25000, totalHPP: 1250000, includePacking: true },
  { id: 2, date: '2 Des 2024', product: 'Teh Hijau Organik 100g', quantity: 75, hppPerUnit: 18000, totalHPP: 1350000, includePacking: true },
  { id: 3, date: '1 Des 2024', product: 'Coklat Dark 70% 200g', quantity: 30, hppPerUnit: 35000, totalHPP: 1050000, includePacking: false }
])

// Computed
const totalMaterialCost = computed(() => {
  return hppForm.value.materials.reduce((sum, item) => sum + (item.quantity * item.price), 0)
})

const totalPackagingCost = computed(() => {
  if (!hppForm.value.includePacking) return 0
  return hppForm.value.packaging.reduce((sum, item) => sum + (item.quantity * item.price), 0)
})

const totalHPP = computed(() => {
  return totalMaterialCost.value + totalPackagingCost.value + hppForm.value.laborCost + hppForm.value.overheadCost
})

const hppPerUnit = computed(() => {
  if (hppForm.value.productionQty === 0) return 0
  return totalHPP.value / hppForm.value.productionQty
})

const suggestedPrice = computed(() => {
  return hppPerUnit.value / 0.6 // Margin 40% = 1 - 0.6
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

const saveProduction = () => {
  const newHistory: ProductionHistory = {
    id: productionHistory.value.length + 1,
    date: new Date().toLocaleDateString('id-ID'),
    product: hppForm.value.productName,
    quantity: hppForm.value.productionQty,
    hppPerUnit: hppPerUnit.value,
    totalHPP: totalHPP.value,
    includePacking: hppForm.value.includePacking
  }
  
  productionHistory.value.unshift(newHistory)
  alert('Produksi berhasil disimpan!')
  
  // Reset form
  hppForm.value = {
    productName: '',
    materials: [{ name: '', quantity: 0, price: 0 }],
    laborCost: 0,
    overheadCost: 0,
    includePacking: false,
    packaging: [{ name: '', quantity: 0, price: 0 }],
    productionQty: 1
  }
}
</script>