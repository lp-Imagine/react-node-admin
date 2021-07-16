/*
 * @Descripttion:
 * @version:
 * @Author: peng
 * @Date: 2021-06-24 17:32:48
 * @LastEditors: peng
 * @LastEditTime: 2021-07-16 17:43:16
 */
import {
  HomeTwoTone,
  TeamOutlined,
  IdcardTwoTone,
  FileExcelOutlined,
  TabletTwoTone,
  FileTextTwoTone,
  UploadOutlined,
  FontSizeOutlined,
  FileExcelTwoTone,
  FileMarkdownOutlined,
  FolderOpenTwoTone,
  CodeTwoTone,
  FormatPainterOutlined,
  SearchOutlined,
  FileTextOutlined,
  SelectOutlined,
  PieChartTwoTone,
  FileZipOutlined,
  SoundTwoTone,
  BugOutlined,
  FireTwoTone,
  FontColorsOutlined,
  MediumOutlined,
} from "@ant-design/icons";

const menuList = [
  {
    path: "/home",
    title: "首页",
    icon: <HomeTwoTone />,
  },
  {
    path: "/user",
    title: "用户管理",
    icon: <IdcardTwoTone />,
    roles: ["admin"],
    children: [
      {
        path: "/user/list",
        title: "用户列表",
        icon: <TeamOutlined />,
        roles: ["admin"],
      },
    ],
  },
  {
    path: "/table",
    title: "表格",
    icon: <TabletTwoTone />,
  },
  {
    title: "Excel",
    path: "/excel",
    icon: <FileExcelTwoTone />,
    children: [
      {
        title: "导出Excel",
        path: "/excel/export",
        icon: <FileExcelOutlined />,
      },
      {
        title: "上传Excel",
        path: "/excel/upload",
        icon: <UploadOutlined />,
      },
      {
        title: "Zip",
        path: "/excel/zip",
        icon: <FileZipOutlined />,
      },
    ],
  },
  {
    title: "文本编辑器",
    path: "/editor",
    icon: <FileTextTwoTone />,
    children: [
      {
        title: "富文本",
        path: "/editor/richTexteditor",
        icon: <FontSizeOutlined />,
      },
      {
        title: "MarkDown",
        path: "/editor/markdown",
        icon: <FileMarkdownOutlined />,
      },
    ],
  },
  {
    title: "作品集",
    path: "/demo",
    icon: <FolderOpenTwoTone />,
  },
  {
    title: "UI组件",
    path: "/components",
    icon: <CodeTwoTone />,
    children: [
      {
        title: "弹出层",
        path: "/components/model",
        icon: <FormatPainterOutlined />,
      },
      {
        title: "按钮",
        path: "/components/button",
        icon: <SearchOutlined />,
      },
      {
        title: "Typography排版",
        path: "/components/Typography",
        icon: <FileTextOutlined />,
      },
      {
        title: "选择器",
        path: "/components/select",
        icon: <SelectOutlined />,
      },
    ],
  },
  {
    title: "可视化",
    path: "/dataV",
    icon: <PieChartTwoTone />,
  },
  {
    title: "动态",
    path: "/active",
    icon: <FireTwoTone />,
    children: [
      {
        title: "文字",
        path: "/active/font",
        icon: <FontColorsOutlined />,
      },
      {
        title: "动画",
        path: "/active/animation",
        icon: <MediumOutlined />,
      },
    ],
  },
  {
    title: "日志",
    path: "/log",
    icon: <SoundTwoTone />,
    children: [
      {
        title: "BUG收集",
        path: "/log/bug",
        icon: <BugOutlined />,
      },
    ],
  },
];

export default menuList;
