/*
 * @Descripttion:
 * @version:
 * @Author: peng
 * @Date: 2021-06-24 17:32:48
 * @LastEditors: peng
 * @LastEditTime: 2021-07-09 17:16:26
 */
import {
  DesktopOutlined,
  TeamOutlined,
  UserOutlined,
  FileExcelOutlined,
  TableOutlined,
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
    icon: <TableOutlined />,
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
