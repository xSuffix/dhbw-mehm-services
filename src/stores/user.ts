import { acceptHMRUpdate, defineStore } from 'pinia'

interface User {
  id: number
  name: string
  admin: boolean
}

export const useUserStore = defineStore('user', {
  state: () => {
    return {
      user: ref<Array<User>>([]),
    }
  },
  actions: {
    login(user: User) {
      this.user[0] = user
    },
    logout() {
      this.user = []
    },
    loggedIn() {
      return this.user.length === 1
    },
  },
  /**
   * Current name of the user.
  const savedName = ref('')
  const previousNames = ref(new Set<string>())

  const usedNames = computed(() => Array.from(previousNames.value))
  const otherNames = computed(() => usedNames.value.filter(name => name !== savedName.value))

  /**
   * Changes the current name of the user and saves the one that was used
   * before.
   *
   * @param name - new name to set
  function setNewName(name: string) {
    if (savedName.value)
      previousNames.value.add(savedName.value)

    savedName.value = name
  }

  return {
    setNewName,
    otherNames,
    savedName,
  }
  */
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore, import.meta.hot))
