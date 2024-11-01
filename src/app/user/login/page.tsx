"use client";
import "./index.css";

import { LockOutlined, UserOutlined } from "@ant-design/icons";
import {
  LoginForm,
  ProForm,
  ProFormCheckbox,
  ProFormText,
} from "@ant-design/pro-components";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { userLoginUsingPost } from "@/api/userController";
import { message } from "antd";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/stores";
import { setLoginUser } from "@/stores/loginUserSlice";
import { useRouter } from "next/navigation";

const UserLoginPage: React.FC = () => {
  const [form] = ProForm.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const doSubmit = async (values: API.UserLoginRequest) => {
    try {
      const res = await userLoginUsingPost(values);
      if (res.data) {
        message.success("登录成功");
        // 保存用户登录态
        dispatch(setLoginUser(res.data));
        router.replace("/");
        form.resetFields();
      } else {
        message.error("登录失败");
      }
    } catch (e) {
      message.error("登录失败" + e.message);
    }
  };

  return (
    <div id="user-login">
      <LoginForm
        form={form}
        logo={
          <Image src="/assets/logo.png" alt="面试坤" height={44} width={44} />
        }
        title="ikun面试"
        subTitle="小黑子喜欢的面试刷题平台"
        onFinish={(values: API.UserLoginRequest) => doSubmit(values)}
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

        <div
          style={{
            marginBlockEnd: 24,
          }}
        >
          <ProFormCheckbox noStyle name="autoLogin">
            自动登录
          </ProFormCheckbox>
          <div
            style={{
              float: "right",
            }}
          >
            还没有账号？
            <Link href={"/user/register"}>去注册</Link>
          </div>
        </div>
      </LoginForm>
    </div>
  );
};

export default UserLoginPage;