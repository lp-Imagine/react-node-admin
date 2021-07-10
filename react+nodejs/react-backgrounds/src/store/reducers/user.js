/*
 * @Descripttion:
 * @version:
 * @Author: peng
 * @Date: 2021-07-02 10:29:51
 * @LastEditors: peng
 * @LastEditTime: 2021-07-10 17:19:27
 */
import * as types from "../actions-types";
import { getToken } from "@/utils/session";
const initUserInfo = {
  id: "",
  username: "",
  role: "",
  avatar: "",
  title: "",
  token: getToken(),
  infoVisible: false,
};
export default function user(state = initUserInfo, action) {
  switch (action.type) {
    case types.USER_SET_TOKEN:
      return {
        ...state,
        token: action.token,
      };
    case types.USER_SET_INFO:
      return {
        ...state,
        id: action.id,
        username: action.username,
        avatar: action.avatar || "",
        role: action.role || "",
        title: action.title || "",
      };
    case types.SET_INFO_VISIBLE:
      return {
        ...state,
        infoVisible: !state.infoVisible,
      };
    case types.USER_SET_OUT:
      return {};
    default:
      return state;
  }
}
