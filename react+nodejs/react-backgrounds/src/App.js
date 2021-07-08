/*
 * @Descripttion:
 * @version:
 * @Author: peng
 * @Date: 2021-06-23 13:42:49
 * @LastEditors: peng
 * @LastEditTime: 2021-07-07 09:39:05
 */
import React, { Component } from "react";
import { Provider } from "react-redux";
import { ConfigProvider } from "antd";
import zhCN from "antd/es/locale/zh_CN";
import store from "./store";
import Router from "./router";

class App extends Component {
  render() {
    return (
      <ConfigProvider locale={zhCN}>
        <Provider store={store}>
          <Router />
        </Provider>
      </ConfigProvider>
    );
  }
}

export default App;
