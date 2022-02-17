<script setup lang="ts">
import { computed, ref } from 'vue'

const categorySelect = [
  'alle', 'Programmieren', 'DHBW', 'andere',
]

const sortSelect = [
  'Datum', 'Likes', 'Kommentare',
]

const asc = ref(true)

const toggleOrder = () => {
  asc.value = !asc.value
}
</script>

<template>
  <div class="flex flex-wrap gap-2">
    <div class="box flex-grow flex-shrink flex-300px">
      <heroicons-solid:search class="text-xl" />
      <input type="text" spellcheck="false" autocomplete="off" placeholder="Mehms suchen" class="bg-transparent w-full p-1 outline-none">
    </div>
    <select id="" name="" class="box">
      <option v-for="category in categorySelect" :key="category" :value="category">
        {{ category }}
      </option>
    </select>
    <select id="" name="" class="box">
      <option v-for="sort in sortSelect" :key="sort" :value="sort">
        {{ sort }}
      </option>
    </select>
    <button class="box" @click="toggleOrder()">
      <heroicons-solid:sort-ascending v-if="asc" />
      <heroicons-solid:sort-descending v-else />
    </button>
  </div>
</template>

<style scoped>
.box {
  @apply flex justify-center items-center p-2 min-w-42px min-h-42px rounded bg-blue-900 border border-border-400 px-2 py-1;
}
</style>
