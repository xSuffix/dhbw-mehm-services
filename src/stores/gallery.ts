import { defineStore } from 'pinia'

interface ApiMehm {
  id: number
  authorName: string
  title: string
  description: string
  imageSource: string
  createdDate: Array<number>
  genre: string
  likes: number
}

interface LoadedMehm extends ApiMehm {
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
        img.src = mehm.imageSource
        img.onload = () => {
          mehm.scale = img.width / img.height * minHeight
          this.loadedMehms.push(mehm)
        }
      })
    },
  },
})
