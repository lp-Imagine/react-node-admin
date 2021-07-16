/*
 * @Descripttion:
 * @version:
 * @Author: peng
 * @Date: 2021-07-02 10:26:50
 * @LastEditors: peng
 * @LastEditTime: 2021-07-16 11:52:27
 */
import { reqLogin, logout } from "./auth";
import { setUserToken, setInfo, setOut, getInfo, setInfoVisible } from "./user";
import { toggleSiderBar, toggleSettingPanel } from "./app";
import { changeSetting } from "./settings";
import { addTag, emptyTaglist, deleteTag, closeOtherTags } from "./tagsView";
import { addBug } from "./monitor";

export {
  reqLogin,
  logout,
  getInfo,
  setUserToken,
  setInfo,
  setOut,
  setInfoVisible,
  toggleSiderBar,
  toggleSettingPanel,
  changeSetting,
  addTag,
  emptyTaglist,
  deleteTag,
  closeOtherTags,
  addBug
};
