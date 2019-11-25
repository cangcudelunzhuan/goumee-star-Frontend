import Cookies from 'js-cookie'

const TokenKey = 'Auth-Token'

export function getToken () {
  return Cookies.get(TokenKey)
}

export function setToken (token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken () {
  return Cookies.remove(TokenKey)
}

export function getCode () {
  return Cookies.get('actcode')
}

export function setCode (code) {
  return Cookies.set('actcode', code)
}
