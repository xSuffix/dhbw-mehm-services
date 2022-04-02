import { defineStore } from 'pinia'
import { GATEWAY } from '~/composables/config'
import jsonMehms from '~/data/mehms.json'

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

export const useGalleryStore = defineStore('gallery', {
  state: () => {
    return {
      loadedMehms: ref<Array<LoadedMehm>>([]),
      amountFetched: ref(0),
      missingMehms: ref(false),
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
      if (!this.missingMehms) {
        mehmsPerRequest.value = amount
        requestUrl.value = `${endpoint}?skip=${this.amountFetched}&take=${amount}`
      }
    },
  },
})

useFetch(requestUrl, {
  refetch: true,
  immediate: false,
  timeout: 200,
  afterFetch(ctx) {
    const mehms = ctx.data.mehms
    useGalleryStore().amountFetched += mehms.length
    useGalleryStore().loadMehms(mehms, 288)
    const requestedAmount = parseInt((new URLSearchParams(ctx.response.url).get('take') || '0'))
    if (!mehms || mehms.length < requestedAmount)
      useGalleryStore().missingMehms = true
    return ctx
  },
  onFetchError(ctx) {
    const store = useGalleryStore()
    const mehmsFromJson = jsonMehms.slice(store.amountFetched, store.amountFetched + mehmsPerRequest.value)
    useGalleryStore().amountFetched += mehmsFromJson.length
    store.loadMehms(mehmsFromJson, 288)
    if (mehmsFromJson.length < mehmsPerRequest.value)
      useGalleryStore().missingMehms = true
    return ctx
  },
}).get().json()
