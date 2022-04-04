import { acceptHMRUpdate, defineStore } from 'pinia'
interface User {
  id: number
  name: string
  email: string
  admin: boolean
}

const getCookieByName = (name: string) => {
  if (document === undefined)
    return ''

  const cookie = document.cookie.split('; ').find(cookie => cookie.split('=')[0] === name)
  if (cookie)
    return cookie.split(/=(.*)/s)[1]

  return ''
}

const noUser = { id: 0, email: '', name: '', admin: false }
const user = getCookieByName('jwt') ? JSON.parse(localStorage.getItem('user') || '') : noUser

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      id: ref(user.id),
      name: ref(user.name),
      email: ref(user.email),
      admin: ref(user.admin),
      jwt: ref(getCookieByName('jwt')),
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
