<script setup lang="ts">
import { toSvg } from 'jdenticon'
import { GATEWAY } from '~/composables/config'
import { loggedIn } from '~/composables/auth'
import { useUserStore } from '~/stores/user'

const props = defineProps<{
  id: number
}>()

interface ApiComment {
  id: number
  comment: string
  author: string
  dateTime: string
}

interface Comment extends ApiComment {
  icon: string
  timeAgo: string
}

const user = useUserStore().user

const userIconSize = 32
const endpoint = `${GATEWAY}/comments/get/`

const { data } = useFetch<ApiComment>(`${endpoint}${props.id}`, {
  afterFetch(ctx) {
    ctx.data.forEach((comment: Comment) => {
      const date = Date.parse(comment.dateTime)
      comment.icon = toSvg(comment.author, userIconSize)
      comment.timeAgo = useTimeAgo(date).value
      comment.dateTime = new Date(date).toLocaleString()
    })
    ctx.data.reverse()
    return ctx
  },
}).get().json()
</script>

<template>
  <div id="comments" class="paper p-4 flex flex-col gap-4">
    <router-link v-if="!loggedIn()" to="/login" class="strong flex gap-1 items-center">
      <heroicons-solid:login />Melde dich an, um zu kommentieren
    </router-link>
    <div v-else class="flex flex-col gap-2">
      <p class="flex gap-1 items-center">
        <heroicons-solid:chat-alt /> Kommentiere als <router-link to="/user" class="strong">
          {{ user.name }}
        </router-link>
      </p>
      <textarea id="comment" name="comment" rows="6" class="box" />
      <button class="ml-auto bg-void-100 text-void-900 font-medium px-4 py-2 rounded mt-2">
        Kommentieren
      </button>
    </div>
    <div class="flex flex-col gap-4">
      <div v-for="comment in data" :key="comment.id" class="grid grid-cols-[36px,1fr] gap-x-4 gap-y-2 mb-4">
        <a href=""><div class="bg-white rounded-1/2 p-2px" v-html="comment.icon" /></a>
        <div class="flex items-center whitespace-pre">
          <a href="" class="strong">{{ comment.author }}</a><span :title="comment.dateTime" class="text-gray-400"> · {{ comment.timeAgo }}</span>
        </div>
        <div class="w-1px bg-gray-400 mx-auto" />
        <p>{{ comment.comment }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.strong {
  @apply hover:underline;
}
</style>
