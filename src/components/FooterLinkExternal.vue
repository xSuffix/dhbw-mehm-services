<script setup lang="ts">
defineProps({
  label: String,
  url: String,
  icon: String,
})
</script>

<template>
  <a :href="url" class="whitespace-pre-wrap">
    <span class="iconify -mb-0.5" :data-icon="icon" />
    {{ label }}
  </a>
</template>
