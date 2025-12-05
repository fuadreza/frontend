<template>
  <div class="min-h-screen bg-gray-50">
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
              <p class="text-2xl font-semibold text-gray-900">{{ productStore.productsWithDetails.length }}</p>
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
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
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
              <p class="text-sm font-medium">{{ product.name }}</p>
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
                <span class="text-gray-600">Biaya Tenaga</span>
                <span class="font-medium text-gray-900">{{ formatCurrency(product.laborCost) }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">HPP</span>
                <span class="font-medium text-red-600">{{ formatCurrency(getHPP(product)) }}</span>
              </div>
              <div class="flex justify-between text-sm">
                <span class="text-gray-600">Harga Jual</span>
                <span class="font-medium text-green-600">{{ formatCurrency(product.sellingPrice) }}</span>
              </div>
              <div class="flex justify-between text-sm pt-2 border-t border-gray-200">
                <span class="text-gray-600">Margin</span>
                <span class="font-semibold text-indigo-600">{{ getMargin(product).toFixed(2) }}%</span>
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
                  <label class="block text-sm font-medium text-gray-700 mb-1">Stok</label>
                  <input
                    v-model.number="formData.stock"
                    type="number"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="0"
                  />
                </div>
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Biaya Tenaga</label>
                  <input
                    v-model.number="formData.laborCost"
                    type="number"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="0"
                  />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
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

              <!-- Materials Section -->
              <div>
                <div class="flex justify-between items-center mb-2">
                  <label class="block text-sm font-medium text-gray-700">Bahan Baku</label>
                  <button type="button" @click="addMaterialRow" class="text-xs text-indigo-600 hover:text-indigo-800 font-medium">
                    + Tambah Bahan
                  </button>
                </div>
                <div class="space-y-2">
                  <div v-for="(item, index) in formData.productMaterial" :key="index" class="flex gap-2 items-start">
                    <select
                      v-model="item.materialId"
                      class="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option :value="0">Pilih Bahan</option>
                      <option v-for="mat in materialStore.materials" :key="mat.id" :value="mat.id">
                        {{ mat.name }} ({{ mat.metric }})
                      </option>
                    </select>
                    <input
                      v-model.number="item.quantity"
                      type="number"
                      placeholder="Jml"
                      class="w-20 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button type="button" @click="removeMaterialRow(index)" class="p-2 text-red-600 hover:bg-red-50 rounded">
                      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  <p v-if="!formData.productMaterial?.length" class="text-sm text-gray-500 italic">Belum ada bahan baku dipilih</p>
                </div>
              </div>

              <!-- Packaging Section -->
              <div>
                <div class="flex justify-between items-center mb-2">
                  <label class="block text-sm font-medium text-gray-700">Kemasan</label>
                  <button type="button" @click="addPackagingRow" class="text-xs text-indigo-600 hover:text-indigo-800 font-medium">
                    + Tambah Kemasan
                  </button>
                </div>
                <div class="space-y-2">
                  <div v-for="(item, index) in formData.productPackaging" :key="index" class="flex gap-2 items-start">
                    <select
                      v-model="item.packagingId"
                      class="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
                    >
                      <option :value="0">Pilih Kemasan</option>
                      <option v-for="pack in packagingStore.packagings" :key="pack.id" :value="pack.id">
                        {{ pack.name }} ({{ pack.metric }})
                      </option>
                    </select>
                    <input
                      v-model.number="item.quantity"
                      type="number"
                      placeholder="Jml"
                      class="w-20 px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button type="button" @click="removePackagingRow(index)" class="p-2 text-red-600 hover:bg-red-50 rounded">
                      <svg class="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                  <p v-if="!formData.productPackaging?.length" class="text-sm text-gray-500 italic">Belum ada kemasan dipilih</p>
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
            <p class="mt-1 text-indigo-100">Stok: {{ selectedProduct.stock }}</p>
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
                      <span class="text-sm font-semibold text-red-600">{{ formatCurrency(getHPP(selectedProduct)) }}</span>
                    </div>
                    <div class="flex justify-between">
                      <span class="text-sm text-gray-600">Harga Jual</span>
                      <span class="text-sm font-semibold text-green-600">{{ formatCurrency(selectedProduct.sellingPrice) }}</span>
                    </div>
                    <div class="flex justify-between pt-2 border-t">
                      <span class="text-sm text-gray-600">Profit per Unit</span>
                      <span class="text-sm font-bold text-indigo-600">{{ formatCurrency(selectedProduct.sellingPrice - getHPP(selectedProduct)) }}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 class="text-sm font-medium text-gray-500 mb-2">Margin & Status</h3>
                  <div class="space-y-2">
                    <div class="flex justify-between">
                      <span class="text-sm text-gray-600">Margin</span>
                      <span class="text-sm font-semibold text-indigo-600">{{ getMargin(selectedProduct).toFixed(2) }}%</span>
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

    <!-- Modern Floating Action Button -->
    <button
      @click="showAddModal = true"
      class="fixed bottom-8 right-8 group flex items-center gap-3 px-6 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-full shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300 ease-out z-10"
    >
      <svg class="h-6 w-6 transition-transform group-hover:rotate-90 duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4" />
      </svg>
      <span class="font-semibold text-sm whitespace-nowrap">Tambah Produk</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import type { IProduct, IProductWithDetails, NewProduct } from '~/services/interfaces/IProductService'
import { useProductStore } from '~/stores/productStore'
import { useMaterialStore } from '~/stores/materialStore'
import { usePackagingStore } from '~/stores/packagingStore'
import { calculateProductMetrics } from '~/utils/productCalculation'

definePageMeta({
  layout: 'dashboard',
})

const showAddModal = ref(false)
const showDetailModal = ref(false)
const editMode = ref(false)
const searchQuery = ref('')
const filterStatus = ref('')
const selectedProduct = ref<IProductWithDetails | null>(null)

const productStore = useProductStore()
const materialStore = useMaterialStore()
const packagingStore = usePackagingStore()

onMounted(() => {
  productStore.fetchProductsWithDetails()
  materialStore.fetchMaterials()
  packagingStore.fetchPackagings()
})

const emptyForm = (): NewProduct => ({
  name: '',
  description: '',
  sellingPrice: 0,
  stock: 0,
  laborCost: 0,
  productMaterial: [],
  productPackaging: [],
  isActive: true,
})

const formData = ref<Partial<IProduct>>(emptyForm());

const filteredProducts = computed(() => {
  return productStore.productsWithDetails.filter(product => {
    const matchSearch = product.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchStatus = !filterStatus.value || 
      (filterStatus.value === 'aktif' && product.isActive) ||
      (filterStatus.value === 'nonaktif' && !product.isActive)
    
    return matchSearch && matchStatus
  })
})

const activeProducts = computed(() => {
  return productStore.productsWithDetails.filter(p => p.isActive).length
})

const getHPP = (product: IProductWithDetails) => {
  return calculateProductMetrics(product).HPP
}

const getMargin = (product: IProductWithDetails) => {
  return calculateProductMetrics(product).marginPercentage
}

const avgHPP = computed(() => {
  const total = productStore.productsWithDetails.reduce((sum, p) => sum + getHPP(p), 0)
  return total / productStore.productsWithDetails.length || 0
})

const avgMargin = computed(() => {
  const total = productStore.productsWithDetails.reduce((sum, p) => sum + getMargin(p), 0)
  return (total / productStore.productsWithDetails.length || 0).toFixed(1)
})

const calculatedMargin = computed(() => {
  // if (formData.value.sellingPrice) {
  //   const margin = ((formData.value.sellingPrice - getHPP(formData.value)) / formData.value.sellingPrice * 100).toFixed(1)
  //   return `${margin}%`
  // }
  return '0%'
})

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(value)
}

const viewDetail = (product: IProductWithDetails) => {
  selectedProduct.value = product
  showDetailModal.value = true
}

const editProduct = (product: IProductWithDetails) => {
  formData.value = {
    ...product,
    productMaterial: product.materials?.map(m => ({
      materialId: m.material.id,
      quantity: m.quantity
    })) || [],
    productPackaging: product.packaging?.map(p => ({
      packagingId: p.packaging.id,
      quantity: p.quantity
    })) || []
  }
  editMode.value = true
  showAddModal.value = true
}

const addMaterialRow = () => {
  if (!formData.value.productMaterial) formData.value.productMaterial = []
  formData.value.productMaterial.push({ materialId: 0, quantity: 0 })
}

const removeMaterialRow = (index: number) => {
  formData.value.productMaterial?.splice(index, 1)
}

const addPackagingRow = () => {
  if (!formData.value.productPackaging) formData.value.productPackaging = []
  formData.value.productPackaging.push({ packagingId: 0, quantity: 0 })
}

const removePackagingRow = (index: number) => {
  formData.value.productPackaging?.splice(index, 1)
}

const deleteProduct = (id: number) => {
  if (confirm('Yakin ingin menghapus produk ini?')) {
    productStore.deleteProduct(id)
  }
}

const saveProduct = () => {
  if (editMode.value) {
    if (formData.value.id) {
      const productWithDetails = formData.value as IProductWithDetails
      const { materials, packaging, ...product } = productWithDetails
      productStore.updateProduct(formData.value.id, product)
    }
  } else {
    productStore.addProduct({...formData.value as IProduct})
  }
  closeModal()
}

const closeModal = () => {
  showAddModal.value = false
  editMode.value = false
  formData.value = emptyForm()
}
</script>