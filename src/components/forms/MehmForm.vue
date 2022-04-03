<script setup lang="ts">
import { GATEWAY } from '~/composables/config'
import { useUserStore } from '~/stores/user'

const { t } = useI18n()
const user = useUserStore()
const endpoint = `${GATEWAY}/mehms/add`

const categoryOptions = ref([
  { text: t('category.programming'), value: 'PROGRAMMING' },
  { text: t('category.dhbw'), value: 'DHBW' },
  { text: t('category.others'), value: 'OTHER' },
])

const title = ref('')
const description = ref('')
const genre = ref('')
const image = ref()
const fileInput = ref()

const { execute } = useFetch(endpoint, {
  immediate: false,
  async beforeFetch({ options, cancel }) {
    if (!title.value || !description.value || !genre.value || !image.value)
      cancel()

    const formData = new FormData()
    formData.append('title', title.value)
    formData.append('description', description.value)
    formData.append('image', image.value)
    formData.append('genre', genre.value)

    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${user.jwt}`,
    }
    options.body = formData
  },
  onFetchError(ctx) {
    // TODO user feedback (optional)
    return ctx
  },
},
).post()

const setFile = () => {
  image.value = fileInput.value.files[0]
}

const formSubmit = (e: Event) => {
  e.preventDefault()
}

const submit = () => {
  execute()
}
</script>

<template>
  <form ref="form" class="paper max-w-2xl mx-auto p-8 rounded" enctype="multipart/form-data" @submit="formSubmit">
    <h1 class="text-center">
      Upload your Mehm
    </h1>
    <p class="mb-12 text-center">
      Make sure it's original and you are allowed to post it!
    </p>
    <div>
      <div class="flex flex-col my-4">
        <label for="title" class="font-medium py-1 required">Title</label>
        <input id="title" v-model="title" type="text" name="title" tabindex="1" class="box" required="true">
      </div>
      <div class="flex flex-col my-4">
        <label for="description" class="font-medium py-1 required">Description</label>
        <textarea id="description" v-model="description" name="description" rows="4" tabindex="2" class="box" required="true" />
      </div>
      <div class="flex flex-col my-4">
        <label for="image" class="font-medium py-1 required">Image</label>
        <input ref="fileInput" type="file" name="image" size="20000000" tabindex="3" required="true" accept="image/*" @change="setFile">
      </div>
      <div class="flex flex-col my-4">
        <label for="category" class="font-medium py-1 required">Category</label>
        <select id="category" v-model="genre" name="genre" tabindex="4" class="box" required="true">
          <option v-for="category in categoryOptions" :key="category.value" :value="category.value">
            {{ category.text }}
          </option>
        </select>
      </div>
      <button class="bg-void-100 text-void-900 font-bold w-full p-2 mt-4 rounded" tabindex="5" @click="submit">
        Submit
      </button>
    </div>
  </form>
</template>
