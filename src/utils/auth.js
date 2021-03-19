import Cookies from 'js-cookie'

const TokenKey = 'hrsaas-ihrm-token' // 设置一个独一无二的token
// 从缓存中读取token
export function getToken() {
  return Cookies.get(TokenKey)
}
// 向缓存中存token
export function setToken(token) {
  return Cookies.set(TokenKey, token)
}
// 删除token
export function removeToken() {
  return Cookies.remove(TokenKey)
}
