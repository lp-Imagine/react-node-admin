/*
 * @Descripttion:
 * @version:
 * @Author: peng
 * @Date: 2021-06-23 13:42:49
 * @LastEditors: peng
 * @LastEditTime: 2021-07-07 18:05:57
 */
import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
// import "@/styles/theme.less";
import "@/styles/index.less";
import App from "./App";
import "./mock";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  // <React.StrictMode>
  <App />,
  // </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
