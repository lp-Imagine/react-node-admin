/*
 * @Descripttion: 
 * @version: 
 * @Author: peng
 * @Date: 2021-07-16 13:44:16
 * @LastEditors: peng
 * @LastEditTime: 2021-07-16 13:44:27
 */
import server from "@/utils/request";

export function tracker(data) {
  return server({
    url: "/monitor",
    method: "post",
    data,
  });
}
