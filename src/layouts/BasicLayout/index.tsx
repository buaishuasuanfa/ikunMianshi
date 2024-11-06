"use client";
import { GithubFilled, LogoutOutlined, UserOutlined } from "@ant-design/icons";
import { ProLayout } from "@ant-design/pro-components";
import { Dropdown, message } from "antd";
import React from "react";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import GlobalFooter from "@/components/GlobalFooter";
import "./index.css";
import { menus } from "../../../config/menu";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/stores";
import { getAccessibleMenus } from "@/access/menuAccess";
import { userLogoutUsingPost } from "@/api/userController";
import { setLoginUser } from "@/stores/loginUserSlice";
import { DEFAULT_USER } from "@/constants/user";
import SearchInput from "@/layouts/BasicLayout/components";

interface Props {
  children: React.ReactNode;
}

export default function BasicLayout({ children }: Props) {
  const pathname = usePathname();
  const loginUser = useSelector((state: RootState) => state.loginUser);
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  // 用户登出
  const userLogout = async () => {
    try {
      await userLogoutUsingPost();
      message.success("退出成功");
      // 保存用户登录态
      dispatch(setLoginUser(DEFAULT_USER));
      router.push("/user/login");
    } catch (e: any) {
      message.error("操作失败" + e.message);
    }
  };
  // 登录用户操作
  const onAvatarItemClick = async (event: { key: React.Key }) => {
    const { key } = event;
    if (key === "logout") {
      userLogout();
    }
    if (key === "userCenter") {
      if (pathname.startsWith('/user')) {
        router.push(("/user/userCenter"));
      }else {
        router.replace(("/user/userCenter"));
      }
    }
    if (key === "edit") {
      if (pathname.startsWith('/user')) {
        router.push(("/user/update"));
      }else {
        router.replace(("/user/update"));
      }
    }
  };

  return (
    <div
      id="bisicLayout"
      style={{
        height: "100vh",
        overflow: "auto",
      }}
    >
      <ProLayout
        title="ikun面试刷题平台"
        layout="top"
        logo={
          <Image
            src={"/assets/logo.png"}
            height={32}
            width={32}
            alt={"ikun面试刷题平台"}
          />
        }
        location={{
          pathname,
        }}
        avatarProps={{
          src: loginUser.userAvatar,
          size: "small",
          title: loginUser.userName,
          render: (props, dom) => {
            if (!loginUser.id) {
              return (
                <div
                  onClick={() => {
                    router.push("/user/login");
                  }}
                >
                  {dom}
                </div>
              );
            }
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "userCenter",
                      icon: <UserOutlined />,
                      label: "个人中心",
                    },
                    {
                      key: "edit",
                      label: "编辑信息",
                    },
                    {
                      key: "logout",
                      icon: <LogoutOutlined />,
                      label: "退出登录",
                    },
                  ],
                  onClick: onAvatarItemClick,
                }}
              >
                {dom}
              </Dropdown>
            );
          },
        }}
        actionsRender={(props) => {
          if (props.isMobile) return [];
          if (pathname === "/questions") {
            return [
              <a
                key="GithubFilled"
                href={"https://github.com/buaishuasuanfa/ikunmianshi"}
                target={"_blank"}
              >
                <GithubFilled />
              </a>,
            ];
          }
          return [
            <SearchInput key="search" />,
            <a
              key="GithubFilled"
              href={"https://github.com/buaishuasuanfa/ikunmianshi"}
              target={"_blank"}
            >
              <GithubFilled />
            </a>,
          ];
        }}
        headerTitleRender={(logo, title, _) => {
          return (
            <a>
              {logo}
              {title}
            </a>
          );
        }}
        onMenuHeaderClick={(e) => console.log(e)}
        // 导航栏菜单
        menuDataRender={() => {
          return getAccessibleMenus(loginUser, menus);
        }}
        // 导航栏样式
        menuItemRender={(item, dom) => (
          <Link href={item.path || "/"}>{dom}</Link>
        )}
        // 渲染底部栏
        footerRender={() => {
          return <GlobalFooter />;
        }}
      >
        {children}
      </ProLayout>
    </div>
  );
}
