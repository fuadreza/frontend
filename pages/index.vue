<template>
  <div class="flex flex-col items-center justify-center min-h-[80vh] text-center">
    <h1 class="text-5xl font-bold text-gray-900 mb-6">
      Welcome to NuxtApp
    </h1>
    <p class="text-xl text-gray-600 mb-8 max-w-2xl">
      A modern, performant web application built with Nuxt 3, Pinia, and Tailwind CSS.
    </p>
    <NuxtLink
      to="/login"
      class="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
    >
      Get Started
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: 'default',
})
</script>
