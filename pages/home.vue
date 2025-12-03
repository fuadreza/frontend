<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header Section with Navbar -->
    <div class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Top Header -->
        <div class="py-20 flex items-center justify-between gap-4">
          <div class="flex-1 min-w-0">
            <h1 class="text-xl font-bold leading-tight text-gray-900 sm:text-2xl truncate">
              Dashboard Inventori
            </h1>
            <p class="mt-1 text-xs sm:text-sm text-gray-500 truncate">
              Selamat datang kembali, <span class="font-medium text-gray-900">{{ authStore.user?.name }}</span>
            </p>
          </div>
          <div class="flex-shrink-0">
            <button
              @click="handleLogout"
              class="inline-flex items-center px-3 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors whitespace-nowrap"
            >
              <svg class="h-4 w-4 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span class="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        <!-- Navigation Menu -->
        <nav class="flex space-x-1 border-t border-gray-200 ">
          <button
            v-for="menu in menuItems"
            :key="menu.path"
            @click="navigateTo(menu.path)"
            :class="[
              'flex items-center px-4 py-3 text-sm font-medium border-b-2 transition-colors',
              currentPath === menu.path
                ? 'border-indigo-500 text-indigo-600'
                : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
            ]"
          >
            <component :is="menu.icon" class="h-5 w-5 mr-2" />
            {{ menu.name }}
          </button>
        </nav>
      </div>
    </div>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <!-- Stats Grid -->
      <div class="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <div
          v-for="stat in stats"
          :key="stat.name"
          class="bg-white overflow-hidden shadow rounded-lg hover:shadow-md transition-shadow"
        >
          <div class="p-5">
            <div class="flex items-center">
              <div class="flex-shrink-0">
                <div :class="[stat.iconBg, 'rounded-md p-3']">
                  <component :is="stat.icon" :class="[stat.iconColor, 'h-6 w-6']" />
                </div>
              </div>
              <div class="ml-5 w-0 flex-1">
                <dl>
                  <dt class="text-sm font-medium text-gray-500 truncate">
                    {{ stat.name }}
                  </dt>
                  <dd class="flex items-baseline">
                    <div class="text-2xl font-semibold text-gray-900">
                      {{ stat.value }}
                    </div>
                    <div
                      v-if="stat.change"
                      :class="[
                        stat.changeType === 'increase' ? 'text-green-600' : 'text-red-600',
                        'ml-2 flex items-baseline text-sm font-semibold'
                      ]"
                    >
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
        <!-- Produk yang Sudah Diproduksi -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-6 py-5 border-b border-gray-200 flex items-center justify-between">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              Produk Terproduksi
            </h3>
            <button
              @click="navigateTo('/produksi')"
              class="text-sm text-indigo-600 hover:text-indigo-800 font-medium"
            >
              Lihat Semua →
            </button>
          </div>
          <div class="px-6 py-5">
            <div class="space-y-4">
              <div
                v-for="product in producedProducts"
                :key="product.id"
                class="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div class="flex-1">
                  <p class="text-sm font-medium text-gray-900">{{ product.name }}</p>
                  <p class="text-xs text-gray-500">{{ product.date }}</p>
                </div>
                <div class="text-right">
                  <p class="text-sm font-semibold text-gray-900">{{ product.quantity }} unit</p>
                  <p class="text-xs text-green-600">HPP: {{ formatCurrency(product.hpp) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Estimasi Profit -->
        <div class="bg-white shadow rounded-lg">
          <div class="px-6 py-5 border-b border-gray-200">
            <h3 class="text-lg leading-6 font-medium text-gray-900">
              Estimasi Profit
            </h3>
          </div>
          <div class="px-6 py-5">
            <div class="space-y-4">
              <div class="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-lg border border-green-200">
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-medium text-gray-700">Total Penjualan</span>
                  <span class="text-lg font-bold text-gray-900">{{ formatCurrency(profitData.totalSales) }}</span>
                </div>
                <div class="flex items-center justify-between mb-2">
                  <span class="text-sm font-medium text-gray-700">Total HPP</span>
                  <span class="text-lg font-bold text-red-600">{{ formatCurrency(profitData.totalHPP) }}</span>
                </div>
                <div class="border-t border-green-300 my-3"></div>
                <div class="flex items-center justify-between">
                  <span class="text-sm font-semibold text-gray-900">Profit Bersih</span>
                  <span class="text-2xl font-bold text-green-600">{{ formatCurrency(profitData.netProfit) }}</span>
                </div>
                <div class="mt-2 text-right">
                  <span class="text-xs text-gray-600">Margin: </span>
                  <span class="text-sm font-semibold text-green-700">{{ profitData.margin }}%</span>
                </div>
              </div>

              <div class="grid grid-cols-2 gap-3">
                <div class="bg-blue-50 p-3 rounded-lg border border-blue-200">
                  <p class="text-xs text-gray-600 mb-1">Bulan Ini</p>
                  <p class="text-lg font-bold text-blue-600">{{ formatCurrency(profitData.thisMonth) }}</p>
                </div>
                <div class="bg-purple-50 p-3 rounded-lg border border-purple-200">
                  <p class="text-xs text-gray-600 mb-1">Tahun Ini</p>
                  <p class="text-lg font-bold text-purple-600">{{ formatCurrency(profitData.thisYear) }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="bg-white shadow rounded-lg mb-8">
        <div class="px-6 py-5 border-b border-gray-200">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            Quick Actions
          </h3>
        </div>
        <div class="px-6 py-5">
          <div class="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <button
              v-for="action in quickActions"
              :key="action.name"
              @click="action.onClick"
              class="relative group bg-white border-2 border-gray-200 rounded-lg p-4 hover:border-indigo-500 hover:shadow-md transition-all"
            >
              <div class="flex flex-col items-center text-center">
                <div :class="[action.iconBg, 'rounded-lg p-3 mb-3 group-hover:scale-110 transition-transform']">
                  <component :is="action.icon" :class="[action.iconColor, 'h-6 w-6']" />
                </div>
                <p class="text-sm font-medium text-gray-900">{{ action.name }}</p>
                <p class="text-xs text-gray-500 mt-1">{{ action.description }}</p>
              </div>
            </button>
          </div>
        </div>
      </div>

      <!-- User Profile Card -->
      <div class="bg-white shadow rounded-lg">
        <div class="px-6 py-5 border-b border-gray-200">
          <h3 class="text-lg leading-6 font-medium text-gray-900">
            Informasi Akun
          </h3>
        </div>
        <div class="px-6 py-5">
          <dl class="grid grid-cols-1 gap-x-4 gap-y-6 sm:grid-cols-2">
            <div class="sm:col-span-1">
              <dt class="text-sm font-medium text-gray-500 flex items-center">
                <svg class="h-5 w-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Nama Lengkap
              </dt>
              <dd class="mt-1 text-sm text-gray-900 font-medium">
                {{ authStore.user?.name || '-' }}
              </dd>
            </div>
            <div class="sm:col-span-1">
              <dt class="text-sm font-medium text-gray-500 flex items-center">
                <svg class="h-5 w-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email Address
              </dt>
              <dd class="mt-1 text-sm text-gray-900 font-medium">
                {{ authStore.user?.email || '-' }}
              </dd>
            </div>
            <div class="sm:col-span-1">
              <dt class="text-sm font-medium text-gray-500 flex items-center">
                <svg class="h-5 w-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
                </svg>
                API Base URL
              </dt>
              <dd class="mt-1 text-sm text-gray-900 font-mono text-xs bg-gray-50 px-2 py-1 rounded">
                {{ config.public.apiBaseUrl }}
              </dd>
            </div>
            <div class="sm:col-span-1">
              <dt class="text-sm font-medium text-gray-500 flex items-center">
                <svg class="h-5 w-5 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Last Login
              </dt>
              <dd class="mt-1 text-sm text-gray-900 font-medium">
                {{ formatDate(new Date()) }}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { h, ref } from 'vue'

const authStore = useAuthStore()
const router = useRouter()
const config = useRuntimeConfig()
const route = useRoute()

definePageMeta({
  layout: 'default',
})

// Auth check
if (!authStore.isAuthenticated) {
  router.push('/login')
}

const currentPath = ref(route.path)

// Menu items
const menuItems = ref([
  {
    name: 'Dashboard',
    path: '/home',
    icon: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' })
    ])
  },
  {
    name: 'Materials',
    path: '/materials',
    icon: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' })
    ])
  },
  {
    name: 'Packing',
    path: '/packing',
    icon: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4' })
    ])
  },
  {
    name: 'Product',
    path: '/product',
    icon: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' })
    ])
  },
  {
    name: 'Production',
    path: '/production',
    icon: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z' })
    ])
  }
])

// Icon components
const BoxIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' })
])

const TrendingUpIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M13 7h8m0 0v8m0-8l-8 8-4-4-6 6' })
])

const AlertIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z' })
])

const DollarIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z' })
])

const PlusIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M12 4v16m8-8H4' })
])

const ChartIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' })
])

const CalculatorIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z' })
])

const PackageIcon = () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24' }, [
  h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4' })
])

// Stats data
const stats = ref([
  {
    name: 'Total Produk',
    value: '248',
    change: '+12%',
    changeType: 'increase',
    icon: BoxIcon,
    iconBg: 'bg-indigo-100',
    iconColor: 'text-indigo-600'
  },
  {
    name: 'Total Bahan',
    value: '156',
    change: '+8',
    changeType: 'increase',
    icon: BoxIcon,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600'
  },
  {
    name: 'Stok Menipis',
    value: '12',
    change: null,
    changeType: null,
    icon: AlertIcon,
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600'
  },
  {
    name: 'Profit Bulan Ini',
    value: 'Rp 45.2Jt',
    change: '+15.3%',
    changeType: 'increase',
    icon: DollarIcon,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600'
  }
])

// Produced products data
const producedProducts = ref([
  {
    id: 1,
    name: 'Kopi Arabica Premium 250g',
    quantity: 50,
    date: '3 Des 2024',
    hpp: 25000
  },
  {
    id: 2,
    name: 'Teh Hijau Organik 100g',
    quantity: 75,
    date: '2 Des 2024',
    hpp: 18000
  },
  {
    id: 3,
    name: 'Coklat Dark 70% 200g',
    quantity: 30,
    date: '1 Des 2024',
    hpp: 35000
  }
])

// Profit data
const profitData = ref({
  totalSales: 125000000,
  totalHPP: 78000000,
  netProfit: 47000000,
  margin: 37.6,
  thisMonth: 45200000,
  thisYear: 385000000
})

// Quick actions
const quickActions = ref([
  {
    name: 'Tambah Bahan',
    description: 'Input bahan baku',
    icon: BoxIcon,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-600',
    onClick: () => navigateTo('/materials')
  },
  {
    name: 'Tambah Packing',
    description: 'Input kemasan',
    icon: PackageIcon,
    iconBg: 'bg-blue-100',
    iconColor: 'text-blue-600',
    onClick: () => navigateTo('/packing')
  },
  {
    name: 'Hitung HPP',
    description: 'Kalkulasi biaya',
    icon: CalculatorIcon,
    iconBg: 'bg-purple-100',
    iconColor: 'text-purple-600',
    onClick: () => navigateTo('/production')
  },
  {
    name: 'Lihat Laporan',
    description: 'Analisis profit',
    icon: ChartIcon,
    iconBg: 'bg-yellow-100',
    iconColor: 'text-yellow-600',
    onClick: () => navigateTo('/reports')
  }
])

const navigateTo = (path: string) => {
  currentPath.value = path
  router.push(path)
}

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}

const formatDate = (date: Date) => {
  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(date)
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0
  }).format(value)
}
</script>