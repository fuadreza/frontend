<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Stats Cards -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-5 mb-8">
        <div class="bg-white p-6 rounded-lg shadow">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-blue-100 text-blue-600">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm text-gray-500">Total Kemasan</p>
              <p class="text-2xl font-semibold text-gray-900">{{ packagings.length }}</p>
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
              <p class="text-sm text-gray-500">Stok Aman</p>
              <p class="text-2xl font-semibold text-gray-900">{{ safeStock }}</p>
            </div>
          </div>
        </div>

        <div class="bg-white p-6 rounded-lg shadow">
          <div class="flex items-center">
            <div class="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <svg class="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <div class="ml-4">
              <p class="text-sm text-gray-500">Perlu Restock</p>
              <p class="text-2xl font-semibold text-gray-900">{{ lowStock }}</p>
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
              <p class="text-sm text-gray-500">Nilai Total</p>
              <p class="text-2xl font-semibold text-gray-900">{{ formatCurrency(totalValue) }}</p>
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
              placeholder="Cari kemasan..."
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <select
              v-model="filterType"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Semua Tipe</option>
              <option value="Botol">Botol</option>
              <option value="Pouch">Pouch</option>
              <option value="Jar">Jar</option>
              <option value="Box">Box</option>
              <option value="Label">Label</option>
            </select>
          </div>
          <div>
            <select
              v-model="filterStatus"
              class="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Semua Status</option>
              <option value="aman">Stok Aman</option>
              <option value="rendah">Stok Rendah</option>
              <option value="habis">Habis</option>
            </select>
          </div>
        </div>
      </div>

      <!-- Packagings Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div
          v-for="pack in filteredPackagings"
          :key="pack.id"
          class="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow overflow-hidden"
        >
          <div class="p-6">
            <div class="flex items-center justify-between mb-4">
              <span
                :class="[
                  'px-3 py-1 text-xs font-semibold rounded-full',
                  getTypeColor(pack.type)
                ]"
              >
                {{ pack.type }}
              </span>
              <span
                :class="[
                  'px-3 py-1 text-xs font-semibold rounded-full',
                  getStatusClass(pack.stock, pack.minStock)
                ]"
              >
                {{ getStatusText(pack.stock, pack.minStock) }}
              </span>
            </div>

            <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ pack.name }}</h3>
            <p class="text-sm text-gray-500 mb-4">{{ pack.size }}</p>

            <div class="space-y-3">
              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Stok Tersedia</span>
                <span class="text-lg font-bold text-gray-900">{{ pack.stock }} {{ pack.unit }}</span>
              </div>

              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Harga/Unit</span>
                <span class="text-sm font-semibold text-gray-900">{{ formatCurrency(pack.pricePerUnit) }}</span>
              </div>

              <div class="flex justify-between items-center">
                <span class="text-sm text-gray-600">Total Nilai</span>
                <span class="text-sm font-semibold text-indigo-600">
                  {{ formatCurrency(pack.stock * pack.pricePerUnit) }}
                </span>
              </div>

              <div class="pt-3 border-t border-gray-200">
                <div class="flex justify-between items-center mb-2">
                  <span class="text-xs text-gray-500">Stok Minimum</span>
                  <span class="text-xs font-medium text-gray-700">{{ pack.minStock }} {{ pack.unit }}</span>
                </div>
                <div class="w-full bg-gray-200 rounded-full h-2">
                  <div
                    :class="[
                      'h-2 rounded-full',
                      pack.stock <= pack.minStock ? 'bg-red-500' :
                      pack.stock <= pack.minStock * 2 ? 'bg-yellow-500' : 'bg-green-500'
                    ]"
                    :style="{ width: `${Math.min((pack.stock / (pack.minStock * 3)) * 100, 100)}%` }"
                  ></div>
                </div>
              </div>
            </div>

            <div class="mt-4 pt-4 border-t border-gray-200 flex justify-end space-x-2">
              <button
                @click="editPackaging(pack)"
                class="px-3 py-2 text-sm font-medium text-indigo-600 hover:bg-indigo-50 rounded-md transition-colors"
              >
                Edit
              </button>
              <button
                @click="deletePackaging(pack.id)"
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
        
        <div class="bg-white rounded-lg overflow-hidden shadow-xl transform transition-all max-w-lg w-full relative z-20">
          <div class="bg-white px-6 py-4 border-b border-gray-200">
            <h3 class="text-lg font-medium text-gray-900">
              {{ editMode ? 'Edit Kemasan' : 'Tambah Kemasan Baru' }}
            </h3>
          </div>
          
          <div class="px-6 py-4">
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Nama Kemasan</label>
                <input
                  v-model="formData.name"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Contoh: Botol Kaca 250ml"
                />
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Tipe</label>
                  <select
                    v-model="formData.type"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="">Pilih Tipe</option>
                    <option value="Botol">Botol</option>
                    <option value="Pouch">Pouch</option>
                    <option value="Jar">Jar</option>
                    <option value="Box">Box</option>
                    <option value="Label">Label</option>
                  </select>
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Ukuran</label>
                  <input
                    v-model="formData.size"
                    type="text"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="250ml, 500g, dll"
                  />
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Stok</label>
                  <input
                    v-model.number="formData.stock"
                    type="number"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="500"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Satuan</label>
                  <select
                    v-model="formData.unit"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="pcs">Pieces (pcs)</option>
                    <option value="box">Box</option>
                    <option value="pack">Pack</option>
                    <option value="roll">Roll</option>
                  </select>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Harga per Unit</label>
                  <input
                    v-model.number="formData.pricePerUnit"
                    type="number"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="5000"
                  />
                </div>

                <div>
                  <label class="block text-sm font-medium text-gray-700 mb-1">Stok Minimum</label>
                  <input
                    v-model.number="formData.minStock"
                    type="number"
                    class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    placeholder="100"
                  />
                </div>
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Supplier</label>
                <input
                  v-model="formData.supplier"
                  type="text"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Nama supplier"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700 mb-1">Catatan</label>
                <textarea
                  v-model="formData.notes"
                  rows="3"
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="Catatan tambahan..."
                ></textarea>
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
              @click="savePackaging"
              class="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              {{ editMode ? 'Update' : 'Simpan' }}
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
      <span class="font-semibold text-sm whitespace-nowrap">Tambah Kemasan</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

definePageMeta({
  layout: 'dashboard',
})

const showAddModal = ref(false)
const editMode = ref(false)
const searchQuery = ref('')
const filterType = ref('')
const filterStatus = ref('')

const formData = ref({
  id: null as number | null,
  name: '',
  type: '',
  size: '',
  stock: 0,
  unit: 'pcs',
  pricePerUnit: 0,
  minStock: 100,
  supplier: '',
  notes: ''
})

const packagings = ref([
  { id: 1, name: 'Botol Kaca 250ml Bening', type: 'Botol', size: '250ml', stock: 500, unit: 'pcs', pricePerUnit: 3500, minStock: 100, supplier: 'PT Kaca Jaya' },
  { id: 2, name: 'Pouch Stand Up 250g', type: 'Pouch', size: '250g', stock: 1000, unit: 'pcs', pricePerUnit: 1500, minStock: 200, supplier: 'CV Plastik Indo' },
  { id: 3, name: 'Jar Plastik 500ml Putih', type: 'Jar', size: '500ml', stock: 300, unit: 'pcs', pricePerUnit: 2800, minStock: 80, supplier: 'UD Kemasan Murah' },
  { id: 4, name: 'Box Karton 20x15x10cm', type: 'Box', size: '20x15x10cm', stock: 250, unit: 'pcs', pricePerUnit: 4500, minStock: 50, supplier: 'Karton Box Indonesia' },
  { id: 5, name: 'Label Stiker Premium', type: 'Label', size: '10x5cm', stock: 2000, unit: 'pcs', pricePerUnit: 500, minStock: 500, supplier: 'Digital Print Co' },
  { id: 6, name: 'Botol PET 500ml', type: 'Botol', size: '500ml', stock: 80, unit: 'pcs', pricePerUnit: 2500, minStock: 150, supplier: 'PT PET Plastic' },
  { id: 7, name: 'Pouch Zipper 100g', type: 'Pouch', size: '100g', stock: 1500, unit: 'pcs', pricePerUnit: 1200, minStock: 300, supplier: 'CV Plastik Indo' },
])

const filteredPackagings = computed(() => {
  return packagings.value.filter(pack => {
    const matchSearch = pack.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    const matchType = !filterType.value || pack.type === filterType.value
    
    let matchStatus = true
    if (filterStatus.value === 'aman') {
      matchStatus = pack.stock > pack.minStock * 2
    } else if (filterStatus.value === 'rendah') {
      matchStatus = pack.stock <= pack.minStock * 2 && pack.stock > 0
    } else if (filterStatus.value === 'habis') {
      matchStatus = pack.stock === 0
    }
    
    return matchSearch && matchType && matchStatus
  })
})

const safeStock = computed(() => {
  return packagings.value.filter(m => m.stock > m.minStock * 2).length
})

const lowStock = computed(() => {
  return packagings.value.filter(m => m.stock <= m.minStock * 2 && m.stock > 0).length
})

const totalValue = computed(() => {
  return packagings.value.reduce((sum, m) => sum + (m.stock * m.pricePerUnit), 0)
})

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(value)
}

const getTypeColor = (type: string) => {
  const colors: Record<string, string> = {
    'Botol': 'bg-blue-100 text-blue-800',
    'Pouch': 'bg-green-100 text-green-800',
    'Jar': 'bg-purple-100 text-purple-800',
    'Box': 'bg-yellow-100 text-yellow-800',
    'Label': 'bg-pink-100 text-pink-800'
  }
  return colors[type] || 'bg-gray-100 text-gray-800'
}

const getStatusClass = (stock: number, minStock: number) => {
  if (stock === 0) return 'bg-red-100 text-red-800'
  if (stock <= minStock) return 'bg-yellow-100 text-yellow-800'
  if (stock <= minStock * 2) return 'bg-blue-100 text-blue-800'
  return 'bg-green-100 text-green-800'
}

const getStatusText = (stock: number, minStock: number) => {
  if (stock === 0) return 'Habis'
  if (stock <= minStock) return 'Kritis'
  if (stock <= minStock * 2) return 'Rendah'
  return 'Aman'
}

const editPackaging = (pack: any) => {
  formData.value = { ...pack }
  editMode.value = true
  showAddModal.value = true
}

const deletePackaging = (id: number) => {
  if (confirm('Yakin ingin menghapus kemasan ini?')) {
    packagings.value = packagings.value.filter(p => p.id !== id)
  }
}

const savePackaging = () => {
  if (editMode.value) {
    const index = packagings.value.findIndex(p => p.id === formData.value.id)
    if (index !== -1) {
      packagings.value[index] = { ...formData.value } as any
    }
  } else {
    const newId = Math.max(...packagings.value.map(p => p.id)) + 1
    packagings.value.push({ ...formData.value, id: newId } as any)
  }
  closeModal()
}

const closeModal = () => {
  showAddModal.value = false
  editMode.value = false
  formData.value = {
    id: null,
    name: '',
    type: '',
    size: '',
    stock: 0,
    unit: 'pcs',
    pricePerUnit: 0,
    minStock: 100,
    supplier: '',
    notes: ''
  }
}
</script>