<script setup lang="ts">
import { GATEWAY } from '~/composables/config'
import { useUserStore } from '~/stores/user'

const router = useRouter()
const endpoint = `${GATEWAY}/user/login`

const username = ref('')
const password = ref('')
const errorMessage = ref('')

const { execute } = useFetch(endpoint, {
  immediate: false,
  async beforeFetch({ options, cancel }) {
    if (!username.value.trim().length || !password.value.trim().length) {
      errorMessage.value = 'Es wurden nicht alle Felder ausgefült'
      cancel()
    }

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

      // after logging in, return to previous page or home page
      if (window.history.state.back)
        router.back()
      else
        router.push('/')
    }
    return ctx
  },
  onFetchError(ctx) {
    errorMessage.value = ctx.data.message
    return ctx
  },
}).post().json()

const submit = () => {
  execute()
}
</script>

<template>
  <div class="paper max-w-2xl mx-auto p-4 lg:p-8 rounded">
    <h1 class="text-center">
      Sign in to DHBW Mehms
    </h1>
    <p class="mb-12 text-center">
      Upload your own Mehms, like and comment your fav Mehms!
    </p>
    <div>
      <div class="flex flex-col my-4">
        <label for="login" class="font-medium py-1 required">Username or Email Address</label>
        <input id="login" v-model="username" type="text" name="login" tabindex="1" class="box" required="true" @keyup.enter="submit">
      </div>
      <div class="flex flex-col my-4">
        <label for="password" class="font-medium py-1 required">Password</label>
        <input id="password" v-model="password" type="password" name="password" tabindex="2" class="box" required="true" @keyup.enter="submit">
      </div>
      <p class="text-root-100">
        {{ errorMessage }}
      </p>
      <button class="bg-void-100 text-void-900 font-bold w-full p-2 mt-4 rounded" tabindex="3" @click="submit">
        Sign In
      </button>
      <p class="mt-6">
        Du hast noch kein Konto? Registriere dich
        <router-link to="/register" class="strong underline" tabindex="4">
          hier
        </router-link>
      </p>
    </div>
  </div>
</template>
