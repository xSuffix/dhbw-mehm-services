<script setup lang="ts">
import { useGalleryStore } from '~/stores/gallery'
import mehms from '~/data/mehms.json'

const gallery = ref<HTMLDivElement>()

const store = useGalleryStore()

const loadMehmsFromJson = (amount: number) => {
  store.loadMehms(mehms.slice(0, amount), 304)
  mehms.splice(0, amount)
}

const handleScroll = () => {
  if (gallery.value && gallery.value.getBoundingClientRect().bottom - 128 < window.innerHeight) loadMehmsFromJson(24)
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  loadMehmsFromJson(24)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<template>
  <div ref="gallery" class="flex flex-wrap justify-start m-auto gap-2">
    <router-link v-for="mehm in store.loadedMehms" :key="mehm.id" :to="'/mehm/'+mehm.id" class="rounded border border-border-400" :style="{width: `${mehm.scale}px`, flexGrow: mehm.scale}">
      <img :src="mehm.src" :alt="mehm.title" :title="mehm.title" class="w-full rounded">
    </router-link>
    <div class="flex-grow-[99999] min-w-64" />
  </div>
</template>
