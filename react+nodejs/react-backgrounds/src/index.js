/*
 * @Descripttion:
 * @version:
 * @Author: peng
 * @Date: 2021-06-23 13:42:49
 * @LastEditors: peng
 * @LastEditTime: 2021-07-16 13:56:24
 */
import React from "react";
import ReactDOM from "react-dom";
import "@/styles/theme.css";
import "@/styles/index.scss";
import App from "./App";
import "./mock";
import "@/lib/monitor/index";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(<App />, document.getElementById("root"));
reportWebVitals();
