<script setup lang="ts">
defineProps({
  mehms: Array,
})
</script>

<template>
  <div>
    {{ mehms }}
    <router-link v-for="mehm in mehms" :key="mehm.id" :to="'/mehm/'+mehm.id">
      d
    </router-link>
  </div>
</template>
