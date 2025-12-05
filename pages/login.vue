<template>
  <div class="min-h-screen flex font-sans text-gray-900 dark:text-gray-100 transition-colors duration-300">
    <!-- Left Section: Login Form -->
    <div class="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-20 xl:px-24 bg-white dark:bg-gray-900 transition-colors duration-300">
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <!-- Logo & Theme Toggle -->
        <div class="mb-10 flex items-center justify-between">
          <span class="text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">MaxPro</span>
          <ThemeToggle />
        </div>

        <div>
          <h2 class="mt-6 text-3xl font-bold text-gray-900 dark:text-gray-100">
            Sign up with your email
          </h2>
          <p class="mt-2 text-sm text-gray-600 dark:text-gray-400">
            Join our platform and unlock your potential.
          </p>
        </div>

        <div class="mt-8">
          <form class="space-y-6" @submit.prevent="handleLogin">
            <div>
              <label for="email" class="sr-only">Email address</label>
              <div class="mt-1">
                <input
                  id="email"
                  v-model="email"
                  name="email"
                  type="email"
                  autocomplete="email"
                  required
                  class="appearance-none block w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm placeholder-gray-400 dark:placeholder-gray-500 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm transition-colors duration-200"
                  placeholder="you@example.com"
                >
              </div>
            </div>

            <div>
              <button
                type="submit"
                class="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-indigo-600 hover:bg-indigo-700 dark:bg-indigo-500 dark:hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-900 transition duration-150 ease-in-out"
              >
                Continue
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>

    <!-- Right Section: Benefits List -->
    <div class="hidden lg:flex flex-1 bg-gray-50 dark:bg-gray-800 relative overflow-hidden items-center justify-center transition-colors duration-300">
        <div class="relative z-10 px-12 max-w-lg">
            <p class="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-2">Your Only</p>
            <h2 class="text-4xl font-extrabold mb-12 leading-tight">
                <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400">
                    AI Business Assistant
                </span>
            </h2>
            
            <ul class="space-y-6">
                <li v-for="(benefit, index) in benefits" :key="index" class="flex items-start group">
                    <div class="flex-shrink-0 mt-1">
                        <!-- Checkmark Icon -->
                        <svg class="h-6 w-6 text-green-500 dark:text-green-400 group-hover:scale-110 transition-transform duration-200" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path class="fill-green-500 dark:fill-green-400" fill-rule="evenodd" clip-rule="evenodd" d="M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12ZM16.0303 8.96967C16.3232 9.26256 16.3232 9.73744 16.0303 10.0303L11.0303 15.0303C10.7374 15.3232 10.2626 15.3232 9.96967 15.0303L7.96967 13.0303C7.67678 12.7374 7.67678 12.2626 7.96967 11.9697C8.26256 11.6768 8.73744 11.6768 9.03033 11.9697L10.5 13.4393L12.7348 11.2045L14.9697 8.96967C15.2626 8.67678 15.7374 8.67678 16.0303 8.96967Z" fill="#1C274C"/>
                        </svg>
                    </div>
                    <p class="ml-4 text-lg text-gray-700 dark:text-gray-300 font-medium">{{ benefit }}</p>
                </li>
            </ul>
        </div>
        
        <!-- Subtle decorative circle -->
        <div class="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-50 dark:bg-blue-900/20 opacity-50 blur-3xl"/>
        <div class="absolute bottom-0 left-0 -ml-20 -mb-20 w-96 h-96 rounded-full bg-purple-50 dark:bg-purple-900/20 opacity-50 blur-3xl"/>
    </div>
  </div>
</template>

<script setup lang="ts">
const email = ref('')
const authStore = useAuthStore()
const router = useRouter()

const benefits = [
    "Automate repetitive tasks",
    "Gain deeper insights",
    "Boost team productivity",
    "24/7 support availability"
]

definePageMeta({
  layout: false,
})

const handleLogin = () => {
  if (!email.value) return
  authStore.login(email.value)
  router.push('/home')
}
</script>
