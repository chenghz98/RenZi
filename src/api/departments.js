import request from '@/utils/request'
export function departments() {
  return request({
    url: '/company/department'
  })
}
