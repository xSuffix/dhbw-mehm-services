export const getCookieByName = (name: string) => {
  name += '='
  let ret = ''
  if (typeof document !== 'undefined') {
    const cookiesArray = document.cookie.split('; ')
    cookiesArray.forEach((val) => {
      if (val.indexOf(name) === 0) ret = val.substring(name.length)
    })
  }
  return ret
}

export const loggedIn = () => {
  return getCookieByName('jwt') !== ''
}
