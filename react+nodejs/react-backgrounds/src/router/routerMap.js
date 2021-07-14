/*
 * @Descripttion:
 * @version:
 * @Author: peng
 * @Date: 2021-07-02 15:42:17
 * @LastEditors: peng
 * @LastEditTime: 2021-07-14 13:46:32
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
const ComponentModel = Loadable({
  loader: () => import("@/views/page/FeedbackDemo"),
  loading: Loading,
});
const ComponentBtn = Loadable({
  loader: () => import("@/views/page/ButtonDemo"),
  loading: Loading,
});
const ComponentText = Loadable({
  loader: () => import("@/views/page/TypographyDemo"),
  loading: Loading,
});
const ComponentSelect = Loadable({
  loader: () => import("@/views/page/SelectDemo"),
  loading: Loading,
});
const DataVDemo = Loadable({
  loader: () => import("@/views/page/dataV"),
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
  { path: "/components/model", component: ComponentModel },
  { path: "/components/button", component: ComponentBtn },
  { path: "/components/Typography", component: ComponentText },
  { path: "/components/select", component: ComponentSelect },
  { path: "/dataV", component: DataVDemo }
];
