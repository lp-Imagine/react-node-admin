/*
 * @Descripttion:
 * @version:
 * @Author: peng
 * @Date: 2021-07-02 15:42:17
 * @LastEditors: peng
 * @LastEditTime: 2021-07-06 18:05:10
 */
import Loadable from "react-loadable";
import Loading from "@/components/Loading";

const Home = Loadable({
  loader: () => import("@/views/page/home"),
  loading: Loading,
});
const userList = Loadable({
  loader: () => import("@/views/page/user/userList"),
  loading: Loading,
});
const ExportExcel = Loadable({
  loader: () => import("@/views/page/excel/exportExcel/index"),
  loading: Loading,
});
const UploadExcel = Loadable({
  loader: () => import("@/views/page/excel/uploadExcel/index"),
  loading: Loading,
});

export default [
  { path: "/home", component: Home },
  { path: "/user/list", component: userList },
  { path: "/excel/export", component: ExportExcel },
  { path: "/excel/upload", component: UploadExcel },
];
