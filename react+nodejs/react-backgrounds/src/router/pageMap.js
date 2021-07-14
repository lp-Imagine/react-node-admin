/*
 * @Descripttion:
 * @version:
 * @Author: peng
 * @Date: 2021-07-14 13:44:19
 * @LastEditors: peng
 * @LastEditTime: 2021-07-14 16:48:34
 */
import Loadable from "react-loadable";
import Loading from "@/components/Loading";

const MyDataV = Loadable({
  loader: () => import("@/views/myDataV"),
  loading: Loading,
});

export default [{ path: "/myDataV", component: MyDataV }];
