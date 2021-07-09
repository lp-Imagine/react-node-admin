/*
 * @Descripttion: 
 * @version: 
 * @Author: peng
 * @Date: 2021-07-08 13:57:54
 * @LastEditors: peng
 * @LastEditTime: 2021-07-08 13:58:18
 */
import server from '@/utils/request'
export function tableList(data) {
  return server({
    url: '/table/list',
    method: 'post',
    data
  })
}

export function deleteItem(data) {
  return server({
    url: '/table/delete',
    method: 'post',
    data
  })
}
export function editItem(data) {
  return server({
    url: '/table/edit',
    method: 'post',
    data
  })
}