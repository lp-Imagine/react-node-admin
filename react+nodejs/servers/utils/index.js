/*
 * @Descripttion:
 * @version:
 * @Author: peng
 * @Date: 2021-06-24 15:40:57
 * @LastEditors: peng
 * @LastEditTime: 2021-07-07 16:50:27
 */

const CryptoJS = require("crypto-js");

module.exports = {
  /**
   * 解密函数
   * @param {*} str
   */
  decrypt: function (str) {
    const bytes = CryptoJS.AES.decrypt(str, "user_888");
    return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  },
  /**
   * 加密函数，加密同一个字符串生成的都不相同
   * @param {*} str
   */
  encrypt: function (str) {
    return CryptoJS.AES.encrypt(JSON.stringify(str), "user_888").toString();
  },
};
