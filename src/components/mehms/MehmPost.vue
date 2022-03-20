<script setup lang="ts">
import { toSvg } from 'jdenticon'
import mehms from '~/data/mehms.json'

const props = defineProps<{
  id: number
}>()

interface ApiMehm {
  authorName: string
  title: string
  description: string
  imageSource: string
  createdDate: Array<number>
  genre: string
  likes: number
  liked: boolean
}

const liked = ref(false)
const shared = ref(false)
const endPointMehm = 'http://84.163.89.2:8080/mehms/'

const { data } = useFetch<ApiMehm>(`${endPointMehm}get/${props.id}`, {
  timeout: 200,
  afterFetch(ctx) {
    ctx.data.icon = toSvg(ctx.data.authorName, 40)
    liked.value = ctx.data.liked
    return ctx
  },
  onFetchError(ctx) {
    if (ctx.data === null) {
      ctx.data = mehms.find(mehm => mehm.id === props.id)
      ctx.data.icon = toSvg(ctx.data.authorName, 40)
    }

    return ctx
  },
}).get().json()

// ...

const likePost = () => {
  const { onFetchResponse } = useFetch(`${endPointMehm + props.id}/like?userId=1`).post()
  onFetchResponse((response) => {
    if (response.status === 200) {
      liked.value = !liked.value
      if (liked.value) data.value.likes++
      else data.value.likes--
    }
  })
}

const { share, isSupported } = useShare()
const sharePost = () => {
  shared.value = true
  share({
    title: data.value?.title,
    text: data.value?.description,
    url: location.href.split('#')[0],
  })
}
</script>

<template>
  <div class="flex flex-col-reverse lg:flex-row lg:items-start gap-4">
    <div v-cloak class="flex flex-col flex-grow flex-shrink basis-7/12">
      <div class="flex justify-center">
        <img :src="data?.imageSource" :alt="data?.title" class="paper w-full max-h-3xl select-none object-contain">
      </div>
    </div>
    <aside v-cloak class="paper flex-shrink basis-5/12 p-4">
      <div class="flex gap-2 items-start">
        <div class="bg-white rounded" v-html="data?.icon" />
        <div class="text-sm">
          <div><a href="" class="strong">#{{ data?.genre }}</a></div>
          <div>Gepostet von <a href="" class="strong">{{ data?.authorName }}</a> vor 2 Tagen</div>
        </div>
      </div>
      <h1>
        {{ data?.title }}
      </h1>
      <p class="my-4">
        {{ data?.description }}
      </p>
      <div class="flex flex-wrap gap-x-4 -ml-2">
        <button class="icon-btn" @click="likePost()">
          <heroicons-solid:heart v-if="liked" class="text-root-100" /><heroicons-outline:heart v-else />{{ data?.likes }} Likes
        </button>
        <a href="#comments" class="icon-btn"><heroicons-solid:chat-alt />0 Kommentare</a>
        <button v-if="isSupported" class="icon-btn" @click="sharePost()">
          <heroicons-solid:share class="transition-colors duration-200" :class="{'text-void-100': shared}" />Teilen
        </button>
      </div>
    </aside>
  </div>
</template>

<style scoped>
.strong {
  @apply hover:underline;
}

.icon-btn {
  @apply flex gap-2 items-center p-2 font-medium hover:text-white;
}
</style>
