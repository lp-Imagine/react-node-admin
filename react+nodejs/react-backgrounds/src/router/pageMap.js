/*
 * @Descripttion:
 * @version:
 * @Author: peng
 * @Date: 2021-07-14 13:44:19
 * @LastEditors: peng
 * @LastEditTime: 2021-07-15 17:45:08
 */
import Loadable from "react-loadable";
import Loading from "@/components/Loading";

const MyDataV = Loadable({
  loader: () => import("@/views/myDataV"),
  loading: Loading,
});
const TableDetail = Loadable({
  loader: () => import("@/components/tableDetail"),
  loading: Loading,
});

export default [
  { path: "/myDataV", component: MyDataV },
  { path: "/tableDetail/:id", component: TableDetail },
];
