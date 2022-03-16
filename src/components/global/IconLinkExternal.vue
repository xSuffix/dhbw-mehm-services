<script setup lang="ts">
defineProps({
  label: String,
  url: String,
  icon: String,
})
</script>

<template>
  <a :href="url" class="flex gap-1 mb-3 whitespace-pre dark:text-gray-300">
    <span class="iconify mt-1 min-w-6 text-void-100" :data-icon="icon" />
    {{ label }}
  </a>
</template>
