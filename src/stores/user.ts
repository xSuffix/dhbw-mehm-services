import { acceptHMRUpdate, defineStore } from 'pinia'
import { useCookies } from '@vueuse/integrations/useCookies'

interface User {
  id: number
  name: string
  email: string
  admin: boolean
}

const cookies = useCookies(['jwt'])
const noUser = { id: 0, email: '', name: '', admin: false }
const user = cookies.get('jwt') ? JSON.parse(localStorage.getItem('user') || '') : noUser

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      id: ref(user.id),
      name: ref(user.name),
      email: ref(user.email),
      admin: ref(user.admin),
      jwt: ref(cookies.get('jwt')),
    }
  },
  getters: {
    loggedIn(): boolean {
      return this.jwt !== ''
    },
  },
  actions: {
    login(user: User) {
      this.checkJWT()
      this.id = user.id
      this.name = user.name
      this.email = user.email
      this.admin = user.admin
    },
    logout() {
      this.checkJWT()
      this.id = noUser.id
      this.name = noUser.name
      this.email = noUser.email
      this.admin = noUser.admin
    },
    checkJWT() {
      this.jwt = cookies.get('jwt')
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
