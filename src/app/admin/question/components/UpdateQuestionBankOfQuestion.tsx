"use client";
import { ModalForm } from "@ant-design/pro-components";
import React, { useState } from "react";
import { ProFormSelect } from "@ant-design/pro-form";
import {Form, message} from "antd";
import { listQuestionBankQuestionByPageUsingPost } from "@/api/questionBankQuestionController";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";
import {Simulate} from "react-dom/test-utils";
import cancel = Simulate.cancel;
import {values} from "lodash-es";
import {editQuestionBankIdsUsingPost} from "@/api/questionController";

interface Props {
  questionId?: number;
}

/**
 * 修改题目所属题库
 * @param props
 * @constructor
 */
const UpDateQuestionBankOfQuestion: React.FC<Props> = (props) => {
  const { questionId } = props;

  const [form] = Form.useForm();

  // 获取所属题库列表
  const getCurrentQuestionBankIdList = async () => {
    try {
      // 并行执行两个请求
      const [questionBankRes, res] = await Promise.all([
        listQuestionBankVoByPageUsingPost({
          pageSize: 200,
          sortField: "createTime",
          sortOrder: "descend",
        }),
        listQuestionBankQuestionByPageUsingPost({
          questionId,
          pageSize: 20,
        }),
      ]);
      const list = (res.data.records ?? []).map((item) => item.questionBankId);
      form.setFieldValue("questionBankIdList", list);
      setQuestionBankList(questionBankRes.data.records ?? []);
    }catch (e:any){
      console.error("获取题目所属题库列表失败，" + e.message);
    }
    /*
    try {
      const res = await listQuestionBankQuestionByPageUsingPost({
        questionId,
        pageSize: 20,
      });
      const list = (res.data.records ?? []).map((item) => item.questionBankId);
      form.setFieldValue("questionBankIdList", list);
      console.log(list);
    } catch (e: any) {
      console.error("获取题目所属题库列表失败，" + e.message);
    }

    // 题库数量不多，直接全量获取
    const pageSize = 200;
    try {
      const questionBankRes = await listQuestionBankVoByPageUsingPost({
        pageSize,
        sortField: "createTime",
        sortOrder: "descend",
      });

      setQuestionBankList(questionBankRes.data.records ?? []);
      console.log(questionBankRes);
    } catch (e: any) {
      console.error("获取题库列表失败，" + e.message);
    }*/
  };

  const [questionBankList, setQuestionBankList] = useState<
    API.QuestionBankVO[]
  >([]);



  // 修改题目所属题库
  const editQuestionBankIdsOfQuestion = async (values:string[])=>{
    JSON.stringify(values)
    console.log(JSON.stringify(values));
    console.log(values);

    try {
      const res = await editQuestionBankIdsUsingPost({
        questionBankIds: values,
        questionId
      })
      if (res.data){
        message.success("修改成功")
      }
    }catch (e:any) {
      message.error("修改失败："+e.message);
    }
  }

  return (
    <ModalForm
      form={form}
      title="修改所属题库"
      modalProps={{
        destroyOnClose: true,
      }}
      hideRequiredMark={true}
      trigger={<a onClick={getCurrentQuestionBankIdList}>修改所属题库</a>}
      onFinish={editQuestionBankIdsOfQuestion}
    >
      <ProFormSelect
        mode="tags"
        name="questionBankIdList"
        placeholder='请选择题库'
        options={questionBankList.map(questionBank=>{
          return {
            value: questionBank.id,
            label: questionBank.title
          }
        })}
        rules={[
          {
            required:true,
            message:'此项不能为空'
          }
        ]}
      />
    </ModalForm>
  );
};
export default UpDateQuestionBankOfQuestion;
