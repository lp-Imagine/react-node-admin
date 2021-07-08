/*
 * @Descripttion:
 * @version:
 * @Author: peng
 * @Date: 2021-06-25 16:04:24
 * @LastEditors: peng
 * @LastEditTime: 2021-07-07 10:19:53
 */
import React, { useEffect } from "react";
import "./style.css";
import NProgress from "nprogress"; // progress bar
import "nprogress/nprogress.css"; // progress bar style

NProgress.configure({ showSpinner: false });
const Loading = () => {
  useEffect(() => {
    NProgress.start();
    return () => {
      NProgress.done();
    };
  }, []);

  return (
    <div
      id="my-loading"
      style={{ background: "none", height: "calc(100vh - 173px)" }}
    >
      <div className="loader"></div>
      <div className="shadow"></div>
    </div>
  );
};

export default Loading;
