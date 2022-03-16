<script setup lang="ts">
const items = [
  { url: '/', label: 'Mehms', icon: 'heroicons-solid:home' },
  { url: '/submit', label: 'Einsenden', icon: 'heroicons-solid:plus-circle' },
  { url: '/contact', label: 'Kontakt', icon: 'heroicons-solid:mail' },
]
</script>

<template>
  <div class="w-full fixed bottom-0 bg-void-600 rounded-t-2xl md:hidden">
    <nav
      class="max-w-lg h-16 mx-auto flex justify-around text-gray-200"
    >
      <router-link v-for="item in items" :key="item.url" :to="item.url" class="flex items-center">
        <div>
          <div
            class="pill w-12 h-26px flex items-center justify-center text-gray-300"
          >
            <span class="iconify" :data-icon="item.icon" />
          </div>
          <div class="text-center text-xs font-medium pt-0.5">
            {{ item.label }}
          </div>
        </div>
      </router-link>
    </nav>
  </div>
</template>

<style scoped>
.router-link-active .pill {
  @apply rounded-2xl bg-root-100 !text-indigo-50;
}

.router-link-active {
  @apply text-indigo-100;
}
</style>
