<script setup lang="ts">

import { useRouter } from 'vue-router'
import { useUserStore } from '~/stores/user'

const endpoint = 'http://localhost:420/user'
const router = useRouter()

function getCookieByName(name: string) {
  name += '='
  let ret = ''
  if (typeof document !== 'undefined') {
    const cookiesArray = document.cookie.split('; ')
    cookiesArray.forEach((val) => {
      if (val.indexOf(name) === 0) ret = val.substring(name.length)
    })
  }
  return ret
}

const { execute } = useFetch(`${endpoint}/logout`, {
  immediate: false,
  async beforeFetch({ url, options, cancel }) {
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
    console.log(ctx)
    return ctx
  },
}).get()

const logout = () => {
  execute()
}
const remove = () => {
  const { execute } = useFetch(`${endpoint}/delete`, {
    immediate: false,
    async beforeFetch({ url, options, cancel }) {
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
    <div>
      <button class="bg-void-100 text-void-900 font-bold w-full p-2 mt-4 rounded" @click="logout">
        Logout
      </button>
    </div>
    <p class="mb-12 text-center">
      Warning! Deleting your user can not be revoked! This is not hiding from FBI but vanishing completely!
    </p>
    <div>
      <button class="bg-void-100 text-void-900 font-bold w-full p-2 mt-4 rounded" @click="remove">
        Delete
      </button>
    </div>
  </div>
</template>
