/*
 * @Descripttion:
 * @version:
 * @Author: peng
 * @Date: 2021-07-02 15:42:17
 * @LastEditors: peng
 * @LastEditTime: 2021-07-10 14:27:05
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
const Tables = Loadable({
  loader: () => import("@/views/page/table"),
  loading: Loading,
});
const RichTexteditor = Loadable({
  loader: () => import("@/views/page/editutils/richTextEditor"),
  loading: Loading,
});
const MarkDown = Loadable({
  loader: () => import("@/views/page/editutils/markdown"),
  loading: Loading,
});
const Demo = Loadable({
  loader: () => import("@/views/page/Collection/index"),
  loading: Loading,
});

export default [
  { path: "/home", component: Home },
  { path: "/user/list", component: userList, roles: ["admin"] },
  { path: "/table", component: Tables },
  { path: "/excel/export", component: ExportExcel },
  { path: "/excel/upload", component: UploadExcel },
  { path: "/editor/richTexteditor", component: RichTexteditor },
  { path: "/editor/markdown", component: MarkDown },
  { path: "/demo", component: Demo },
];
