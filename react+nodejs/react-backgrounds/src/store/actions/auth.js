/*
 * @Descripttion:
 * @version:
 * @Author: peng
 * @Date: 2021-07-02 10:16:44
 * @LastEditors: peng
 * @LastEditTime: 2021-07-07 10:48:59
 */
import { setUserToken, setOut } from "./user";
import usersApi from "@/api/user";
import { setToken, removeToken } from "@/utils/session";
export const reqLogin = (params) => (dispatch) => {
  return new Promise((resolve, reject) => {
    usersApi
      .login({ username: params.username.trim(), password: params.password })
      .then((response) => {
        const { data } = response;
        console.log(response, "resssss");
        if (data.code === 200) {
          const token = data.data.token;
          dispatch(setUserToken(token));
          setToken(token);
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

export const logout = (token) => (dispatch) => {
  return new Promise((resolve, reject) => {
    usersApi
      .logOut({ token })
      .then((response) => {
        console.log(response,'ress')
        const { data } = response;
        if (data.code === 200) {
          dispatch(setOut());
          removeToken();
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
