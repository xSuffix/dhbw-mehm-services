<script setup lang="ts">
import { GATEWAY } from '~/composables/config'
import { useUserStore } from '~/stores/user'

const router = useRouter()
const endpoint = `${GATEWAY}/user/login`

const username = ref('')
const password = ref('')

const { execute } = useFetch(endpoint, {
  async beforeFetch({ options }) {
    options.headers = {
      ...options.headers,
      Credentials: 'include',
    }

    options.body = JSON.stringify({
      id: username.value,
      password: password.value,
    })

    return { options }
  },
  afterFetch(ctx) {
    if (typeof document !== 'undefined') {
      const user = { id: ctx.data.id, name: ctx.data.username, email: ctx.data.email, admin: ctx.data.Admin }
      document.cookie = `${ctx.data.jwt.Name}=${ctx.data.jwt.Value}; expires=${new Date(Date.now() + 2 * 60 * 60 * 1000).toUTCString()}; path=/`
      localStorage.setItem('user', JSON.stringify(user))
      useUserStore().login(user)
      router.push('/')
    }
    return ctx
  },
  immediate: false,
  onFetchError(ctx) {
    return ctx
  },
}).post().json()

const submit = () => {
  execute()
}
</script>

<template>
  <div class="paper max-w-2xl mx-auto p-8 rounded">
    <h1 class="text-center">
      Sign in to DHBW Mehms
    </h1>
    <p class="mb-12 text-center">
      Upload your own Mehms, like and comment your fav Mehms!
    </p>
    <div>
      <div class="flex flex-col my-4">
        <label for="login" class="font-medium py-1 required">Username or Email Address</label>
        <input id="login" v-model="username" type="text" name="login" tabindex="1" class="box" required="true">
      </div>
      <div class="flex flex-col my-4">
        <label for="password" class="font-medium py-1 required">Password</label>
        <input id="password" v-model="password" type="password" name="password" tabindex="1" class="box" required="true">
      </div>
      <button class="bg-void-100 text-void-900 font-bold w-full p-2 mt-4 rounded" @click="submit">
        Sign In
      </button>
      <p class="mt-6">
        Du hast noch kein Konto? Registriere dich
        <router-link to="/register" class="strong underline">
          hier
        </router-link>
      </p>
    </div>
  </div>
</template>
