<script setup lang="ts">
import { computed } from 'vue'

const { t } = useI18n()

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

const setFile = () => {
  image.value = fileInput.value.files[0]
}

const endpoint = 'http://localhost:420/mehms/add'
const requestUrl = computed(() => {
  return `${endpoint}`
})

// const args = computed(() => {
//   return `?title=${title.value}&description=${description.value}&genre=${genre.value}&image=${image.value}`
// })

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

const { onFetchResponse, execute } = useFetch(requestUrl, {
  immediate: false,
  async beforeFetch({ options, cancel }) {
    if (!title.value || !description.value || !genre.value || !image.value) {
      // console.log('CANCEL')
      cancel()
    }
    const formData = new FormData()
    formData.append('title', title.value)
    formData.append('description', description.value)
    formData.append('image', image.value)
    formData.append('genre', genre.value)

    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${getCookieByName('jwt')}`,
    }
    options.body = formData
  },
  onFetchError(ctx) {
    // console.log(ctx)
    return ctx
  },
},
).post()

onFetchResponse((response) => {
  // console.log('res')
  // if (response.status === 200)
  // console.log('yay')
})

const formSubmit = (e: Event) => {
  e.preventDefault()
}

const submit = () => {
  // console.log(requestUrl.value)
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
        <input ref="fileInput" type="file" name="image" size="50000000" tabindex="3" required="true" accept="image/*" @change="setFile">
        <!-- <div class="box bg-void-700 h-64" @click="fileAccess.open()" @drop.prevent="dropFile">
          <heroicons-solid:upload class="h-24 w-24 text-void-500" />
        </div> -->
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
    <!-- <iframe id="target" name="target" /> -->
  </form>
</template>
