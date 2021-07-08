/*
 * @Descripttion: 
 * @version: 
 * @Author: peng
 * @Date: 2021-07-05 10:37:04
 * @LastEditors: peng
 * @LastEditTime: 2021-07-05 10:37:13
 */
import * as types from "../actions-types";
const initState = {
  sidebarCollapsed: false,
  settingPanelVisible: false,
};
export default function app(state = initState, action) {
  switch (action.type) {
    case types.APP_TOGGLE_SIDEBAR:
      return {
        ...state,
        sidebarCollapsed: !state.sidebarCollapsed,
      };
    case types.APP_TOGGLE_SETTINGPANEL:
      return {
        ...state,
        settingPanelVisible: !state.settingPanelVisible,
      };
    default:
      return state;
  }
}
