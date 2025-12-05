<template>
  <div class="h-full p-8 bg-gray-50 dark:bg-gray-700 rounded-2xl border border-gray-100 dark:border-gray-600 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
    <blockquote class="mb-6">
      <p class="text-lg font-medium italic text-gray-800 dark:text-gray-200 leading-relaxed">
        "{{ quote }}"
      </p>
    </blockquote>
    <div class="border-t border-gray-200 dark:border-gray-600 pt-6">
      <div class="font-bold text-gray-900 dark:text-gray-100 text-lg">{{ author }}</div>
      <div class="text-blue-600 dark:text-blue-400 text-sm font-medium">{{ handle }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  quote: string
  author: string
  handle: string
}>()
</script>
