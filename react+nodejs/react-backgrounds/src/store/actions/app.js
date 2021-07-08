/*
 * @Descripttion: 
 * @version: 
 * @Author: peng
 * @Date: 2021-07-02 16:12:04
 * @LastEditors: peng
 * @LastEditTime: 2021-07-02 16:12:09
 */
import * as types from "../actions-types";
export const toggleSiderBar = () => {
  return {
    type: types.APP_TOGGLE_SIDEBAR
  };
};

export const toggleSettingPanel = () => {
  return {
    type: types.APP_TOGGLE_SETTINGPANEL
  };
};