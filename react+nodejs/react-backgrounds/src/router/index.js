/*
 * @Descripttion:
 * @version:
 * @Author: peng
 * @Date: 2021-07-02 10:55:29
 * @LastEditors: peng
 * @LastEditTime: 2021-07-15 16:49:32
 */
import React from "react";
import { HashRouter } from "react-router-dom";
import Routes from "./routes";
class Router extends React.Component {
  render() {
    return (
      <HashRouter>
        <Routes />
      </HashRouter>
    );
  }
}
export default Router;
