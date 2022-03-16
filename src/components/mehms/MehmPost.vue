<script setup lang="ts">
import { toSvg } from 'jdenticon'
import { useShare } from '@vueuse/core'
import mehms from '~/data/mehms.json'

const props = defineProps<{
  id: string
}>()

const mehm = mehms.find(mehm => mehm.id === props.id)
const icon = toSvg('blah', 40)

const liked = ref(false)
const shared = ref(false)

const { share, isSupported } = useShare()
const sharePage = () => {
  shared.value = true
  share({
    title: mehm?.title,
    text: mehm?.description,
    url: location.href,
  })
}
</script>

<template>
  <div class="flex flex-col-reverse lg:flex-row lg:items-start gap-4">
    <div class="flex flex-col flex-grow flex-shrink basis-7/12">
      <div class="flex justify-center">
        <img :src="mehm?.src" :alt="mehm?.title" class="paper w-full max-h-3xl select-none">
      </div>
    </div>
    <aside class="paper flex-shrink basis-5/12 p-4">
      <div class="flex gap-2 items-start">
        <div class="bg-white rounded" v-html="icon" />
        <div class="text-sm">
          <div><a href="" class="highlight">#Programmieren</a></div>
          <div>Gepostet von <a href="" class="highlight">Kapitän zur See</a> vor 2 Tagen</div>
        </div>
      </div>
      <h1 class="text-2xl font-bold my-6">
        {{ mehm?.title }}
      </h1>
      <p class="my-4">
        {{ mehm?.description }}
      </p>
      <div class="flex flex-wrap gap-x-4 -ml-2">
        <button class="icon-btn">
          <heroicons-solid:heart v-if="liked" /><heroicons-outline:heart v-else />0 Likes
        </button>
        <a href="#comments" class="icon-btn"><heroicons-solid:chat-alt />0 Kommentare</a>
        <button v-if="isSupported" class="icon-btn" @click="sharePage()">
          <heroicons-solid:share :class="{'text-void-100': shared}" />Teilen
        </button>
      </div>
    </aside>
  </div>
</template>

<style scoped>
.paper {
  @apply rounded border border-void-900 bg-void-500 bg-opacity-90 backdrop-filter backdrop-blur-sm;
}

.highlight {
  @apply text-white hover:underline;
}

.icon-btn {
  @apply flex gap-2 items-center p-2 font-medium hover:text-white;
}
</style>
