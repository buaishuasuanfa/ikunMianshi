"use client";
import {
  GithubFilled,
  LogoutOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import { ProLayout } from "@ant-design/pro-components";
import { Dropdown, Input, theme } from "antd";
import React from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import GlobalFooter from "@/components/GlobalFooter";
import './index.css';
import {menus} from "../../../config/menu";
import {useSelector} from "react-redux";
import {RootState} from "@/stores";

interface SearchInputProps {
  key?: string;
}

/**
 * 通用布局
 * @param key
 * @constructor
 */
const SearchInput = ({ key }: SearchInputProps) => {
  const { token } = theme.useToken();
  return (
    <div
      key="SearchOutlined"
      aria-hidden
      style={{
        display: "flex",
        alignItems: "center",
        marginInlineEnd: 24,
      }}
      onMouseDown={(e) => {
        e.stopPropagation();
        e.preventDefault();
      }}
    >
      <Input
        style={{
          borderRadius: 4,
          marginInlineEnd: 12,
        }}
        prefix={<SearchOutlined style={{}} />}
        placeholder="搜索题目"
        variant="borderless"
      />
    </div>
  );
};

interface Props {
  children: React.ReactNode;
}

export default function BasicLayout({ children }: Props) {
  const [pathname] = usePathname();

    const loginUser = useSelector((state: RootState) => state.loginUser);


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
            return (
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "logout",
                      icon: <LogoutOutlined />,
                      label: "退出登录",
                    },
                  ],
                }}
              >
                {dom}
              </Dropdown>
            );
          },
        }}
        actionsRender={(props) => {
          if (props.isMobile) return [];
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
          return menus
        }}
        // 导航栏样式
        menuItemRender={(item, dom) => (
          <Link href={item.path || "/"}>{dom}</Link>
        )}
        // 渲染底部栏
          footerRender={()=>{
            return <GlobalFooter/>
          }}
      >
        {children}
      </ProLayout>
    </div>
  );
}
