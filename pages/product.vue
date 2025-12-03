<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div class="flex items-center justify-between">
          <div>
            <h1 class="text-2xl font-bold text-gray-900">Manajemen Produk</h1>
            <p class="mt-1 text-sm text-gray-500">Kelola daftar produk jadi</p>
          </div>
          <button
            @click="showAddModal = true"
            class="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
          >
            <svg class="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
            </svg>
            Tambah Produk
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
        <div class="bg-white p-6 rounded-lg shadow">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-indigo-100 text-indigo-600">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm text-gray-500">Total Produk</p>
              <p class="text-2xl font-semibold text-gray-900">{{ products.length }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-green-100 text-green-600">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm text-gray-500">Produk Aktif</p>
              <p class="text-2xl font-semibold text-gray-900">{{ activeProducts }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-blue-100 text-blue-600">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm text-gray-500">Avg HPP</p>
              <p class="text-2xl font-semibold text-gray-900">{{ formatCurrency(avgHPP) }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-purple-100 text-purple-600">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm text-gray-500">Avg Margin</p>
              <p class="text-2xl font-semibold text-gray-900">{{ avgMargin }}%</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Filter & Search -->
      <div class="bg-white p-4 rounded-lg shadow mb-6">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Cari produk..."
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <select
              v-model="filterCategory"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Semua Kategori</option>
              <option value="Kopi">Kopi</option>
              <option value="Teh">Teh</option>
              <option value="Coklat">Coklat</option>
              <option value="Minuman">Minuman</option>
            </select>
          </div>
          <div>
            <select
              v-model="filterStatus"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Semua Status</option>
              <option value="aktif">Aktif</option>
              <option value="nonaktif">Tidak Aktif</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Products Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="product in filteredProducts"
          :key="product.id"
          class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
        >
          <div class="h-48 bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
            <div class="text-white text-center">
              <svg class="h-16 w-16 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              <p class="text-sm font-medium">{{ product.category }}</p>
            </div>
          </div>

          <div class="p-6">
            <div class="flex items-center justify-between mb-3">
              <h3 class="text-lg font-semibold text-gray-900">{{ product.name }}</h3>
              <span
                :class="[
                  'px-2 py-1 text-xs font-semibold rounded-full',
                  product.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                ]"
              >
                {{ product.isActive ? 'Aktif' : 'Nonaktif' }}
              </span>
            </div>

            <p class="text-sm text-gray-500 mb-4">{{ product.description }}</p>

            <div class="space-y-2 mb-4">
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Ukuran</span>
                <span class="font-medium text-gray-900">{{ product.size }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">HPP</span>
                <span class="font-medium text-red-600">{{ formatCurrency(product.hpp) }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Harga Jual</span>
                <span class="font-medium text-green-600">{{ formatCurrency(product.sellingPrice) }}</span>
              </div>
              <div class="flex justify-between text-sm pt-2 border-t border-gray-200">
                <span class="text-gray-600">Margin</span>
                <span class="font-semibold text-indigo-600">{{ product.margin }}%</span>
              </div>
            </div>

            <div class="flex justify-end space-x-2 pt-4 border-t border-gray-200">
              <button
                @click="viewDetail(product)"
                class="px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 rounded-md transition-colors"
              >
                Detail
              </button>
              <button
                @click="editProduct(product)"
                class="px-3 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
              >
                Edit
              </button>
              <button
                @click="deleteProduct(product.id)"
                class="px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-md transition-colors"
              >
                Hapus
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <div v-if="showAddModal" class="fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen px-4">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="closeModal"></div>
        
        <div class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-2xl w-full relative z-20">
          <div class="bg-white px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">
              {{ editMode ? 'Edit Produk' : 'Tambah Produk Baru' }}
            </h3>
          </div>
          
          <div class="px-6 py-4 max-h-96 overflow-y-auto">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Nama Produk</label>
                <input
                  v-model="formData.name"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Contoh: Kopi Arabica Premium"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Deskripsi</label>
                <textarea
                  v-model="formData.description"
                  rows="2"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Deskripsi produk..."
                ></textarea>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Kategori</label>
                  <select
                    v-model="formData.category"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Pilih Kategori</option>
                    <option value="Kopi">Kopi</option>
                    <option value="Teh">Teh</option>
                    <option value="Coklat">Coklat</option>
                    <option value="Minuman">Minuman</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Ukuran</label>
                  <input
                    v-model="formData.size"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="250g, 500ml, dll"
                  />
                </div>
              </div>

              <div class="grid grid-cols-3 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">HPP</label>
                  <input
                    v-model.number="formData.hpp"
                    type="number"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="25000"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Harga Jual</label>
                  <input
                    v-model.number="formData.sellingPrice"
                    type="number"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="45000"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Margin</label>
                  <input
                    :value="calculatedMargin"
                    type="text"
                    readonly
                    class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-700"
                  />
                </div>
              </div>

              <div>
                <label class="flex items-center">
                  <input
                    v-model="formData.isActive"
                    type="checkbox"
                    class="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span class="ml-2 text-sm text-gray-700">Produk Aktif</span>
                </label>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 px-6 py-4 flex justify-end space-x-3">
            <button
              @click="closeModal"
              class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Batal
            </button>
            <button
              @click="saveProduct"
              class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              {{ editMode ? 'Update' : 'Simpan' }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Detail Modal -->
    <div v-if="showDetailModal && selectedProduct" class="fixed z-10 inset-0 overflow-y-auto">
      <div class="flex items-center justify-center min-h-screen px-4">
        <div class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" @click="showDetailModal = false"></div>
        
        <div class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-2xl w-full relative z-20">
          <div class="bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-8 text-white">
            <h2 class="text-2xl font-bold">{{ selectedProduct.name }}</h2>
            <p class="mt-1 text-indigo-100">{{ selectedProduct.category }} • {{ selectedProduct.size }}</p>
          </div>
          
          <div class="px-6 py-6">
            <div class="space-y-4">
              <div>
                <h3 class="text-sm font-medium text-gray-500 mb-1">Deskripsi</h3>
                <p class="text-gray-900">{{ selectedProduct.description }}</p>
              </div>

              <div class="grid grid-cols-2 gap-6 pt-4 border-t border-gray-200">
                <div>
                  <h3 class="text-sm font-medium text-gray-500 mb-2">Informasi Harga</h3>
                  <div class="space-y-2">
                    <div class="flex justify-between">
                      <span class="text-sm text-gray-600">HPP</span>
                      <span class="text-sm font-semibold text-red-600">{{ formatCurrency(selectedProduct.hpp) }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-sm text-gray-600">Harga Jual</span>
                      <span class="text-sm font-semibold text-green-600">{{ formatCurrency(selectedProduct.sellingPrice) }}</span>
                    </div>
                    <div class="flex justify-between pt-2 border-t">
                      <span class="text-sm text-gray-600">Profit per Unit</span>
                      <span class="text-sm font-bold text-indigo-600">{{ formatCurrency(selectedProduct.sellingPrice - selectedProduct.hpp) }}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 class="text-sm font-medium text-gray-500 mb-2">Margin & Status</h3>
                  <div class="space-y-2">
                    <div class="flex justify-between">
                      <span class="text-sm text-gray-600">Margin</span>
                      <span class="text-sm font-semibold text-indigo-600">{{ selectedProduct.margin }}%</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-sm text-gray-600">Status</span>
                      <span
                        :class="[
                          'text-sm font-semibold',
                          selectedProduct.isActive ? 'text-green-600' : 'text-gray-600'
                        ]"
                      >
                        {{ selectedProduct.isActive ? 'Aktif' : 'Tidak Aktif' }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="bg-gray-50 px-6 py-4 flex justify-end">
            <button
              @click="showDetailModal = false"
              class="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

interface Product {
  id: number
  name: string
  description: string
  category: string
  size: string
  hpp: number
  sellingPrice: number
  margin: number
  isActive: boolean
}

definePageMeta({
  layout: 'default',
})

const showAddModal = ref(false)
const showDetailModal = ref(false)
const editMode = ref(false)
const searchQuery = ref('')
const filterCategory = ref('')
const filterStatus = ref('')
const selectedProduct = ref<Product | null>(null)

const formData = ref({
  id: null as number | null,
  name: '',
  description: '',
  category: '',
  size: '',
  hpp: 0,
  sellingPrice: 0,
  isActive: true
})

const products = ref<Product[]>([
  { 
    id: 1, 
    name: 'Kopi Arabica Premium 250g', 
    description: 'Kopi Arabica pilihan dengan cita rasa premium',
    category: 'Kopi', 
    size: '250g', 
    hpp: 25000, 
    sellingPrice: 45000, 
    margin: 44.4, 
    isActive: true 
  },
  { 
    id: 2, 
    name: 'Teh Hijau Organik 100g', 
    description: 'Teh hijau organik berkualitas tinggi',
    category: 'Teh', 
    size: '100g', 
    hpp: 18000, 
    sellingPrice: 32000, 
    margin: 43.8, 
    isActive: true 
  },
  { 
    id: 3, 
    name: 'Coklat Dark 70% 200g', 
    description: 'Coklat hitam dengan kandungan kakao 70%',
    category: 'Coklat', 
    size: '200g', 
    hpp: 35000, 
    sellingPrice: 58000, 
    margin: 39.7, 
    isActive: true 
  },
  { 
    id: 4, 
    name: 'Matcha Latte Mix 150g', 
    description: 'Campuran matcha premium siap seduh',
    category: 'Minuman', 
    size: '150g', 
    hpp: 28000, 
    sellingPrice: 48000, 
    margin: 41.7, 
    isActive: true 
  },
  { 
    id: 5, 
    name: 'Kopi Robusta 500g', 
    description: 'Kopi robusta dengan body kuat',
    category: 'Kopi', 
    size: '500g', 
    hpp: 45000, 
    sellingPrice: 75000, 
    margin: 40.0, 
    isActive: false 
  },
])

const filteredProducts = computed(() => {
  return products.value.filter(product => {
    const matchSearch = product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchCategory = !filterCategory.value || product.category === filterCategory.value
    const matchStatus = !filterStatus.value || 
      (filterStatus.value === 'aktif' && product.isActive) ||
      (filterStatus.value === 'nonaktif' && !product.isActive)
    
    return matchSearch && matchCategory && matchStatus
  })
})

const activeProducts = computed(() => {
  return products.value.filter(p => p.isActive).length
})

const avgHPP = computed(() => {
  const total = products.value.reduce((sum, p) => sum + p.hpp, 0)
  return total / products.value.length || 0
})

const avgMargin = computed(() => {
  const total = products.value.reduce((sum, p) => sum + p.margin, 0)
  return (total / products.value.length || 0).toFixed(1)
})

const calculatedMargin = computed(() => {
  if (formData.value.hpp && formData.value.sellingPrice) {
    const margin = ((formData.value.sellingPrice - formData.value.hpp) / formData.value.sellingPrice * 100).toFixed(1)
    return `${margin}%`
  }
  return '0%'
})

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(value)
}

const viewDetail = (product: Product) => {
  selectedProduct.value = product
  showDetailModal.value = true
}

const editProduct = (product: Product) => {
  formData.value = { ...product } as any
  editMode.value = true
  showAddModal.value = true
}

const deleteProduct = (id: number) => {
  if (confirm('Yakin ingin menghapus produk ini?')) {
    products.value = products.value.filter(p => p.id !== id)
  }
}

const saveProduct = () => {
  const margin = parseFloat(((formData.value.sellingPrice - formData.value.hpp) / formData.value.sellingPrice * 100).toFixed(1))
  
  if (editMode.value) {
    const index = products.value.findIndex(p => p.id === formData.value.id)
    if (index !== -1) {
      products.value[index] = { ...formData.value, margin } as Product
    }
  } else {
    const newId = Math.max(...products.value.map(p => p.id)) + 1
    products.value.push({ ...formData.value, id: newId, margin } as Product)
  }
  closeModal()
}

const closeModal = () => {
  showAddModal.value = false
  editMode.value = false
  formData.value = {
    id: null,
    name: '',
    description: '',
    category: '',
    size: '',
    hpp: 0,
    sellingPrice: 0,
    isActive: true
  }
}
</script>