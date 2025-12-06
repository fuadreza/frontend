<script setup lang="ts">
import { h, computed, onMounted } from 'vue'
import { useMaterialStore } from '~/stores/materialStore'
import { usePackagingStore } from '~/stores/packagingStore'
import { useAuthStore } from '~/stores/authStore'
import { useProductionStore } from '~/stores/productionStore'
import { useProductStore } from '~/stores/productStore'

const materialStore = useMaterialStore()
const packagingStore = usePackagingStore()
const authStore = useAuthStore()
const productionStore = useProductionStore()
const productStore = useProductStore()
const router = useRouter()
const config = useRuntimeConfig()

definePageMeta({ layout: 'dashboard' })

if (!authStore.isAuthenticated) router.push('/login')

onMounted(() => {
  materialStore.fetchMaterials()
  packagingStore.fetchPackagings()
  productionStore.fetchProductionsWithDetails()
  productStore.fetchProductsWithDetails()
})

// Icons
const BoxIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' })])
const PackageIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4' })])
const ProductIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' })])
const AlertIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' })])
const CalculatorIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z' })])

// Computed
const recentProductions = computed(() => productionStore.productionsWithDetails.slice(0, 5))
const totalProductionUnits = computed(() => productionStore.productionsWithDetails.reduce((s, p) => s + p.quantity, 0))
const totalProductionHPP = computed(() => productionStore.productionsWithDetails.reduce((s, p) => s + p.totalHPP, 0))
const estimatedRevenue = computed(() => {
  let rev = 0
  productionStore.productionsWithDetails.forEach(prod => {
    if (prod.product) {
      rev += (prod.product.sellingPrice || 0) * prod.quantity
    }
  })
  return rev
})
const estimatedProfit = computed(() => estimatedRevenue.value - totalProductionHPP.value)
const activeProductsCount = computed(() => productStore.productsWithDetails.filter(p => p.isActive).length)
const materialsStockLow = computed(() => materialStore.materials.filter(m => m.stock <= m.minStock * 2 && m.stock > 0).length)
const packagingStockLow = computed(() => packagingStore.packagings.filter(p => p.stock <= p.minStock * 2 && p.stock > 0).length)

const stats = computed(() => [
  { name: 'Total Bahan', value: materialStore.materials.length.toString(), change: materialsStockLow.value > 0 ? `${materialsStockLow.value} rendah` : null, changeType: 'decrease', icon: BoxIcon, iconBg: 'bg-indigo-100 dark:bg-indigo-900/30', iconColor: 'text-indigo-600' },
  { name: 'Total Kemasan', value: packagingStore.packagings.length.toString(), change: packagingStockLow.value > 0 ? `${packagingStockLow.value} rendah` : null, changeType: 'decrease', icon: PackageIcon, iconBg: 'bg-green-100 dark:bg-green-900/30', iconColor: 'text-green-600' },
  { name: 'Total Produk', value: productStore.productsWithDetails.length.toString(), change: `${activeProductsCount.value} aktif`, changeType: 'increase', icon: ProductIcon, iconBg: 'bg-blue-100 dark:bg-blue-900/30', iconColor: 'text-blue-600' },
  { name: 'Stok Menipis', value: (materialsStockLow.value + packagingStockLow.value).toString(), change: null, changeType: null, icon: AlertIcon, iconBg: 'bg-yellow-100 dark:bg-yellow-900/30', iconColor: 'text-yellow-600' }
])

const quickActions = [
  { name: 'Tambah Bahan', description: 'Input bahan baku', icon: BoxIcon, iconBg: 'bg-green-100 dark:bg-green-900/30', iconColor: 'text-green-600', onClick: () => router.push('/materials') },
  { name: 'Tambah Packing', description: 'Input kemasan', icon: PackageIcon, iconBg: 'bg-blue-100 dark:bg-blue-900/30', iconColor: 'text-blue-600', onClick: () => router.push('/packaging') },
  { name: 'Hitung HPP', description: 'Kalkulasi biaya', icon: CalculatorIcon, iconBg: 'bg-purple-100 dark:bg-purple-900/30', iconColor: 'text-purple-600', onClick: () => router.push('/production') },
  { name: 'Tambah Produk', description: 'Produk baru', icon: ProductIcon, iconBg: 'bg-yellow-100 dark:bg-yellow-900/30', iconColor: 'text-yellow-600', onClick: () => router.push('/product') }
]

const formatCurrency = (value: number) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(value)
const formatDate = (date: Date) => new Intl.DateTimeFormat('id-ID', { day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' }).format(date)
</script>

<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      <!-- Stats Grid -->
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div v-for="stat in stats" :key="stat.name" class="bg-white dark:bg-gray-800 overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow">
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div :class="[stat.iconBg, 'rounded-md p-3']">
                  <component :is="stat.icon" :class="[stat.iconColor, 'h-6 w-6']" />
                </div>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 dark:text-gray-400 truncate">{{ stat.name }}</dt>
                  <dd class="flex items-baseline">
                    <div class="text-2xl font-semibold text-gray-900 dark:text-gray-100">{{ stat.value }}</div>
                    <div v-if="stat.change" :class="[stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600', 'ml-2 flex items-baseline text-sm font-semibold']">
                      <span>{{ stat.change }}</span>
                    </div>
                  </dd>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Two Column Layout -->
      <div class="grid grid-cols-1 gap-5 lg:grid-cols-2 mb-8">
        
        <!-- Recent Productions -->
        <div class="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div class="px-6 py-5 border-b border-gray-200 dark:border-gray-700 flex justify-between">
            <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">Produksi Terakhir</h3>
            <button class="text-sm text-indigo-600 hover:text-indigo-800 font-medium" @click="router.push('/production')">Lihat Semua →</button>
          </div>
          <div class="px-6 py-5">
            <div v-if="recentProductions.length > 0" class="space-y-4">
              <div v-for="prod in recentProductions" :key="prod.id" class="flex justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div class="flex-1">
                  <p class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ prod.product.name }}</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">{{ prod.date }}</p>
                </div>
                <div class="text-right">
                  <p class="text-sm font-semibold text-gray-900 dark:text-gray-100">{{ prod.quantity }} unit</p>
                  <p class="text-xs text-green-600">{{ formatCurrency(prod.hppPerUnit) }}</p>
                </div>
              </div>
            </div>
            <div v-else class="text-center py-8 text-gray-500 dark:text-gray-400">Belum ada produksi</div>
          </div>
        </div>

        <!-- Production Summary -->
        <div class="bg-white dark:bg-gray-800 shadow rounded-lg">
          <div class="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
            <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">Ringkasan Produksi</h3>
          </div>
          <div class="px-6 py-5 space-y-4">
            <div class="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-700 dark:to-gray-700 p-4 rounded-lg border border-green-200 dark:border-green-800">
              <div class="flex justify-between mb-2">
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Total Produksi</span>
                <span class="text-lg font-bold text-gray-900 dark:text-gray-100">{{ totalProductionUnits }} unit</span>
              </div>
              <div class="flex justify-between mb-2">
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Total HPP</span>
                <span class="text-lg font-bold text-red-600">{{ formatCurrency(totalProductionHPP) }}</span>
              </div>
              <div class="border-t border-green-300 dark:border-green-700 my-3"/>
              <div class="flex justify-between">
                <span class="text-sm font-semibold text-gray-900 dark:text-gray-100">Est. Revenue</span>
                <span class="text-2xl font-bold text-green-600">{{ formatCurrency(estimatedRevenue) }}</span>
              </div>
              <div class="mt-2 text-right">
                <span class="text-xs text-gray-600 dark:text-gray-400">Est. Profit: </span>
                <span class="text-sm font-semibold text-green-700">{{ formatCurrency(estimatedProfit) }}</span>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div class="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                <p class="text-xs text-gray-600 dark:text-gray-400 mb-1">Total Produk</p>
                <p class="text-lg font-bold text-blue-600">{{ productStore.productsWithDetails.length }}</p>
              </div>
              <div class="bg-purple-50 dark:bg-purple-900/30 p-3 rounded-lg border border-purple-200 dark:border-purple-800">
                <p class="text-xs text-gray-600 dark:text-gray-400 mb-1">Produk Aktif</p>
                <p class="text-lg font-bold text-purple-600">{{ activeProductsCount }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg mb-8">
        <div class="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">Quick Actions</h3>
        </div>
        <div class="px-6 py-5">
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <button v-for="action in quickActions" :key="action.name" class="group bg-white dark:bg-gray-700 border-2 border-gray-200 dark:border-gray-600 rounded-lg p-4 hover:border-indigo-500 hover:shadow-md transition-all" @click="action.onClick">
              <div class="flex flex-col items-center text-center">
                <div :class="[action.iconBg, 'rounded-lg p-3 mb-3 group-hover:scale-110 transition-transform']">
                  <component :is="action.icon" :class="[action.iconColor, 'h-6 w-6']" />
                </div>
                <p class="text-sm font-medium text-gray-900 dark:text-gray-100">{{ action.name }}</p>
                <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">{{ action.description }}</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- User Profile Card -->
      <div class="bg-white dark:bg-gray-800 shadow rounded-lg">
        <div class="px-6 py-5 border-b border-gray-200 dark:border-gray-700">
          <h3 class="text-lg font-medium text-gray-900 dark:text-gray-100">Informasi Akun</h3>
        </div>
        <div class="px-6 py-5">
          <dl class="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div>
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Nama Lengkap</dt>
              <dd class="mt-1 text-sm text-gray-900 dark:text-gray-100 font-medium">{{ authStore.user?.name || '-' }}</dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Email</dt>
              <dd class="mt-1 text-sm text-gray-900 dark:text-gray-100 font-medium">{{ authStore.user?.email || '-' }}</dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">API Base URL</dt>
              <dd class="mt-1 text-xs font-mono bg-gray-50 dark:bg-gray-900 px-2 py-1 rounded text-gray-900 dark:text-gray-100">{{ config.public.apiBaseUrl }}</dd>
            </div>
            <div>
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">Last Login</dt>
              <dd class="mt-1 text-sm text-gray-900 dark:text-gray-100 font-medium">{{ formatDate(new Date()) }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>