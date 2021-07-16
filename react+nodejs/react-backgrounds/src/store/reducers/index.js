/*
 * @Descripttion: 
 * @version: 
 * @Author: peng
 * @Date: 2021-07-02 10:32:20
 * @LastEditors: peng
 * @LastEditTime: 2021-07-16 11:50:07
 */
import { combineReducers } from "redux";
import user from "./user";
import app from "./app";
import settings from "./settings";
import tagsView from "./tagsView";
import monitor from "./monitor";

export default combineReducers({
  user,
  app,
  settings,
  tagsView,
  monitor
});
