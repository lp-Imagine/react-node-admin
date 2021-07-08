/*
 * @Descripttion: 
 * @version: 
 * @Author: peng
 * @Date: 2021-07-06 17:28:20
 * @LastEditors: peng
 * @LastEditTime: 2021-07-06 17:28:52
 */
import server from "@/utils/request";
export function excelList() {
  return server({
    url: "/excel/list",
    method: "get",
  });
}
