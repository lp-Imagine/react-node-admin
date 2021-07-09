/*
 * @Descripttion:
 * @version:
 * @Author: peng
 * @Date: 2021-07-09 11:00:10
 * @LastEditors: peng
 * @LastEditTime: 2021-07-09 11:19:18
 */

const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    createProxyMiddleware("/cityjson", {
      target: "http://pv.sohu.com",
      changeOrigin: true,
      pathRewrite: {
        "^/cityjson": "/cityjson",
      },
    })
  );
};
