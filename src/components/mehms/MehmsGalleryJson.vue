<script setup lang="ts">
import { watch } from 'vue'
import { useWindowScroll } from '@vueuse/core'
import { useGalleryStore } from '~/stores/gallery'
import mehms from '~/data/mehms.json'

defineProps<{
  showFooter?: boolean
}>()

const store = useGalleryStore()
const { y } = useWindowScroll()

const gallery = ref<HTMLDivElement>()
const loadMehms = ref(true)

const loadMehmsFromJson = (amount: number) => {
  store.loadMehms(mehms.slice(0, amount), 304)
  mehms.splice(0, amount)
  loadMehms.value = mehms.length !== 0
}

onMounted(() => {
  loadMehmsFromJson(24)
})

watch(y, () => {
  if (gallery.value && gallery.value.getBoundingClientRect().bottom - 128 < window.innerHeight) loadMehmsFromJson(24)
})
</script>

<template>
  <div v-bind="$attrs" ref="gallery" class="flex flex-wrap justify-start m-auto gap-2">
    <router-link v-for="mehm in store.loadedMehms" :key="mehm.id" :to="'/mehm/'+mehm.id" class="rounded border border-void-900" :style="{width: `${mehm.scale}px`, flexGrow: mehm.scale}">
      <img :src="mehm.src" :alt="mehm.title" :title="mehm.title" class="w-full rounded filter transition-filter duration-200 saturate-92 hover:saturate-100 dark:brightness-92 dark:hover:brightness-100">
    </router-link>
    <div class="flex-grow-[99999] min-w-64" />
  </div>
  <Footer v-if="showFooter && !loadMehms" class="container mx-auto" />
</template>
