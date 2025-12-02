<template>
  <div class="h-full p-8 bg-gray-50 rounded-2xl border border-gray-100 flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
    <blockquote class="mb-6">
      <p class="text-lg font-medium italic text-gray-800 leading-relaxed">
        "{{ quote }}"
      </p>
    </blockquote>
    <div class="border-t border-gray-200 pt-6">
      <div class="font-bold text-gray-900 text-lg">{{ author }}</div>
      <div class="text-blue-600 text-sm font-medium">{{ handle }}</div>
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
