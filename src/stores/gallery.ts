import { defineStore } from 'pinia'
import { GATEWAY } from '~/composables/config'
import jsonMehms from '~/data/mehms.json'

interface ApiMehm {
  id: number
  title: string
  imageSource: string
  genre: string
  createdDate: string
  likes: number
}

interface LoadedMehm extends ApiMehm {
  scale: number
}

const imageSize = 304
const endpoint = `${GATEWAY}/mehms`

const requestUrl = ref('')
const refetch = ref(true)

export const useGalleryStore = defineStore('gallery', {
  state: () => {
    return {
      loadedMehms: ref<Array<LoadedMehm>>([]),
      search: ref(''),
      category: ref(''),
      order: ref('createdDate'),
      asc: ref(true),
      take: ref(16),
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
      if (input !== this.search) {
        this.search = input
        this.resetState()
      }
    },
    setCategory(input: string) {
      if (input !== this.category)
        this.category = input
      this.resetState()
    },
    setOrder(input: string) {
      if (input !== this.order)
        this.order = input
      this.resetState()
    },
    setAsc(input: boolean) {
      if (input !== this.asc)
        this.asc = input
      this.resetState()
    },
    fetchMehms() {
      requestUrl.value = `${endpoint}?take=${this.take}&skip=${this.skip}`
      + `${this.search ? `&textSearch=${this.search}` : ''}`
      + `${this.category ? `&genre=${this.category}` : ''}`
      + `${this.order ? `&sort=${this.order}` : ''}`
      + `${(!this.asc && this.order !== 'createdDate') || (this.asc && this.order === 'createdDate') ? ',desc' : ''}`
    },
  },
})

useFetch(requestUrl, {
  refetch,
  immediate: false,
  timeout: 1000,
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
    let mehms = jsonMehms.filter(mehm => mehm.title.toLowerCase().includes(store.search.toLowerCase()) && (!store.category || store.category === mehm.genre))

    const direction = store.asc ? 1 : -1
    if (store.order === 'createdDate')
      mehms = mehms.sort((a: ApiMehm, b: ApiMehm) => direction * (Date.parse(b.createdDate) - Date.parse(a.createdDate)))
    else if (store.order === 'likes')
      mehms = mehms.sort((a: ApiMehm, b: ApiMehm) => direction * (b.likes - a.likes))

    mehms = mehms.slice(store.skip, store.skip + store.take)

    store.skip += mehms.length
    store.loadMehms(mehms, imageSize)

    if (mehms.length < store.take)
      refetch.value = false

    return ctx
  },
}).get().json()
