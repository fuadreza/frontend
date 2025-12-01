<template>
  <div class="bg-white shadow overflow-hidden sm:rounded-lg">
    <div class="px-4 py-5 sm:px-6">
      <h3 class="text-lg leading-6 font-medium text-gray-900">
        User Dashboard
      </h3>
      <p class="mt-1 max-w-2xl text-sm text-gray-500">
        Welcome back, {{ authStore.user?.name }}!
      </p>
    </div>
    <div class="border-t border-gray-200 px-4 py-5 sm:p-0">
      <dl class="sm:divide-y sm:divide-gray-200">
        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">
            Email address
          </dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {{ authStore.user?.email }}
          </dd>
        </div>
        <div class="py-4 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
          <dt class="text-sm font-medium text-gray-500">
            API Base URL
          </dt>
          <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
            {{ config.public.apiBaseUrl }}
          </dd>
        </div>
      </dl>
    </div>
    <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
      <button
        @click="handleLogout"
        class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
      >
        Logout
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const authStore = useAuthStore()
const router = useRouter()
const config = useRuntimeConfig()

definePageMeta({
  layout: 'default',

})

// Simple auth check
if (!authStore.isAuthenticated) {
  router.push('/login')
}

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}
</script>
