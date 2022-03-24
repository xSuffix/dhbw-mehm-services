<script setup lang="ts">
import { watch } from 'vue'
import { useGalleryStore } from '~/stores/gallery'
import mehms from '~/data/mehms.json'

defineProps<{
  showFooter?: boolean
}>()

interface ApiMehm {
  id: number
  title: string
  imageSource: string
}

const store = useGalleryStore()
const { y } = useWindowScroll()

const gallery = ref<HTMLDivElement>()
const refetch = ref(true)

const endPointMehms = 'http://localhost:8080/mehms'
const mehmsPerRequest = 30
const requestUrl = ref(`${endPointMehms}?skip=${store.loadedMehms.length}&take=${mehmsPerRequest}`)

const loadMehms = (mehms: ApiMehm[]) => {
  if (mehms)
    store.loadMehms(mehms, 304)

  refetch.value = mehmsPerRequest <= mehms.length
}

useFetch(requestUrl, {
  refetch: refetch.value,
  timeout: 200,
  beforeFetch({ cancel }) {
    if (store.loadedMehms.length % mehmsPerRequest !== 0) {
      refetch.value = false
      cancel()
    }
  },
  afterFetch(ctx) {
    loadMehms(ctx.data.mehms)
    return ctx
  },
  onFetchError(ctx) {
    if (ctx.data === null)
      ctx.data = { mehms: mehms.slice(store.loadedMehms.length, store.loadedMehms.length + mehmsPerRequest) }

    loadMehms(ctx.data.mehms)
    return ctx
  },

}).get().json()

watch(y, () => {
  // Fetch on scroll to bottom
  if (refetch.value && gallery.value && gallery.value.getBoundingClientRect().bottom - 128 < window.innerHeight)
    requestUrl.value = `${endPointMehms}?skip=${store.loadedMehms.length}&take=${mehmsPerRequest}`
})
</script>

<template>
  <div v-bind="$attrs" ref="gallery" class="flex flex-wrap justify-start m-auto gap-2">
    <router-link v-for="mehm in store.loadedMehms" :key="mehm.id" :to="'/mehm/'+mehm.id" class="paper" :style="{width: `${mehm.scale}px`, flexGrow: mehm.scale}">
      <img :src="mehm.imageSource" :alt="mehm.title" :title="mehm.title" class="w-full rounded filter transition-filter duration-200 saturate-92 dark:brightness-92 hover:(saturate-100 dark:brightness-100)">
    </router-link>
    <div class="flex-grow-[99999] min-w-64" />
  </div>
  <Footer v-if="showFooter && !refetch" class="container mx-auto" />
</template>
