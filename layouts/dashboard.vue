<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
    <!-- Header Section with Navbar (Now in Layout) -->
    <header class="bg-white dark:bg-gray-800 shadow dark:shadow-gray-900/50 sticky top-0 z-10 transition-colors duration-300">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <!-- Top Header -->
        <div class="py-6 sm:py-8 flex items-center justify-between gap-4">
          <div class="flex-1 min-w-0 flex items-center gap-6">
            <!-- App Logo -->
            <NuxtLink to="/" class="flex-shrink-0 flex items-center gap-2 group">
              <div class="w-10 h-10 bg-gradient-to-br from-blue-600 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:shadow-blue-500/30 transition-all duration-300">
                P
              </div>
              <span class="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700 dark:from-gray-100 dark:to-gray-300 hidden md:inline">ProfitMax</span>
            </NuxtLink>
            
            <!-- Divider -->
            <div class="h-8 w-px bg-gray-200 dark:bg-gray-700 hidden sm:block"></div>

            <!-- Page Title -->
            <div class="min-w-0">
              <h1 class="text-xl font-bold leading-tight text-gray-900 dark:text-gray-100 sm:text-2xl truncate">
                {{ currentHeader.title }}
              </h1>
              <p class="mt-1 text-xs sm:text-sm text-gray-500 dark:text-gray-400 truncate">
                {{ currentHeader.subtitle }}
                <span class="font-medium text-gray-900 dark:text-gray-100">{{ authStore.user?.name ? ' (' + authStore.user.name + ')' : '' }}</span>
              </p>
            </div>
          </div>
          <div class="flex-shrink-0 flex items-center gap-2">
            <ThemeToggle />
            <button
              class="inline-flex items-center px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-red-50 dark:hover:bg-red-900/20 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 dark:focus:ring-offset-gray-800 transition-colors whitespace-nowrap group"
              @click="handleLogout"
            >
              <svg class="h-4 w-4 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span class="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        
        <!-- Navigation Menu -->
        <nav class="flex space-x-1 border-t border-gray-200 dark:border-gray-700 ">
          <button
            v-for="menu in menuItems"
            :key="menu.path"
            :class="[
              'flex items-center px-4 py-3 text-sm font-medium border-b-2 transition-colors focus:outline-none',
              currentPath === menu.path || (currentPath === menu.path && menu.path !== '/')
                ? 'border-indigo-500 text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-600'
            ]"
            @click="navigateTo(menu.path)"
          >
            <component :is="menu.icon" class="h-5 w-5 mr-2" />
            {{ menu.name }}
          </button>
        </nav>
      </div>
    </header>

    <!-- Main Content Area (Slot for Page Content) -->
    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <slot />
    </main>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/authStore';
import { useRouter, useRoute } from 'vue-router';

// Nuxt hooks and Pinia store
const router = useRouter();
const route = useRoute();
const authStore = useAuthStore();

// Define Menu Items for the layout (can be moved to a configuration file if needed)

const menuItems = computed(() => [
  {
    name: 'Dashboard',
    path: '/home',
    title: 'Dashboard Inventori',
    subtitle: 'Selamat datang kembali di ringkasan inventaris Anda.',
    icon: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', class: 'h-5 w-5' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' })
    ])
  },
  {
    name: 'Bahan Baku',
    path: '/materials',
    title: 'Manajemen Bahan Baku',
    subtitle: 'Kelola semua daftar, stok, dan kebutuhan bahan mentah.',
    icon: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', class: 'h-5 w-5' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4' })
    ])
  },
  {
    name: 'Kemasan',
    path: '/packaging',
    title: 'Manajemen Kemasan',
    subtitle: 'Lacak persediaan, penerimaan, dan penggunaan bahan kemasan.',
    icon: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', class: 'h-5 w-5' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4' })
    ])
  },
  {
    name: 'Produk',
    path: '/product',
    title: 'Daftar Produk Jadi',
    subtitle: 'Informasi detail, harga, dan stok dari semua produk akhir.',
    icon: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', class: 'h-5 w-5' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z' })
    ])
  },
  {
    name: 'Produksi',
    path: '/production',
    title: 'Produksi & Perhitungan HPP',
    subtitle: 'Hitung maksimal produksi dan HPP produk dengan bantuan AI canggih.',
    icon: () => h('svg', { fill: 'none', stroke: 'currentColor', viewBox: '0 0 24 24', class: 'h-5 w-5' }, [
      h('path', { 'stroke-linecap': 'round', 'stroke-linejoin': 'round', 'stroke-width': '2', d: 'M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z' })
    ])
  }
]);

// Computed property to determine the active tab based on the current route
const currentPath = computed(() => {
  // Use route.path for exact matching or a more complex logic if nested routes are involved
  return route.path;
});

// Computed property to determine the active header content
const currentHeader = computed(() => {
  // Find the menu item that starts with the current route path
  // Sort by path length descending to prioritize longer, more specific matches
  const sortedItems = menuItems.value
    .slice()
    .sort((a, b) => b.path.length - a.path.length);

  const matchingItem = sortedItems.find(item => route.path.startsWith(item.path));

  return matchingItem || {
    title: 'Halaman Tidak Dikenal',
    subtitle: 'Periksa URL Anda atau kembali ke Dashboard.',
    path: '/'
  };
});

// Navigation handler
const navigateTo = (path) => {
  router.push(path);
};

// Logout handler
const handleLogout = () => {
  // In a real application, this would call authStore.logout()
  console.log('Logging out user...');
  authStore.logout();
  router.push('/login'); // Redirect to login page
};

// Placeholder for Pinia User (for demo purposes)
authStore.user = { name: 'Admin', email: 'admin@example.com' };

</script>