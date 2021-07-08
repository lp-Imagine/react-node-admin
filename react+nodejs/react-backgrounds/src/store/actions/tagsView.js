/*
 * @Descripttion: 
 * @version: 
 * @Author: peng
 * @Date: 2021-07-02 16:10:25
 * @LastEditors: peng
 * @LastEditTime: 2021-07-02 16:12:01
 */
import * as types from "../actions-types";
export const addTag = (tag) => {
  return {
    type: types.TAGSVIEW_ADD_TAG,
    tag
  };
};

export const emptyTaglist = () => {
  return {
    type: types.TAGSVIEW_EMPTY_TAGLIST
  };
};

export const deleteTag = (tag) => {
  return {
    type: types.TAGSVIEW_DELETE_TAG,
    tag
  };
};

export const closeOtherTags = (tag) => {
  return {
    type: types.TAGSVIEW_CLOSE_OTHER_TAGS,
    tag
  };
};