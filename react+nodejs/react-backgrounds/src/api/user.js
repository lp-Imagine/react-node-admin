/*
 * @Descripttion:
 * @version:
 * @Author: peng
 * @Date: 2021-06-24 13:36:45
 * @LastEditors: peng
 * @LastEditTime: 2021-07-10 16:56:23
 */

import server from "@/utils/request";

const users = {
  /**
   * 注册用户
   * @param {Object} data
   */
  register(data) {
    return server.post("/user/register", data);
  },
  /**
   * 用户登录
   * @param {Object} data
   */
  login(data) {
    return server.post("/user/login", data);
  },

  /**
   * 注销登录
   * @param {Object} data
   */
  logOut(data) {
    return server.post("/user/logout", data);
  },

  /**
   * 获取用户信息
   * @param {Object} data
   * @return {Object}
   */
  getUserInfo(data) {
    return server.get("/user/getinfo", { params: data });
  },

  /**
   * 获取用户列表
   * @param {Object} data
   * @return {Object}
   */
  getUsers(data) {
    return server.get("/user/userList", { params: data });
  },
  /**
   * 编辑用户信息
   * @param {Object} data
   * @return {Object}
   */
  editUserInfo(data) {
    return server.put("/user/editInfo", data);
  },

  /**
   * 删除用户
   * @param {Object} data
   * @return {Object}
   */
  deleteUser(data) {
    return server.delete("/user/deleteUser", { params: data });
  },
};

export default users;
