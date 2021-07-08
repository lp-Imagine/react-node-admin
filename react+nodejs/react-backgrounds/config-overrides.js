/*
 * @Descripttion:
 * @version:
 * @Author: peng
 * @Date: 2021-06-23 13:52:09
 * @LastEditors: peng
 * @LastEditTime: 2021-07-08 09:22:35
 */

const {
  override,
  addWebpackAlias,
  fixBabelImports,
  // addLessLoader,
} = require("customize-cra");
const path = require("path");
process.env.CI = "false";
const addCustomize = () => (config) => {
  if (config.output.publicPath) {
    config.output.publicPath =
      process.env.NODE_ENV === "production" ? "/react-admin/" : "/";
  }
  if (config.resolve) {
    config.resolve.extensions.push(".jsx");
  }
  return config;
};
module.exports = override(
  // 针对antd实现按需打包: 根据import来打包(使用babel-plugin-import)
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true, // 自动打包相关的样式
  }),

  // 别名配置
  addWebpackAlias({
    ["@"]: path.resolve(__dirname, "src"),
  }),

  // 使用less-loader对源码中的less的变量进行重新指定
  // addLessLoader({
  //   javascriptEnabled: true,
  //   modifyVars: { "@primary-color": "#1DA57A" },
  // }),
  addCustomize()
);
