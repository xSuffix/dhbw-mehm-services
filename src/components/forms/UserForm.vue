<script setup lang="ts">
import { useRouter } from 'vue-router'
import { toSvg } from 'jdenticon'
import { useUserStore } from '~/stores/user'
import { getCookieByName } from '~/composables/auth'
import { GATEWAY } from '~/composables/config'

const endpoint = `${GATEWAY}/user`
const router = useRouter()

const user = useUserStore().user
const userIcon = toSvg(user.name, 48)
const userRole = computed(() => user.admin ? 'Admin' : 'User')

const { execute } = useFetch(`${endpoint}/logout`, {
  immediate: false,
  async beforeFetch({ options }) {
    options.headers = {
      ...options.headers,
      Credentials: 'include',
      Authorization: `Bearer ${getCookieByName('jwt')}`,
    }
    return {
      options,
    }
  },
  afterFetch(ctx) {
    const cookie = JSON.parse(ctx.data)
    if (typeof document !== 'undefined')
      document.cookie = `${cookie.Name}=${cookie.Value}; expires=${new Date(Date.now() - 60 * 60 * 1000)}; path=/`

    router.push('/login')
    router.forward()
    return ctx
  },
  onFetchError(ctx) {
    // TODO Feedback to user if logout fails (optional)
    return ctx
  },
}).get()

const logout = () => {
  execute()
}

const remove = () => {
  const { execute } = useFetch(`${endpoint}/delete`, {
    immediate: false,
    async beforeFetch({ options }) {
      options.headers = {
        ...options.headers,
        Credentials: 'include',
        Authorization: `Bearer ${getCookieByName('jwt')}`,
      }
      options.body = JSON.stringify({
        id: `${useUserStore().user.id}`,
      })

      return { options }
    },
    afterFetch(ctx) {
      if (typeof document !== 'undefined')
        document.cookie = `${ctx.data.Name}=${ctx.data.Value}; expires=${new Date(Date.now() - 60 * 60 * 1000)}; path=/`
      router.push('/')
      router.forward()
      return ctx
    },
    onFetchError(ctx) {
      return ctx
    },
  }).post().json()

  execute()
}
</script>

<template>
  <div class="paper max-w-2xl mx-auto p-8 rounded">
    <h1 class="text-center">
      My user profile
    </h1>
    <p class="mb-12 text-center">
      Time to brush your eyes? No problem, we do forgive your sins, son.
    </p>
    <div class="flex">
      <div class="flex gap-3 items-start">
        <div class="bg-white rounded" v-html="userIcon" />
        <div>
          <div class="strong font-medium">
            [{{ userRole }}] {{ user.name }}
          </div>
          <div>{{ user.email }}</div>
        </div>
      </div>
    </div>
    <div>
      <button class="bg-void-100 text-void-900 font-bold w-full p-2 mt-4 rounded" @click="logout">
        Logout
      </button>
    </div>
    <details class="mt-8">
      <summary class="select-none">
        Danger Zone
      </summary>
      <div class="my-4">
        <p class="text-xl strong">
          Warning! Deleting your user account can not be revoked!
        </p>
        <p>This is not hiding from FBI but vanishing completely!</p>
      </div>
      <button class="bg-root-100 text-root-900 font-bold w-full p-2 mt-4 rounded" @click="remove">
        Delete
      </button>
    </details>
  </div>
</template>
