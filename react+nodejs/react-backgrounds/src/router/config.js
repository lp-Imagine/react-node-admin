/*
 * @Descripttion:
 * @version:
 * @Author: peng
 * @Date: 2021-06-24 17:32:48
 * @LastEditors: peng
 * @LastEditTime: 2021-07-10 14:24:59
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
    title: "Table",
    icon: <TabletTwoTone />,
  },
  {
    title: "Excel",
    path: "/excel",
    icon: <FileExcelTwoTone />,
    roles: ["admin", "editor"],
    children: [
      {
        title: "导出Excel",
        path: "/excel/export",
        roles: ["admin", "editor"],
        icon: <FileExcelOutlined />,
      },
      {
        title: "上传Excel",
        path: "/excel/upload",
        roles: ["admin", "editor"],
        icon: <UploadOutlined />,
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
    title: "项目",
    path: "/demo",
    icon: <FolderOpenTwoTone />,
  },
];

export default menuList;
