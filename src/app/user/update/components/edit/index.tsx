"use client";
import "./index.css";
import React from "react";
import { ProForm, ProFormText } from "@ant-design/pro-components";
import { useSelector } from "react-redux";
import { RootState } from "@/stores";

const EditSelf: React.FC = () => {
  const currentUser = useSelector((state: RootState) => state.loginUser);

  return (
    <ProForm <API.User>
        title="基本信息"
        layout='horizontal'
        submitter={{
          searchConfig: {
            submitText: '更新基本信息', // 修改提交按钮的文本
          },
        }}
    >
      <ProFormText width='xs' name='userName' label='姓名' initialValue={currentUser.userName} />

    </ProForm>
  );
};

export default EditSelf;