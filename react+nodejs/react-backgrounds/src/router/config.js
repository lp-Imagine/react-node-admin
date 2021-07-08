/*
 * @Descripttion:
 * @version:
 * @Author: peng
 * @Date: 2021-06-24 17:32:48
 * @LastEditors: peng
 * @LastEditTime: 2021-07-06 17:37:54
 */
import {
  DesktopOutlined,
  TeamOutlined,
  UserOutlined,
  FileExcelOutlined,
} from "@ant-design/icons";

const menuList = [
  {
    path: "/home",
    title: "首页",
    icon: <DesktopOutlined />,
  },
  {
    path: "/user",
    title: "用户管理",
    icon: <UserOutlined />,
    children: [
      {
        path: "/user/list",
        title: "用户列表",
        icon: <TeamOutlined />,
      },
    ],
  },
  {
    title: "Excel",
    path: "/excel",
    icon: <FileExcelOutlined />,
    roles: ["admin", "editor"],
    children: [
      {
        title: "导出Excel",
        path: "/excel/export",
        roles: ["admin", "editor"],
      },
      {
        title: "上传Excel",
        path: "/excel/upload",
        roles: ["admin", "editor"],
      },
    ],
  },
];

export default menuList;
