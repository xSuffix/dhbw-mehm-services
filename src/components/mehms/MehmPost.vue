<script setup lang="ts">
import mehms from '~/data/mehms.json'

const props = defineProps<{
  id: string
}>()

const mehm = mehms.find(mehm => mehm.id === props.id)

</script>

<template>
  <div class="flex flex-row items-start gap-4">
    <div class="flex flex-col flex-grow flex-shrink basis-7/12">
      <div class="flex justify-center">
        <img :src="mehm?.src" :alt="mehm?.title" class="w-full max-h-3xl select-none">
      </div>
    </div>
    <aside class="flex flex-shrink basis-5/12">
      <h1>{{ mehm?.title }}</h1>
      <p>{{ mehm?.description }}</p>
    </aside>
  </div>
</template>
