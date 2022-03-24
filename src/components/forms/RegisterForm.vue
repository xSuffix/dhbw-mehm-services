<script setup lang="ts">

const endpoint = 'http://localhost:420/user/signup'
const user = ref('')
const email = ref('')
const password = ref('')
const passwordRepeat = ref('')

const request = computed(() => {
  return `${endpoint}`
})

const { execute } = useFetch(request, {
  async beforeFetch({ url, options, cancel }) {
    options.headers = {
      ...options.headers,
      Credentials: 'include',
    }

    if (password.value === '' || password.value !== passwordRepeat.value)
      cancel()

    options.body = JSON.stringify({
      username: user.value,
      mail: email.value,
      password: password.value,
      repeated: passwordRepeat.value,
    })

    return {
      options,
    }
  },
  afterFetch(ctx) {
    return ctx
  },
  immediate: false,
  onFetchError(ctx) {
    // console.log(ctx)
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
      Sign up to DHBW Mehms
    </h1>
    <p class="mb-12 text-center">
      Upload your own Mehms, like and comment your fav Mehms!
    </p>
    <div>
      <div class="flex flex-col my-4">
        <label for="user" class="font-medium py-1 required">Username</label>
        <input id="user" v-model="user" type="text" name="user" tabindex="1" class="box" required="true">
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
      <button class="bg-void-100 text-void-900 font-bold w-full p-2 mt-4 rounded" @click="submit">
        Sign In
      </button>
    </div>
  </div>
</template>
