/*
 * @Descripttion:
 * @version:
 * @Author: peng
 * @Date: 2021-07-10 15:32:43
 * @LastEditors: peng
 * @LastEditTime: 2021-07-10 16:24:06
 */
import server from "@/utils/request";

/**
 * @name: 查询作品集
 * @msg:
 * @param {Object} data
 * @return {Object}
 */
export function findWorks(data) {
  return server.get("/works/find", { params: data });
}

/**
 * @name: 新建作品集
 * @msg:
 * @param {Object} data
 * @return {Object}
 */
export function addWorks(data) {
  return server.post("/works/add", data);
}

/**
 * @name:删除作品集
 * @msg:
 * @param {Object} data
 * @return {Object}
 */
export function deleteWorks(data) {
  return server.post("/works/delete", data);
}
