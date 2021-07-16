/*
 * @Descripttion: 
 * @version: 
 * @Author: peng
 * @Date: 2021-07-16 11:51:28
 * @LastEditors: peng
 * @LastEditTime: 2021-07-16 11:52:12
 */
import * as types from "../actions-types";
export const addBug = (bug) => {
  return {
    type: types.BUG_ADD_BUG,
    bug
  };
};