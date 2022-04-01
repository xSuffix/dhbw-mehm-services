import { acceptHMRUpdate, defineStore } from 'pinia'

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
      user: ref<User>(noUser),
    }
  },
  actions: {
    login(user: User) {
      this.user = user
    },
    logout() {
      this.user = noUser
    },
    loggedIn() {
      return this.user.id > 0
    },
  },
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
