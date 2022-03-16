<script setup lang="ts">
const items = [
  { url: '/', label: 'Mehms', icon: 'heroicons-solid:home' },
  { url: '/submit', label: 'Einsenden', icon: 'heroicons-solid:plus-circle' },
  { url: '/contact', label: 'Kontakt', icon: 'heroicons-solid:mail' },
]
</script>

<template>
  <div class="w-full fixed bottom-0 bg-void-600 rounded-t-2xl md:hidden">
    <nav class="max-w-lg h-16 mx-auto flex justify-around text-gray-200">
      <router-link v-for="item in items" :key="item.url" :to="item.url" class="flex items-center">
        <div>
          <div class="pill w-50px h-26px flex items-center justify-center text-gray-300 rounded-2xl">
            <span class="iconify w-5 h-auto" :data-icon="item.icon" />
          </div>
          <div class="text-center text-xs font-medium pt-1">
            {{ item.label }}
          </div>
        </div>
      </router-link>
    </nav>
  </div>
  <div class="h-16" />
</template>

<style scoped>
.router-link-active .pill {
  @apply bg-void-100 !text-void-500;
}

.router-link-active {
  @apply text-indigo-100;
}
</style>
