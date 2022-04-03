<script setup lang="ts">
import { toSvg } from 'jdenticon'
import { useTimeAgo } from '@vueuse/core'
import mehms from '~/data/mehms.json'
import { GATEWAY } from '~/composables/config'
import { useUserStore } from '~/stores/user'
import { useGalleryStore } from '~/stores/gallery'

const props = defineProps<{
  id: number
  showFooter: boolean
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

const { t } = useI18n()
const user = useUserStore()
const gallery = useGalleryStore()
const router = useRouter()

const userIconSize = 40
const endpoint = `${GATEWAY}/mehms/`

const liked = ref(false)
const shared = ref(false)
const canEdit = ref(user.admin)

const { data, isFetching } = useFetch<ApiMehm>(`${endpoint}${props.id}`, {
  async beforeFetch({ options }) {
    options.headers = {
      ...options.headers,
      Credentials: 'include',
      Authorization: `Bearer ${user.jwt}`,
    }

    return {
      options,
    }
  },
  timeout: 200,
  afterFetch(ctx) {
    const date = Date.parse(`${ctx.data.createdDate}Z`)
    ctx.data.icon = toSvg(ctx.data.authorName, userIconSize)
    ctx.data.timeAgo = useTimeAgo(date).value
    ctx.data.createdDate = new Date(date).toLocaleString()
    liked.value = ctx.data.liked
    canEdit.value = ctx.data.authorName === user.name
    return ctx
  },
  onFetchError(ctx) {
    if (ctx.data === null) {
      ctx.data = mehms.find(mehm => mehm.id === props.id)
      ctx.data.icon = toSvg(ctx.data.authorName, userIconSize)
      ctx.data.timeAgo = useTimeAgo(Date.parse(`${ctx.data.createdDate}Z`)).value
    }

    return ctx
  },
}).get().json()

const likePost = () => {
  const { onFetchResponse } = useFetch(`${endpoint + props.id}/like`, {
    async beforeFetch({ url, options, cancel }) {
      options.headers = {
        ...options.headers,
        Credentials: 'include',
        Authorization: `Bearer ${user.jwt}`,
      }

      return {
        options,
      }
    },
  }).post()
  onFetchResponse((response) => {
    if (response.status === 200) {
      liked.value = !liked.value
      if (liked.value)
        data.value.likes++
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

const deletePost = () => {
  useFetch(`${endpoint}${props.id}/remove?id=${props.id}&userId=${user.id}`, {
    async beforeFetch({ options }) {
      options.headers = {
        ...options.headers,
        Credentials: 'include',
        Authorization: `Bearer ${user.jwt}`,
      }

      return { options }
    },
    afterFetch(ctx) {
      gallery.resetState()
      gallery.fetchMehms()
      router.push('/')
      return ctx
    },
  }).post()
}

const updateMehm = (e: Event, property: string) => {
  const body: any = {}
  body[property] = (e.target as HTMLHeadingElement).innerText
  useFetch(`${endpoint}${props.id}/update`, {
    async beforeFetch({ options }) {
      options.headers = {
        ...options.headers,
        Credentials: 'include',
        Authorization: `Bearer ${user.jwt}`,
      }
      options.body = JSON.stringify(body)

      return { options }
    },
  }).post()
}
</script>

<template>
  <div v-show="!isFetching" v-bind="$attrs" class="flex flex-col-reverse lg:flex-row lg:items-start gap-2">
    <div class="flex flex-col flex-grow flex-shrink basis-7/12 gap-2">
      <div class="flex justify-center">
        <img :src="data?.imageSource" :alt="data?.title" class="paper w-full max-h-3xl select-none object-contain">
      </div>
      <MehmComments :id="id" />
    </div>
    <aside class="lg:sticky paper top-16 flex-shrink basis-5/12 p-4 transition-top duration-200">
      <div class="flex gap-2 items-start">
        <div class="bg-white rounded" v-html="data?.icon" />
        <div class="text-sm">
          <div><a href="" class="strong">#{{ data?.genre }}</a></div>
          <div>{{ t('mehm.postedBy') }} <a href="" class="strong">{{ data?.authorName }}</a> <span :title="data?.createdDate">{{ data?.timeAgo }}</span></div>
        </div>
      </div>
      <h1 :contenteditable="canEdit" class="focus:bg-void-700" @input="updateMehm($event, 'title')">
        {{ data?.title }}
      </h1>
      <p class="my-4 focus:bg-void-700" :contenteditable="canEdit" @input="updateMehm($event, 'description')">
        {{ data?.description }}
      </p>
      <div class="flex flex-wrap gap-x-4 -ml-2">
        <button class="icon-btn" @click="likePost">
          <heroicons-solid:heart v-if="liked" class="text-root-100" /><heroicons-outline:heart v-else />{{ data?.likes }} {{ t('mehm.button.likes') }}
        </button>
        <a href="#comments" class="icon-btn"><heroicons-solid:chat-alt /> {{ t('mehm.button.comments') }}</a>
        <button v-if="isSupported" class="icon-btn" @click="sharePost">
          <heroicons-solid:share class="transition-colors duration-200" :class="{'text-void-100': shared}" /> {{ t('mehm.button.share') }}
        </button>
        <button v-if="canEdit" class="icon-btn" @click="deletePost">
          <heroicons-solid:trash /> {{ t('mehm.button.delete') }}
        </button>
      </div>
    </aside>
  </div>
  <Footer v-if="showFooter" v-show="!isFetching" class="container mx-auto" />
</template>

<style scoped>
.strong {
  @apply hover:underline;
}

.icon-btn {
  @apply flex gap-2 items-center p-2 font-medium hover:text-white;
}

.scrolling-up aside {
  @apply md:top-34;
}
</style>
