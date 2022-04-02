<script setup lang="ts">
import { watch } from 'vue'
import { useGalleryStore } from '~/stores/gallery'

defineProps<{
  showFooter?: boolean
}>()

const store = useGalleryStore()
const { y } = useWindowScroll()

const gallery = ref<HTMLDivElement>()
const refetch = ref(true)
const mehmsPerRequest = 30

useGalleryStore().fetchMehms(mehmsPerRequest)

watch(y, () => {
  // Fetch on scroll to bottom
  if (refetch.value && gallery.value && gallery.value.getBoundingClientRect().bottom - 128 < window.innerHeight)
    useGalleryStore().fetchMehms(mehmsPerRequest)
})
</script>

<template>
  <div v-bind="$attrs" ref="gallery" class="flex flex-wrap justify-start m-auto gap-2">
    <router-link v-for="mehm in store.loadedMehms" :key="mehm.id" :to="'/mehm/'+mehm.id" class="paper" :style="{width: `${mehm.scale}px`, flexGrow: mehm.scale}">
      <img :src="mehm.imageSource" :alt="mehm.title" :title="mehm.title" class="w-full rounded filter transition-filter duration-200 saturate-92 dark:brightness-92 hover:(saturate-100 dark:brightness-100)">
    </router-link>
    <div class="flex-grow-[99999] min-w-64" />
  </div>
  <Footer v-if="showFooter && useGalleryStore().missingMehms" class="container mx-auto" />
</template>
