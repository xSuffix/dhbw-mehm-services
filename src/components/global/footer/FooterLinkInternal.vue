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
  <router-link :to="url" class="whitespace-pre-wrap">
    <span class="iconify -mb-0.5" :data-icon="icon" />
    {{ label }}
  </router-link>
</template>
