/*
 * @Descripttion: 
 * @version: 
 * @Author: peng
 * @Date: 2021-07-02 16:33:26
 * @LastEditors: peng
 * @LastEditTime: 2021-07-02 17:33:33
 */
import * as types from "../actions-types";
const initState = {
  taglist: [],
};
export default function app(state = initState, action) {
  switch (action.type) {
    case types.TAGSVIEW_ADD_TAG:
      const tag = action.tag;
      if (state.taglist.includes(tag)) {
        return state;
      } else {
        return {
          ...state,
          taglist: [...state.taglist, tag],
        };
      }
    case types.TAGSVIEW_DELETE_TAG:
      return {
        ...state,
        taglist: [...state.taglist.filter((item) => item !== action.tag)],
      };
    case types.TAGSVIEW_EMPTY_TAGLIST:
      return {
        ...state,
        taglist: [...state.taglist.filter((item) => item.path === "/home")],
      };
    case types.TAGSVIEW_CLOSE_OTHER_TAGS:
      return {
        ...state,
        taglist: [
          ...state.taglist.filter(
            (item) => item.path === "/home" || item === action.tag
          ),
        ],
      };
    default:
      return state;
  }
}
