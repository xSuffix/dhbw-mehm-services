<script setup lang="ts">
import { GATEWAY } from '~/composables/config'

const router = useRouter()

const endpoint = `${GATEWAY}/user/signup`
const username = ref('')
const email = ref('')
const password = ref('')
const passwordRepeat = ref('')
const errorMessage = ref('')

const { execute } = useFetch(endpoint, {
  immediate: false,
  async beforeFetch({ options, cancel }) {
    options.headers = {
      ...options.headers,
      Credentials: 'include',
    }

    if (!username.value.trim().length || !password.value.trim().length) {
      errorMessage.value = 'Es wurden noch nicht alle Pflichtfelder befüllt'
      cancel()
    }

    if (password.value === '' || password.value !== passwordRepeat.value) {
      errorMessage.value = 'Passwörter stimmen nicht überein'
      cancel()
    }

    if (!/^\S+@\S+.[A-Za-z]+$/.test(email.value)) {
      errorMessage.value = 'Keine gültige Email Adresse'
      cancel()
    }

    options.body = JSON.stringify({
      username: username.value,
      mail: email.value,
      password: password.value,
      repeated: passwordRepeat.value,
    })

    return { options }
  },
  afterFetch(ctx) {
    router.push('/user')
    return ctx
  },
  onFetchError(ctx) {
    router.push('/user')
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
      Sign up to DHBW Mehms
    </h1>
    <p class="mb-12 text-center">
      Upload your own Mehms, like and comment your fav Mehms!
    </p>
    <div>
      <div class="flex flex-col my-4">
        <label for="user" class="font-medium py-1 required">Username</label>
        <input id="user" v-model="username" type="text" name="user" tabindex="1" class="box" required="true">
      </div>
      <div class="flex flex-col my-4">
        <label for="email" class="font-medium py-1 required">Email Address</label>
        <input id="email" v-model="email" type="email" name="email" tabindex="1" class="box" required="true">
      </div>
      <div class="flex flex-col mt-8 my-4">
        <label for="password" class="font-medium py-1 required">Password</label>
        <input id="password" v-model="password" type="password" name="password" tabindex="1" class="box" required="true">
      </div>
      <div class="flex flex-col my-4">
        <label for="repeat-password" class="font-medium py-1 required">Password wiederholen</label>
        <input id="repeat-password" v-model="passwordRepeat" type="password" name="repeat-password" tabindex="1" class="box" required="true">
      </div>
      <p class="text-root-100">
        {{ errorMessage }}
      </p>
      <button class="bg-void-100 text-void-900 font-bold w-full p-2 mt-4 rounded" @click="submit">
        Sign Up
      </button>
    </div>
  </div>
</template>
