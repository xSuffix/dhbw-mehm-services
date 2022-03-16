<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  showSearch?: boolean
  showCategory?: boolean
  showOrder?: boolean
}>()

const { t } = useI18n()

const categorySelect = [
  t('category.all'), t('category.programming'), t('category.dhbw'), t('category.others'),
]

const sortSelect = [
  t('sort.date'), t('sort.likes'), t('sort.comments'),
]

const asc = ref(true)

const toggleOrder = () => {
  asc.value = !asc.value
}
</script>

<template>
  <div class="toolbar sticky top-2 flex flex-wrap gap-2 z-10 transition-top duration-200">
    <div v-if="showSearch" class="box flex-grow flex-shrink flex-300px">
      <heroicons-solid:search class="text-xl" />
      <input type="text" spellcheck="false" autocomplete="off" :placeholder="t('search.placeholder')" class="bg-transparent w-full p-1 outline-none">
    </div>

    <select v-if="showCategory" id="category" name="category" class="box flex-grow">
      <option v-for="category in categorySelect" :key="category" :value="category">
        {{ category }}
      </option>
    </select>

    <select v-if="showOrder" id="order" name="order" class="box flex-grow">
      <option v-for="sort in sortSelect" :key="sort" :value="sort">
        {{ sort }}
      </option>
    </select>

    <button v-if="showOrder" class="box" @click="toggleOrder()">
      <heroicons-solid:sort-ascending v-if="asc" />
      <heroicons-solid:sort-descending v-else />
    </button>
  </div>
</template>

<style scoped>
.box {
  @apply flex justify-center items-center p-2 min-w-42px min-h-42px rounded bg-void-600 border border-void-900 px-2 py-1;
}

.scrolling-up .toolbar {
  @apply md:top-20;
}
</style>
