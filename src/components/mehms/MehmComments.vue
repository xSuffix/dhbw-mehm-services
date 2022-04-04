<script setup lang="ts">
import { toSvg } from 'jdenticon'
import { GATEWAY } from '~/composables/config'
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

const user = useUserStore()
const commentArea = ref<HTMLTextAreaElement>()
const editableComment = ref(0)

const userIconSize = 32
const endpoint = `${GATEWAY}/comments/`

const { data, execute } = useFetch<ApiComment>(`${endpoint}get/${props.id}`, {
  afterFetch(ctx) {
    ctx.data.forEach((comment: Comment) => {
      const date = Date.parse(`${comment.dateTime}Z`)
      comment.icon = toSvg(comment.author, userIconSize)
      comment.timeAgo = useTimeAgo(date).value
      comment.dateTime = new Date(date).toLocaleString()
    })
    ctx.data.reverse()
    return ctx
  },
}).get().json()

const postComment = () => {
  useFetch(`${endpoint}new`, {
    async beforeFetch({ options }) {
      options.headers = {
        ...options.headers,
        Credentials: 'include',
        Authorization: `Bearer ${user.jwt}`,
      }
      options.body = JSON.stringify({
        mehmId: props.id,
        comment: commentArea.value?.value,
      })

      return { options }
    },
    afterFetch(ctx) {
      execute()
      if (commentArea.value)
        commentArea.value.value = ''
      return ctx
    },
  }).post()
}

const deleteComment = (id: number) => {
  useFetch(`${endpoint}remove?commentId=${id}`, {
    async beforeFetch({ options }) {
      options.headers = {
        ...options.headers,
        Credentials: 'include',
        Authorization: `Bearer ${user.jwt}`,
      }
      return { options }
    },
    afterFetch(ctx) {
      execute()
      return ctx
    },
  }).post()
}

const enableEdit = (id: number) => {
  editableComment.value = id
}

const updateComment = (e: Event, commentId: number) => {
  const commentText = (e.target as HTMLHeadingElement).innerText
  useFetch(`${endpoint}update`, {
    async beforeFetch({ options }) {
      options.headers = {
        ...options.headers,
        Credentials: 'include',
        Authorization: `Bearer ${user.jwt}`,
      }
      options.body = JSON.stringify({
        id: commentId,
        text: commentText,
      })

      return { options }
    },
    afterFetch(ctx) {
      execute()
      return ctx
    },
  }).post()
}
</script>

<template>
  <div id="comments" class="paper p-4 flex flex-col gap-2">
    <router-link v-if="!user.jwt" to="/login" class="strong flex gap-1 items-center">
      <heroicons-solid:login />Melde dich an, um zu kommentieren
    </router-link>
    <div v-else class="flex flex-col gap-2">
      <p class="flex gap-1 items-center">
        <heroicons-solid:chat-alt /> Kommentiere als <router-link to="/user" class="strong">
          {{ user.name }}
        </router-link>
      </p>
      <textarea id="comment" ref="commentArea" name="comment" rows="6" class="box" />
      <button class="ml-auto bg-void-100 text-void-900 font-medium px-2 py-1 rounded mt-2" @click="postComment">
        Kommentieren
      </button>
    </div>
    <div class="flex flex-col gap-4">
      <div v-for="comment in data" :key="comment.id" class="grid grid-cols-[36px,1fr] gap-2 my-2">
        <a href=""><div class="bg-white rounded-1/2 p-2px" v-html="comment.icon" /></a>
        <div class="flex items-center whitespace-pre">
          <a href="" class="strong ml-2">{{ comment.author }}</a>
          <span :title="comment.dateTime" class="text-gray-400"> · {{ comment.timeAgo }}</span>
          <button v-if="comment.author === user.name || user.admin" class="ml-2" @click="deleteComment(comment.id)">
            <heroicons-solid:trash />
          </button>
          <button v-if="comment.author === user.name || user.admin" class="ml-2" @click="enableEdit(comment.id)">
            <heroicons-solid:pencil />
          </button>
        </div>
        <div class="w-1px bg-gray-400 mx-auto" />
        <p
          class="whitespace-pre-line rounded p-2 max-w-full" :class="{ editable: editableComment === comment.id }"
          :contenteditable="editableComment === comment.id" @input="updateComment($event, comment.id)" @blur="enableEdit(-1)"
        >
          {{ comment.comment.replace(/<br>/g, '\n').replace(/&lt;br&gt;/g, '<br>') }}
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.strong {
  @apply hover:underline;
}

.editable {
  @apply bg-void-700;
}
</style>
