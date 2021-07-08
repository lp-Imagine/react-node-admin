/*
 * @Descripttion:
 * @version:
 * @Author: peng
 * @Date: 2021-06-15 10:50:22
 * @LastEditors: peng
 * @LastEditTime: 2021-07-07 17:25:43
 */
const express = require("express");
const jsonServer = require("json-server");
const routes = jsonServer.router("./data.json");
const middlewares = jsonServer.defaults();
const Axios = require("axios");
const jwt = require("jsonwebtoken");
// const bcryptjs = require("bcryptjs");
const utils = require("./utils/index");

const serve = express();
const hostname = "http://192.168.8.225:9000";
const portname = "9000";
Axios.defaults.baseURL = hostname;

//**req.body */
serve.use(express.json());
serve.use(express.urlencoded({ extended: true }));

//**跨域处理 */
serve.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  next();
});

/**
 * 用户注册
 * @param {Object} req
 * @return {Object}
 */
serve.post("/user/register", async (req, res) => {
  // **获取前端传递过来的 username 、password*/
  // **直接使用 Axios 来调用 json-server 的 user 这个接口来存进去*/
  const response = await Axios.get("/user", {
    params: { username: req.body.username },
  });
  if (response.data.length) {
    //**已有用户注册了 */
    res.send({
      code: -1,
      message: "已经被人注册过了",
    });
    return;
  }
  //**生成token */
  const token = jwt.sign({ id: req.body.username }, req.body.password);
  const { data } = await Axios.post("/user", {
    ...req.body,
    hashPassword: req.body.password,
    // hashPassword: await bcryptjs.hash(req.body.password, 10),
    password: utils.decrypt(req.body.password),
    token: token,
  });
  res.send({
    code: 200,
    message: "注册成功",
    data: data,
  });
});
/**
 * 登录
 * @param {Object} req
 * @return {Object}
 */
serve.post("/user/login", async (req, res) => {
  const { username, password } = req.body;
  const { data } = await Axios.get("/user", {
    params: {
      username,
    },
  });

  if (data.length <= 0) {
    res.send({
      code: -1,
      message: "用户名或密码错误",
    });
    return;
  }

  const user = data[0];
  // const isOk = await bcryptjs.compare(hashPassword, user.password);
  const showPassword = utils.decrypt(password);
  const isOk = showPassword === user.password;
  if (isOk) {
    res.send({
      code: 200,
      message: "登录成功",
      data: { user: user.username, token: user.token },
    });
  } else {
    res.send({
      code: -1,
      message: "用户名或密码错误",
    });
  }
});

/**
 * 用户注销
 * @param {Object} req
 * @return {Object}
 */
serve.post("/user/logout", (req, res) => {
  res.send({
    code: 200,
    message: "注销成功",
  });
});
/**
 *  获取用户信息
 * @param {Object} req
 * @return {Object}
 */
serve.get("/user/getinfo", async (req, res) => {
  const { token } = req.query;
  const { data } = await Axios.get("/user", {
    params: token,
  });

  if (data.length <= 0) {
    res.send({
      code: -1,
      message: "获取用户信息失败",
    });
    return;
  }

  const user = data[0];
  let userInfo = {
    id: user.id,
    username: user.username,
    avatar: user.avatar,
    token: user.token,
  };
  res.send({
    code: 200,
    message: "操作成功",
    data: userInfo,
  });
});

/**
 * 获取用户列表
 * @param {Object} req
 * @return {Object}
 */
serve.get("/user/userList", async (req, res) => {
  const { data } = await Axios.get("/user");
  res.send({
    code: 200,
    message: "操作成功",
    data: data,
  });
});

/**
 * 编辑用户信息
 * @param {Object} req
 * @return {Object}
 */

serve.put("/user/editInfo", async (req, res) => {
  const { id, password, username } = req.body;
  const hashPassword = utils.encrypt(password);
  const token = jwt.sign({ id: username }, hashPassword);
  const { data } = await Axios.put(`/user/${id}`, {
    ...req.body,
    hashPassword,
    token,
  });
  if (data) {
    res.send({
      code: 200,
      message: "操作成功",
    });
  } else {
    res.send({
      code: -1,
      message: "操作异常",
    });
  }
});
/**
 * 删除用户
 * @param {Object} req
 * @return {Object}
 */
serve.delete("/user/deleteUser", async (req, res) => {
  const { id } = req.query;
  const { data } = await Axios.delete(`/user/${id}`);
  res.send({
    code: 200,
    message: "操作成功",
  });
});

serve.use(middlewares);
serve.use(routes);

serve.listen(portname, function () {
  console.log(`服务成功启动在${hostname}`);
});
