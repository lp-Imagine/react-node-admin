import CryptoJS from "crypto-js";
import { Form } from "antd";

/**
 * 防抖函数
 * @param {*} func
 * @param {*} wait
 */
export function debounce(func, wait, immediate) {
  let timeout, args, context, timestamp, result;

  const later = function () {
    // 据上一次触发时间间隔
    const last = +new Date() - timestamp;

    // 上次被包装函数被调用时间间隔 last 小于设定时间间隔 wait
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last);
    } else {
      timeout = null;
      // 如果设定为immediate===true，因为开始边界已经调用过了此处无需调用
      if (!immediate) {
        result = func.apply(context, args);
        if (!timeout) context = args = null;
      }
    }
  };

  return function (...args) {
    context = this;
    timestamp = +new Date();
    const callNow = immediate && !timeout;
    // 如果延时不存在，重新设定延时
    if (!timeout) timeout = setTimeout(later, wait);
    if (callNow) {
      result = func.apply(context, args);
      context = args = null;
    }

    return result;
  };
}

/**
 * 节流函数
 * @param {*} func
 * @param {*} interval
 */
export function throttle(func, interval = 100) {
  let timeout;
  let startTime = new Date();
  return function (event) {
    event.persist && event.persist(); //保留对事件的引用
    clearTimeout(timeout);
    let curTime = new Date();
    if (curTime - startTime <= interval) {
      //小于规定时间间隔时，用setTimeout在指定时间后再执行
      timeout = setTimeout(() => {
        func(event);
      }, interval);
    } else {
      //重新计时并执行函数
      startTime = curTime;
      func(event);
    }
  };
}

/**
 * 生成指定区间的随机整数
 * @param min
 * @param max
 * @returns {number}
 */
export function randomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * 加密函数，加密同一个字符串生成的都不相同
 * @param {*} str
 */
export function encrypt(str) {
  return CryptoJS.AES.encrypt(JSON.stringify(str), "user_888").toString();
}

/**
 * 解密函数
 * @param {*} str
 */
export function decrypt(str) {
  const bytes = CryptoJS.AES.decrypt(str, "user_888");
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

/**
 * 判断是否是对象
 * @param {*} obj
 */
export function isObject(obj) {
  return Object.prototype.toString.call(obj) === "[object Object]";
}

/**
 * 创建表单回显的对象
 * @param {*} obj
 */
export function createFormField(obj) {
  let target = {};
  if (isObject(obj)) {
    for (let [key, value] of Object.entries(obj)) {
      target[key] = Form.createFormField({
        value,
      });
    }
  }
  return target;
}

/**
 * 将img标签转换为【图片】
 * @param {string} str
 */
export function replaceImg(str) {
  if (typeof str === "string") {
    str = str.replace(/<img(.*?)>/g, "[图片]");
  }
  return str;
}

/**
 * 图片预加载
 * @param arr
 * @constructor
 */
export function preloadingImages(arr) {
  if (Array.isArray(arr)) {
    arr.forEach((item) => {
      const img = new Image();
      img.src = item;
    });
  }
}
/**
 * 根据某个属性值从MenuList查找拥有该属性值的menuItem
 * @param {Array} menuList
 * @param {String} key
 * @param {String} value
 * @returns {Object}
 */
export function getMenuItemInMenuListByProperty(menuList, key, value) {
  let stack = [];
  stack = stack.concat(menuList);
  let res;
  while (stack.length) {
    let cur = stack.shift();
    if (cur.children && cur.children.length > 0) {
      stack = cur.children.concat(stack);
    }
    if (value === cur[key]) {
      res = cur;
    }
  }
  return res;
}
/**
 * 数字添加分隔符，每三位数后面添加
 * @param {*} num
 * @return {*}
 */
export function numFormat(num) {
  if (num == null) {
    return;
  }
  if (!isNaN(num)) {
    num = num.toString();
  }
  if (num.indexOf(".") != -1) {
    var decimals = num.split(".")[1];
    return (
      (parseInt(Number(num)) + "").replace(
        /\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,
        "$&,"
      ) +
      "." +
      decimals.substring(0, 2)
    );
  } else {
    return (parseInt(Number(num)).toFixed(0) + "").replace(
      /\d{1,3}(?=(\d{3})+(\.\d*)?$)/g,
      "$&,"
    );
  }
}

/**
 * @description 将时间戳转换为年-月-日-时-分-秒格式
 * @param {String} timestamp
 * @returns {String} 年-月-日-时-分-秒
 */

export function timestampToTime(timestamp) {
  var date = new Date(timestamp);
  var Y = date.getFullYear() + "-";
  var M =
    (date.getMonth() + 1 < 10
      ? "0" + (date.getMonth() + 1)
      : date.getMonth() + 1) + "-";
  var D = (date.getDate() < 10 ? "0" + date.getDate() : date.getDate()) + " ";
  var h =
    (date.getHours() < 10 ? "0" + date.getHours() : date.getHours()) + ":";
  var m =
    (date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes()) +
    ":";
  var s = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();

  let strDate = Y + M + D + h + m + s;
  return strDate;
}
