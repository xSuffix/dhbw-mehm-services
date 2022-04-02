<script setup lang="ts">
defineProps({
  label: String,
  url: String,
  icon: {
    type: String,
    default: 'heroicons-solid:chevron-double-right',
  },
})
</script>

<template>
  <router-link :to="url" class="inline-flex mb-3 whitespace-pre text-gray-300">
    <span class="iconify mt-1 min-w-4 text-root-100" :data-icon="icon" />
    {{ label }}
  </router-link>
</template>
