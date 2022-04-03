<script setup lang="ts">
import { ref } from 'vue'
import { useGalleryStore } from '~/stores/gallery'

defineProps<{
  showSearch?: boolean
  showCategory?: boolean
  showOrder?: boolean
}>()

const { t } = useI18n()
const store = useGalleryStore()
const router = useRouter()

const categoryOptions = ref([
  { text: t('category.all'), value: '' },
  { text: t('category.programming'), value: 'PROGRAMMING' },
  { text: t('category.dhbw'), value: 'DHBW' },
  { text: t('category.others'), value: 'OTHER' },
])

const orderOptions = ref([
  { text: t('order.date'), value: 'createdDate' },
  { text: t('order.likes'), value: 'likes' },
])

const changeSearch = (e: Event) => {
  store.setSearch((e.target as HTMLInputElement).value)
  store.fetchMehms()
  router.push('/')
}

const changeCategory = (e: Event) => {
  store.setCategory((e.target as HTMLInputElement).value)
  store.fetchMehms()
  router.push('/')
}

const changeOrder = (e: Event) => {
  store.setOrder((e.target as HTMLInputElement).value)
  store.fetchMehms()
  router.push('/')
}

const toggleOrder = () => {
  store.setAsc(!store.asc)
  store.fetchMehms()
  router.push('/')
}
</script>

<template>
  <div class="toolbar sticky top-2 flex flex-wrap gap-2 z-10 transition-top duration-200">
    <div v-if="showSearch" class="box flex-grow-[4] flex-shrink flex-300px">
      <label for="mehm-search"><heroicons-solid:search class="text-xl transition-colors duration-200" /></label>
      <input
        id="mehm-search" type="text" spellcheck="false" autocomplete="off" :placeholder="t('search.placeholder')"
        class="bg-transparent w-full p-1 outline-none select-none" :value="store.search" @change="changeSearch"
      >
    </div>

    <select v-if="showCategory" id="category" name="category" class="box flex-grow" @change="changeCategory">
      <option v-for="option in categoryOptions" :key="option.value" :value="option.value" :selected="store.category === option.value">
        {{ option.text }}
      </option>
    </select>

    <select v-if="showOrder" id="order" name="order" class="box flex-grow" @change="changeOrder">
      <option v-for="option in orderOptions" :key="option.value" :value="option.value" :selected="store.order === option.value">
        {{ option.text }}
      </option>
    </select>

    <button v-if="showOrder" class="box" @click="toggleOrder">
      <heroicons-solid:sort-ascending v-if="store.asc" />
      <heroicons-solid:sort-descending v-else />
    </button>
  </div>
</template>

<style scoped>
.scrolling-up .toolbar {
  @apply md:top-20;
}
</style>
