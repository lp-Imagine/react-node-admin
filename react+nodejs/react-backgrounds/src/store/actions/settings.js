/*
 * @Descripttion: 
 * @version: 
 * @Author: peng
 * @Date: 2021-07-02 16:31:57
 * @LastEditors: peng
 * @LastEditTime: 2021-07-02 16:32:02
 */
import * as types from "../actions-types";
export const changeSetting = (data) => {
  return {
    type: types.SETTINGS_CHANGE_SETTINGS,
    ...data,
  };
};
