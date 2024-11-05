"use client";
import "./index.css";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";
import { Avatar, Card, Col, Row } from "antd";
import Title from "antd/es/typography/Title";
import Paragraph from "antd/es/typography/Paragraph";
import {useState} from "react";
import CalendarChart from "@/app/user/userCenter/CalendarChart";

const UserCenter: React.FC = () => {
  const currentUser = useSelector((state: RootState) => state.loginUser);
  // 控制菜单栏Tab
  const [activeTabKey, setActiveTabKey] = useState<string>('record');
  const user = currentUser;
  return (
    <div id="userCenter" className="max-width">
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={24} md={6}>
          <Card style={{ textAlign: "center" }}>
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
          </Card>
        </Col>
        <Col xs={24} sm={24} md={18}>
          <Card
          tabList={[
            {
              key: 'record',
              label: "刷题记录"
            },
            {
              key: 'another',
              label: "其他"
            }
          ]}
          activeTabKey={activeTabKey}
          onTabChange={(value) => {setActiveTabKey(value)}}>
            {activeTabKey === 'record' && <CalendarChart/>}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default UserCenter;