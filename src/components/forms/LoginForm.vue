<script setup lang="ts">
import { computed } from 'vue'
const endpoint = 'http://localhost:8080/user/login'

const user = ref('')
const password = ref('')

const request = computed(() => {
  return `${endpoint}?ìd=${user.value}&password=${password.value}`
})

const { onFetchResponse, execute } = useFetch(request, {
  immediate: false,
  onFetchError(ctx) {
    console.log(ctx)
    return ctx
  },
}).post()

onFetchResponse((response) => {
  console.log(response.status)
})

const submit = () => {
  console.log(`args ${user.value}`)
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
        <input id="login" v-model="user" type="text" name="login" tabindex="1" class="box" required="true">
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
