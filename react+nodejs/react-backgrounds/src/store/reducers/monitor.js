/*
 * @Descripttion: 
 * @version: 
 * @Author: peng
 * @Date: 2021-07-16 11:51:12
 * @LastEditors: peng
 * @LastEditTime: 2021-07-16 11:52:04
 */
import * as types from "../actions-types";
const initState = {
  bugList: [],
};
export default function app(state = initState, action) {
  switch (action.type) {
    case types.BUG_ADD_BUG:
      return {
        bugList: [...state.bugList, action.bug],
      };
    default:
      return state;
  }
}
