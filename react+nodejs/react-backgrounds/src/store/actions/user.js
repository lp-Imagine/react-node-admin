/*
 * @Descripttion:
 * @version:
 * @Author: peng
 * @Date: 2021-07-01 17:50:08
 * @LastEditors: peng
 * @LastEditTime: 2021-07-10 17:32:08
 */
import * as types from "../actions-types";
import userApi from "@/api/user";

export const getInfo = (data) => (dispatch) => {
  return new Promise((resolve, reject) => {
    userApi
      .getUserInfo(data)
      .then((response) => {
        const { data } = response;
        if (data.code === 200) {
          const userInfo = data.data;
          dispatch(setInfo(userInfo));
          resolve(data);
        } else {
          const msg = data.message;
          reject(msg);
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const setUserToken = (token) => {
  return {
    type: types.USER_SET_TOKEN,
    token,
  };
};

export const setInfo = (userInfo) => {
  return {
    type: types.USER_SET_INFO,
    ...userInfo,
  };
};

export const setOut = () => {
  return {
    type: types.USER_SET_OUT,
  };
};

export const setInfoVisible = () => {
  return {
    type: types.SET_INFO_VISIBLE,
  };
};
