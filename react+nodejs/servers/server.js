/*
 * @Descripttion:
 * @version:
 * @Author: peng
 * @Date: 2021-06-15 10:50:22
 * @LastEditors: peng
 * @LastEditTime: 2021-07-13 11:43:43
 */
const express = require("express");
const jsonServer = require("json-server");
const routers = jsonServer.router("./data.json");
const middlewares = jsonServer.defaults();
const Axios = require("axios");
const jwt = require("jsonwebtoken");
// const bcryptjs = require("bcryptjs");
const utils = require("./utils/index");

//**时间格式处理 */
Date.prototype.format = function (format) {
  var o = {
    "M+": this.getMonth() + 1, //month
    "d+": this.getDate(), //day
    "h+": this.getHours(), //hour
    "m+": this.getMinutes(), //minute
    "s+": this.getSeconds(), //second
    "q+": Math.floor((this.getMonth() + 3) / 3), //quarter
    S: this.getMilliseconds(), //millisecond
  };
  if (/(y+)/.test(format))
    format = format.replace(
      RegExp.$1,
      (this.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(format))
      format = format.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  }
  return format;
};

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
  const createDate = new Date().format("yyyy-MM-dd hh:mm:ss");
  const { data } = await Axios.post("/user", {
    ...req.body,
    hashPassword: req.body.password,
    // hashPassword: await bcryptjs.hash(req.body.password, 10),
    password: utils.decrypt(req.body.password),
    token: token,
    role: "editor",
    ip: req.body.ip,
    adress: req.body.adress,
    createDate: createDate,
    loginDate: createDate,
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
  const { username, password, ip, adress } = req.body;
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
      data: {
        id: user.id,
        user: user.username,
        token: user.token,
        role: user.role,
      },
    });
    const loginDate = new Date().format("yyyy-MM-dd hh:mm:ss");
    await Axios.put(`/user/${user.id}`, {
      ...user,
      ip,
      adress,
      loginDate,
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
  const { id } = req.query;
  const { data } = await Axios.get("/user", {
    params: { id },
  });

  if (data.length <= 0) {
    res.send({
      code: -1,
      message: "获取用户信息失败",
    });
    return;
  }

  const user = data[0];
  const { username, avatar, role, ip, adress, createDate, loginDate, title } =
    user;
  let userInfo = {
    id: user.id,
    username,
    avatar,
    token: user.token,
    role,
    ip,
    adress,
    createDate,
    loginDate,
    title,
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
  const { id, password, username, title, role } = req.body;
  const { data } = await Axios.get("/user", {
    params: { id },
  });
  const hashPassword = utils.encrypt(password);
  const token = jwt.sign({ id: username }, hashPassword);
  const editResponse = data[0];
  if (editResponse) {
    const { data } = await Axios.put(`/user/${id}`, {
      ...editResponse,
      token,
      password,
      hashPassword,
      username,
      title,
      role,
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

//**作品集 */
/**
 * @name: 创建作品集
 * @msg:
 * @param {Object} req
 * @return {Object}
 */
serve.post("/works/add", async (req, res) => {
  const response = await Axios.get("/workList", {
    params: { title: req.body.title },
  });
  if (response.data.length) {
    //**已存在该作品 */
    res.send({
      code: -1,
      message: "该作品已存在",
    });
    return;
  }

  const { data } = await Axios.post("/workList", {
    ...req.body,
  });

  res.send({
    code: 200,
    message: "创建成功",
  });
});

/**
 * @name: 查询作品集
 * @msg:
 * @param {Object} req
 * @return {Object}
 */
serve.get("/works/find", async (req, res) => {
  const { data } = await Axios.get("/workList");
  if (data) {
    res.send({
      code: 200,
      message: "操作成功",
      data: data,
    });
  } else {
    res.send({
      code: -1,
      message: "获取失败",
    });
  }
});

/**
 * @name: 删除作品集
 * @msg:
 * @param {Object} req
 * @return {Object}
 */
serve.post("/works/delete", async (req, res) => {
  const { idList } = req.body;
  if (idList && idList.length) {
    await idList.forEach((id) => {
      Axios.delete(`/workList/${id}`);
    });
  }
  res.send({
    code: 200,
    message: "操作成功",
  });
});

serve.use(middlewares);
serve.use(routers);

serve.listen(portname, function () {
  console.log(`服务成功启动在${hostname}`);
});
