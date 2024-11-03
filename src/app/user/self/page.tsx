"use client";
import "./index.css";
import ProCard from "@ant-design/pro-card";
import Title from "antd/es/typography/Title";
import { Avatar, Flex } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";

const UserSelf: React.FC = () => {
  const currentUser = useSelector((state: RootState) => state.loginUser);

  return (
    <div id="userSelf" className="max-width">
      <Title>{currentUser.userName}</Title>
      <Flex wrap={false} gap={"large"}>
        <ProCard style={{ width: "50%" }}>
          <Flex vertical align={"center"} gap={"middle"}>
            <Avatar
              size={128}
              src={currentUser.userAvatar || <UserOutlined />}
            />
            个人信息
          </Flex>
        </ProCard>
        <ProCard>个人具体内容</ProCard>
      </Flex>
    </div>
  );
};

export default UserSelf;