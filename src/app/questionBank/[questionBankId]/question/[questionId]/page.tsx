"use server";
import { Flex, Menu } from "antd";
import { getQuestionBankVoByIdUsingGet } from "@/api/questionBankController";
import "./index,.css";
import Title from "antd/es/typography/Title";
import Sider from "antd/es/layout/Sider";
import { Content } from "antd/es/layout/layout";
import Link from "next/link";
import {getQuestionVoByIdUsingGet} from "@/api/questionController";
import QuestionDetail from "@/components/QuestionDetail";

export default async function QuestionBank({ params }) {
  const { questionBankId, questionId } = params;
  let bank = undefined;
  let question;

  // 服务端渲染，直接请求
  try {
    const questionBankRes = await getQuestionBankVoByIdUsingGet({
      id: questionBankId,
      needQueryQuestionList: true,
      pageSize: 200,
    });
    bank = questionBankRes?.data;
  } catch (e: any) {
    console.error("获取题库详情失败" + e.message);
  }

  if (!bank) {
    return <div>获取题库详情失败！请重新刷新页面</div>;
  }

  // 获取题目详情
  try {
    const questionBankRes = await getQuestionVoByIdUsingGet({
      id: questionId,
    });
    question = questionBankRes?.data;
  } catch (e: any) {
    console.error("获取题目详情失败" + e.message);
  }

  if (!bank) {
    return <div>获取题目详情失败！请重新刷新页面</div>;
  }

  const questionMenuItem = (bank.questionPage?.records || []).map((q) => {
    return {
      label: (
        <Link href={`/questionBank/${questionBankId}/question/${q.id}`}>
          {q.title}
        </Link>
      ),
      key: q.id,
    };
  });
  return (
    <div id="questionDetailWithBank">
      <Flex gap={24}>
        <Sider width={240} theme="light" style={{ padding: "24px 0" }}>
          <Title level={1} style={{ fontSize: 24 }}>
            {bank.title}
          </Title>
          <Menu items={questionMenuItem} selectedKeys={["questionId"]} />
        </Sider>
        <Content>
            <QuestionDetail questionVo={question}/>
        </Content>
      </Flex>
    </div>
  );
}
