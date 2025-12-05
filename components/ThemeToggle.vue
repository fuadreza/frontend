<template>
  <button
    @click="toggleTheme"
    class="relative p-2.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-300 group"
    :aria-label="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
    title="Toggle theme"
  >
    <!-- Sun Icon (Light Mode) -->
    <svg
      v-show="!isDark"
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5 text-yellow-500 transition-transform duration-300 group-hover:rotate-45"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
      />
    </svg>

    <!-- Moon Icon (Dark Mode) -->
    <svg
      v-show="isDark"
      xmlns="http://www.w3.org/2000/svg"
      class="h-5 w-5 text-blue-400 transition-transform duration-300 group-hover:-rotate-12"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-width="2"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
      />
    </svg>

    <!-- Ripple effect on click -->
    <span class="absolute inset-0 rounded-full bg-gradient-to-r from-yellow-400 to-blue-500 opacity-0 group-active:opacity-20 transition-opacity duration-200"></span>
  </button>
</template>

<script setup lang="ts">
const { theme, toggleTheme, isDark, initTheme } = useTheme()

// Initialize theme saat component mount
onMounted(() => {
  initTheme()
})
</script>

<style scoped>
/* Smooth transition untuk semua perubahan warna */
button {
  transition: background-color 0.3s ease, transform 0.2s ease;
}

button:active {
  transform: scale(0.95);
}

/* Animasi fade in/out untuk icon */
svg {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.8);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
