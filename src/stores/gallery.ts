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

const imageSize = 288
const endpoint = `${GATEWAY}/mehms`

// private state
const requestUrl = ref('')
const refetch = ref(true)
const search = ref('')
const category = ref('')
const order = ref('createdDate')

export const useGalleryStore = defineStore('gallery', {
  state: () => {
    return {
      loadedMehms: ref<Array<LoadedMehm>>([]),
      asc: ref(true),
      take: ref(10),
      skip: ref(0),
    }
  },
  getters: {
    isFinal: () => !refetch.value,
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
    resetState() {
      this.loadedMehms = []
      this.skip = 0
      refetch.value = true
    },
    setSearch(input: string) {
      input = input.trim()
      if (input !== search.value) {
        search.value = input
        this.resetState()
      }
    },
    setCategory(input: string) {
      if (input !== category.value)
        category.value = input
      this.resetState()
    },
    setOrder(input: string) {
      if (input !== category.value)
        order.value = input
      this.resetState()
    },
    setAsc(input: boolean) {
      if (input !== this.asc)
        this.asc = input
      this.resetState()
    },
    fetchMehms() {
      requestUrl.value = `${endpoint}?take=${this.take}&skip=${this.skip}`
      + `${search.value ? `&textSearch=${search.value}` : ''}`
      + `${category.value ? `&genre=${category.value}` : ''}`
      + `${order.value ? `&sort=${order.value}` : ''}`
      + `${(!this.asc && order.value !== 'createdDate') || (this.asc && order.value === 'createdDate') ? ',desc' : ''}`
    },
  },
})

useFetch(requestUrl, {
  refetch,
  immediate: false,
  timeout: 200,
  afterFetch(ctx) {
    const store = useGalleryStore()

    const mehms = ctx.data.mehms
    store.skip += mehms.length
    store.loadMehms(mehms, imageSize)
    if (mehms.length < store.take)
      refetch.value = false
    return ctx
  },
  onFetchError(ctx) {
    const store = useGalleryStore()

    const mehmsFromJson = jsonMehms.slice(store.skip, store.skip + store.take)
    store.skip += mehmsFromJson.length
    store.loadMehms(mehmsFromJson, imageSize)
    if (mehmsFromJson.length < store.take)
      refetch.value = false
    return ctx
  },
}).get().json()
