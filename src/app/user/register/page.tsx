"use client";
import "./index.css";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { LoginForm, ProForm, ProFormText } from "@ant-design/pro-components";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { userRegisterUsingPost } from "@/api/userController";
import { message } from "antd";
import { useRouter } from "next/navigation";

const UserRegisterPage: React.FC = () => {
  const [form] = ProForm.useForm();
  const router = useRouter();

  const doSubmit = async (values: API.UserRegisterRequest) => {
    try {
      const res = await userRegisterUsingPost(values);
      if (res.data) {
        message.success("注册成功");
        // 前往登录页面
        router.replace("/user/login");
        form.resetFields();
      } else {
        message.error("注册失败");
      }
    } catch (e) {
      message.error("注册失败" + e.message);
    }
  };

  return (
    <div id="user-register">
      <LoginForm
        form={form}
        logo={
          <Image src="/assets/logo.png" alt="面试坤" height={44} width={44} />
        }
        title="ikun面试"
        subTitle="小黑子喜欢的面试刷题平台"
        submitter={{
          searchConfig: {
            submitText: "注册",
          },
        }}
        onFinish={(values: API.UserRegisterRequest) => doSubmit(values)}
      >
        <ProFormText
          name="userAccount"
          fieldProps={{
            size: "large",
            prefix: <UserOutlined className={"prefixIcon"} />,
          }}
          placeholder={"请输入用户账号"}
          rules={[
            {
              required: true,
              message: "请输入用户账号!",
            },
          ]}
        />
        <ProFormText.Password
          name="userPassword"
          fieldProps={{
            size: "large",
            prefix: <LockOutlined className={"prefixIcon"} />,
          }}
          placeholder={"请输入用户密码"}
          rules={[
            {
              required: true,
              message: "请输入用户密码！",
            },
          ]}
        />
        <ProFormText.Password
          name="checkPassword"
          fieldProps={{
            size: "large",
            prefix: <LockOutlined className={"prefixIcon"} />,
          }}
          placeholder={"请再次输入用户密码"}
          rules={[
            {
              required: true,
              message: "请再次输入用户密码！",
            },
          ]}
        />

        <div
          style={{
            marginBlockEnd: 24,
          }}
        >
          <div
            style={{
              textAlign: "end",
            }}
          >
            已有账号？
            <Link href={"/user/login"}>去登录</Link>
          </div>
        </div>
      </LoginForm>
    </div>
  );
};

export default UserRegisterPage;