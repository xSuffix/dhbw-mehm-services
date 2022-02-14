<script setup lang="ts">
defineProps({
  href: String,
  src: String,
  alt: String,
  imgClass: {
    type: String,
    default: 'w-8',
  },
})
</script>

<template>
  <a :href="href" target="_blank" rel="noopener" class="bg-white flex justify-center h-36px w-36px rounded-1/2">
    <img :src="src" :alt="alt" :class="imgClass"></a>
</template>
