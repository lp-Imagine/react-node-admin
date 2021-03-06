/*
 * @Descripttion:
 * @version:
 * @Author: peng
 * @Date: 2021-06-25 14:27:31
 * @LastEditors: peng
 * @LastEditTime: 2021-07-15 16:54:34
 */

const LOGIN_COOKIE_NAME = "jwt-token";

export function setToken(token) {
  _setCookie(LOGIN_COOKIE_NAME, token);
}
export function getToken() {
  return _getCookie(LOGIN_COOKIE_NAME);
}
export function removeToken() {
  _setCookie(LOGIN_COOKIE_NAME, "", 0);
}

export function setStorge(id) {
  window.localStorage.setItem("id", id);
}
export function getStorge() {
  return window.localStorage.getItem("id");
}

function _setCookie(name, value, expire) {
  let date = new Date();
  date.setDate(date.getDate() + expire);
  document.cookie =
    name +
    "=" +
    escape(value) +
    "; path=/" +
    (expire ? ";expires=" + date.toGMTString() : "");
}

function _getCookie(name) {
  let start, end;
  if (document.cookie.length > 0) {
    start = document.cookie.indexOf(name + "=");
    if (start !== -1) {
      start = start + name.length + 1;
      end = document.cookie.indexOf(";", start);
      if (end === -1) {
        end = document.cookie.length;
      }
      return unescape(document.cookie.substring(start, end));
    }
  }
  return "";
}
