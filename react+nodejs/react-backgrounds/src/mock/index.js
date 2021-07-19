/*
 * @Descripttion:
 * @version:
 * @Author: peng
 * @Date: 2021-07-06 17:32:00
 * @LastEditors: peng
 * @LastEditTime: 2021-07-19 11:09:29
 */
import Mock from "mockjs";
import loginAPI from "./login";
import remoteSearchAPI from "./remoteSearch";
import excelAPI from "./excel";
import tableAPI from "./table";
import monitor from "./monitor";

// 登录与用户相关
// Mock.mock(/\/user\/login/, "post", loginAPI.login);
// Mock.mock(/\/user\/logout/, "post", loginAPI.logout);
// Mock.mock(/\/userInfo/, "get", loginAPI.getUserInfo);
// Mock.mock(/\/user\/userList/, "get", loginAPI.getUsers);
// Mock.mock(/\/user\/deleteUser/, "post", loginAPI.deleteUser);
// Mock.mock(/\/user\/editInfo/, "put", loginAPI.editUserInfo);

// Mock.mock(/\/user\/validatUserID/, "post", loginAPI.ValidatUserID);
// Mock.mock(/\/user\/add/, "post", loginAPI.addUser);

// dashboard
Mock.mock(/\/transaction\/list/, "get", remoteSearchAPI.transactionList);

// excel
Mock.mock(/\/excel\/list/, "get", excelAPI.excelList);

// table
Mock.mock(/\/table\/list/, "post", tableAPI.tableList);
Mock.mock(/\/table\/delete/, "post", tableAPI.deleteItem);
Mock.mock(/\/table\/edit/, "post", tableAPI.editItem);

// monitor
Mock.mock(/\/monitor/, "post", monitor.monitor);

export default Mock;
