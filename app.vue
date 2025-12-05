<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
// Initialize theme saat app mount
const { initTheme } = useTheme()

onMounted(() => {
  initTheme()
})
</script>
