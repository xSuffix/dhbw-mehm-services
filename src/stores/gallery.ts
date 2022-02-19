import { defineStore } from 'pinia'

interface ApiMehm {
  id: string
  title: string
  src: string
}

interface LoadedMehm {
  id: string
  title: string
  src: string
  scale: number
}

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
        img.src = mehm.src
        img.onload = () => {
          mehm.scale = img.width / img.height * minHeight
          this.loadedMehms.push(mehm)
        }
      })
    },
  },
})
