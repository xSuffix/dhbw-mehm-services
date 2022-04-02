import { defineStore } from 'pinia'
import { GATEWAY } from '~/composables/config'
import mehms from '~/data/mehms.json'

interface ApiMehm {
  id: number
  title: string
  imageSource: string
}

interface LoadedMehm extends ApiMehm {
  scale: number
}

const endpoint = `${GATEWAY}/mehms`
const requestUrl = ref('')
const mehmsPerRequest = ref(10)

const { execute, onFetchError, onFetchResponse } = useFetch(requestUrl, {
  immediate: false,
  timeout: 200,
  // afterFetch(ctx) {
  //   loadMehms(ctx.data.mehms)
  //   return ctx
  // },
  // onFetchError(ctx) {
  //   if (ctx.data === null)
  //     ctx.data = { mehms: mehms.slice(store.loadedMehms.length, store.loadedMehms.length + mehmsPerRequest) }

  //   loadMehms(ctx.data.mehms)
  //   return ctx
  // },
}).get().json()

export const useGalleryStore = defineStore('gallery', {
  state: () => {
    return {
      loadedMehms: ref<Array<LoadedMehm>>([]),
    }
  },
  actions: {
    loadMehms(mehms: Array<ApiMehm>, minHeight: number) {
      mehms.forEach((mehm: any) => {
        const img = new Image()
        img.src = mehm.imageSource
        img.onload = () => {
          mehm.scale = img.width / img.height * minHeight
          this.loadedMehms.push(mehm)
        }
      })
    },
    fetchMehms(amount: number) {
      mehmsPerRequest.value = amount
      requestUrl.value = `${endpoint}?skip=${this.loadedMehms.length}&take=${amount}`
      execute()
    },
  },
})

onFetchResponse((response) => {
  console.log(response)
  // loadMehms(ctx.data.mehms)
})

onFetchError((error) => {
  console.log(error)
  const store = useGalleryStore()
  store.loadMehms(mehms.slice(store.loadedMehms.length, store.loadedMehms.length + mehmsPerRequest.value), 304)
  // if (ctx.data === null)
  //   ctx.data = { mehms: mehms.slice(store.loadedMehms.length, store.loadedMehms.length + mehmsPerRequest) }

  // loadMehms(ctx.data.mehms)
})
