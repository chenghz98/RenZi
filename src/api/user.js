import request from '@/utils/request'

// 封装登录接口
export function login(data) {
  return request({
    url: '/sys/login',
    method: 'post',
    data
  })
}

export function getUserInfo(token) {
  return request({
    url: '/sys/profile',
    method: 'post'
  })
}
export function getUserDetaliById(id) {
  return request({
    url: `/sys/user/${id}`
  })
}
export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
