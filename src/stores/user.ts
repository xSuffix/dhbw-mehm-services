import { acceptHMRUpdate, defineStore } from 'pinia'
import { getCookieByName } from '~/composables/auth'

interface User {
  id: number
  name: string
  email: string
  admin: boolean
}

const noUser = { id: 0, email: '', name: '', admin: false }
const user = getCookieByName('jwt') ? JSON.parse(localStorage.getItem('user') || '') : noUser

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: ref<User>(user),
    }
  },
  getters: {
    loggedIn: state => state.user.id > 0,
  },
  actions: {
    login(user: User) {
      this.user = user
    },
    logout() {
      this.user = noUser
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
