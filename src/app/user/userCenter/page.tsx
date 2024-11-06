"use client";
import "./index.css";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import { Avatar, Card, Col, Flex, Row } from "antd";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import React, { useState } from "react";
import { ProFormTextArea } from "@ant-design/pro-components";
import dayjs from "dayjs";
import UserEdit from "@/app/user/userCenter/components/UserEdit";
import CalendarChart from "@/app/user/userCenter/components/CalendarChart";

const UserCenter: React.FC = () => {
  const currentUser = useSelector((state: RootState) => state.loginUser);

  // 控制菜单栏Tab
  const [activeTabKey, setActiveTabKey] = useState<string>("record");
  const user = currentUser;
  const createTime = dayjs(user.createTime).format("YYYY-MM-DD");
  return (
    <div id="userCenter" className="max-width">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={6}>
          <Card style={{ textAlign: "center", height: 500 }}>
            <Flex gap="small" style={{ width: "100%" }} justify="flex-end">
              <UserEdit currentUser={user}/>
            </Flex>
            <div style={{ marginBottom: 32 }}></div>
            <Avatar src={user.userAvatar} size={128} />
            <div style={{ marginBottom: 16 }}></div>
            <Card.Meta
              title={
                <Title style={{ marginBottom: 0 }} level={4}>
                  {user.userName}
                </Title>
              }
              description={
                <Paragraph type={"secondary"}>{user.userProfile}</Paragraph>
              }
            />
            <div style={{ marginBottom: 16 }}></div>
            <ProFormTextArea secondary disabled style={{ height: 350 }}>
              {user.description ? user.description : "我是一个沉默寡言的人，暂时没有任何介绍~~~"}
            </ProFormTextArea>
            <div style={{ width: "100%", fontSize: "smaller" }}>
              注册时间：{createTime}
            </div>
          </Card>
        </Col>
        <Col xs={24} sm={24} md={18}>
          <Card
            style={{ height: 500 }}
            tabList={[
              {
                key: "record",
                label: "刷题记录",
              },
              {
                key: "another",
                label: "其他",
              },
            ]}
            activeTabKey={activeTabKey}
            onTabChange={(value) => {
              setActiveTabKey(value);
            }}
          >
            {activeTabKey === "record" && <CalendarChart/>}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UserCenter;