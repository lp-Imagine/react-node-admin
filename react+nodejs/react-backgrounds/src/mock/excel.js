/*
 * @Descripttion: 
 * @version: 
 * @Author: peng
 * @Date: 2021-07-06 17:32:00
 * @LastEditors: peng
 * @LastEditTime: 2021-07-06 18:10:01
 */
import Mock from 'mockjs'
const list = []
const count = 20

for (let i = 0; i < count; i++) {
  list.push(Mock.mock({
    id: '@increment',
    title: '@ctitle(5, 10)',
    author: '@cname',
    readings: '@integer(300, 5000)',
    date: '@datetime'
  }))
}
export default {
  excelList: (_) => {
    return {
      code: 20000,
      data: { items: list }
    }
  },
};