import { acceptHMRUpdate, defineStore } from 'pinia'
import { getCookieByName } from '~/composables/auth'

interface User {
  id: number
  name: string
  email: string
  admin: boolean
}

const noUser = { id: 0, email: '', name: '', admin: false }

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      id: ref(noUser.id),
      name: ref(noUser.name),
      email: ref(noUser.email),
      admin: ref(noUser.admin),
      jwt: ref(''),
    }
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
      this.jwt = getCookieByName('jwt')
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
