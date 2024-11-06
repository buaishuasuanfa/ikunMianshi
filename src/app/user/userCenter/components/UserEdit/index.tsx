"use client";
import "./index.css";
import {
  ModalForm,
  ProFormText,
  ProFormTextArea,
  ProFormUploadButton,
} from "@ant-design/pro-components";
import { EditOutlined, LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {Form, message} from "antd";
import React, { useEffect, useState } from "react";
import {updateMyUserUsingPost} from "@/api/userController";

interface Props {
  currentUser: API.LoginUserVO;
}

/**
 * 修改个人信息
 * @param props
 * @constructor
 */
const UserEdit = (props: Props) => {
  const { currentUser } = props;
  const [form] = Form.useForm();

  const userEdit = async (data:any) => {
    console.log(data.userAvatar[0].originFileObj)

    const params:API.updateMyUserUsingPOSTParams = {
      ...data || {},
      file:undefined,
      userAvatar: ""
    }
    console.log(params);

    try {
      let res;
      if (data.userAvatar[0].originFileObj){
        res = await updateMyUserUsingPost(params,{},data.userAvatar[0].originFileObj)
      }else {
        res = await updateMyUserUsingPost(params,{})
      }
      console.log(res.data)
      if (res.data)
        message.success("修改成功")
    }catch (e:any) {
      message.error("修改失败，请再次尝试："+e.message);
    }
  }

  const setInitValues = () => {
    form.setFieldsValue({
      userName: currentUser.userName,
      userProfile: currentUser.userProfile,
      description: currentUser.description,
      userAvatar: [
        {
          url: currentUser.userAvatar,
        },
      ],
    });
  }
  setInitValues()

  return (
    <ModalForm
      width="30%"
      modalProps={{
        onCancel:setInitValues
      }}
      form={form}
      className="user-edit"
      title="修改信息"
      trigger={<div>修改个人信息 {<EditOutlined />}</div>}
      onFinish={userEdit}
    >
      <ProFormUploadButton
        name="userAvatar"
        label="头像"
        max={1}
        fieldProps={{
          name: "file",
          listType: "picture-card",
        }}
      />
      <div style={{ marginTop: 16 }} />
      <ProFormText name="userName" label="用户名" />
      <ProFormText name="userProfile" label="简介" />
      <ProFormTextArea
        name="description"
        label="个人介绍"
        placeholder="我是一个沉默寡言的人，暂时没有任何介绍~~~"
      />
    </ModalForm>
  );
};

export default UserEdit;
