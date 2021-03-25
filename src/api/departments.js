import request from '@/utils/request'
export function departments() {
  return request({
    url: '/company/department'
  })
}
export function delDepartments(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'delete'
  })
}
export function addDepartments(data) {
  return request({
    url: '/company/department',
    method: 'POST',
    data
  })
}

export function getManager(data) {
  return request({
    url: '/company/department',
    method: 'get',
    data
  })
}
export function getDepartDetail(id) {
  return request({
    url: `/company/department/${id}`,
    method: 'get'
  })
}
/**
 * 编辑部门
 *
 * ***/
export function updateDepartments(data) {
  return request({
    url: `/company/department/${data.id}`,
    method: 'put',
    data
  })
}
