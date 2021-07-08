/*
 * @Descripttion:
 * @version:
 * @Author: peng
 * @Date: 2021-06-21 09:58:33
 * @LastEditors: peng
 * @LastEditTime: 2021-06-22 10:30:04
 */
const Koa = require("koa");
const Router = require("koa-router");
const Cors = require("koa2-cors");
const bodyPareer = require("koa-bodyparser");

// const fs = require("fs");
const app = new Koa();

const hostName = "http://192.168.8.225:9000";
const portName = 9000;

//**为了在post请求中转化得到请求参数 */
app.use(bodyPareer());
const router = new Router();
const db = require("./mysql");
router.get("/user/login", async (ctx, next) => {
  let ctx_query = ctx.request.query;
  let sql = `select * from user where username='${ctx_query.username}'and password='${ctx_query.password}'`;
  //**查询数据库 */
  const result = await db.query(sql);

  if (result.status === 200) {
    if (result.results.length) {
      console.log(result)
      ctx.body = {
        code: 200,
        message:"操作成功"
      };
    } else {
      ctx.body = {
        code: 400,
        message: "用户名和密码错误，请重新输入",
      };
    }
  } else if (result.status === 400) {
    ctx.body = {
      code: 401,
      message: "连接错误，请重新再试",
    };
  } else {
    ctx.body = {
      code: 500,
      message: "服务器连接失败",
    };
  }
});

app.use(Cors());
//**将koa和两个中间件连接起来 */
app.use(router.routes()).use(router.allowedMethods());
//**监听端口 */
app.listen(portName, () => {
  console.log(`node服务启动成功${hostName}`);
});
