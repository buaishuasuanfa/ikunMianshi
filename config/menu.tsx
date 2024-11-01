import { MenuDataItem } from "@ant-design/pro-layout";
import {CrownOutlined, LogoutOutlined} from "@ant-design/icons";
import ACCESS_ENUMS from "@/access/accessEnums";
import path from "node:path";
import {Button} from "antd";
import Link from "next/link";
import {userLogoutUsingPost} from "@/api/userController";
import {ItemType} from "antd/es/menu/interface";

export const menus = [
  {
    path: "/",
    name: "主页",
  },
  {
    path: "/questions",
    name: "题目",
  },
  {
    path: "/banks",
    name: "题库",
  },
  {
    path: "/admin",
    name: "管理",
    icon: <CrownOutlined />,
    access: ACCESS_ENUMS.ADMIN,
    children: [
      {
        path: "/admin/user",
        name: "用户管理",
        access: ACCESS_ENUMS.ADMIN,
      },
    ],
  },
] as MenuDataItem[];

export const avatarMenus = [
  {
    key: 'edit',
    path: '/user/edit',
    label: '编辑信息'
  },
  {
    key: "logout",
    icon: <LogoutOutlined />,
    label: '退出登录'
  }
] as ItemType[]

export const findAllMenusItemByPath = (
  pathname: string,
): MenuDataItem | null => {
  return findMenuItemByPath(menus, pathname);
};

export const findMenuItemByPath = (
  menus: MenuDataItem[],
  pathname: string,
): MenuDataItem | null => {
  for (const menu of menus) {
    // 若当前选项的路径刚好匹配-》直接返回
    if (menu.path === pathname) return menu;

    // 若当前选项还有子选项
    if (menu.children) {
      // 递归
      const matchMenuItem = findMenuItemByPath(menu.children, pathname);
      if (matchMenuItem) return matchMenuItem;
    }
  }
  return null;
};
