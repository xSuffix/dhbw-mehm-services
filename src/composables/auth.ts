export function getCookieByName(name: String) {
  if (typeof document !== 'undefined') {
    const cookie = document.cookie.split('; ').find(cookie => cookie.split('=')[0] === name)
    if (cookie)
      return cookie.split(/=(.*)/s)[1]
  }

  return ''
}

const noUser = { id: 0, email: '', name: '', admin: false }

export const getUser = () => {
  const localStorageUser = typeof document !== 'undefined' ? localStorage.getItem('user') : ''
  return localStorageUser ? JSON.parse(localStorageUser) : noUser
}
