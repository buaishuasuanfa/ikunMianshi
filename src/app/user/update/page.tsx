"use client";
import "./index.css";
import ProCard from "@ant-design/pro-card";
import { Menu, MenuProps } from "antd";
import { useState } from "react";
import EditSelf from "@/app/user/update/components/edit";

type MenuItem = Required<MenuProps>["items"][number];

const menuItems: MenuItem[] = [
  {
    key: "normal",
    label: "基本操作",
  },
  {
    key: "safe",
    label: "安全设置",
  },
  {
    key: "another",
    label: "其他操作",
  },
];

interface Prop {
  key: string;
}


const UserUpdate: React.FC = () => {
  const [key, setKey] = useState<string>("normal");

  const clickMenuItem: MenuProps["onClick"] = (e: any) => {
    setKey(e.key);
    console.log(e.key);
  };

  const SelfPage = () => {
      if(key === "normal") {
        return (<EditSelf/>)
      }
  };

  return (
    <div id="userUpdate" className="max-width">
      <ProCard split={"vertical"} style={{ height: "100%" }}>
        <Menu
          style={{ width: 220 }}
          items={menuItems}
          onClick={clickMenuItem}
        />
        <ProCard>
          <SelfPage/>
        </ProCard>
      </ProCard>
    </div>
  );
};

export default UserUpdate;