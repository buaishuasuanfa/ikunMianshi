"use server";
import { Avatar, Card } from "antd";
import { getQuestionBankVoByIdUsingGet } from "@/api/questionBankController";
import "./index,.css";
import Paragraph from "antd/es/typography/Paragraph";
import Title from "antd/es/typography/Title";
import Meta from "antd/es/card/Meta";
import QuestionList from "@/components/QuestionList";

export default async function QuestionBank({ params }) {
  const { questionBankId } = params;
  let bank = undefined;

  // 服务端渲染，直接请求
  try {
    const questionBankRes = await getQuestionBankVoByIdUsingGet({
      id: questionBankId,
      needQueryQuestionList: true,
      pageSize: 200,
    });
    bank = questionBankRes?.data;
  } catch (e: any) {
    console.error("获取题库列表失败" + e.message);
  }

  if (!bank) {
    return <div>获取题库详情失败！请重新刷新页面</div>;
  }
  return (
    <div id="bankPage" className="max-width">
      <Card>
        <Meta
          avatar={<Avatar src={bank.picture} size={72} />}
          title={
            <Title style={{ marginBottom: 0 }} level={3}>
              {bank.title}
            </Title>
          }
          description={
          <Paragraph>{bank.description}</Paragraph>
        }
        />
      </Card>
      <div style={{ marginBottom: 32 }} />
      <QuestionList
        questionBankId={questionBankId}
        questionsList={bank.questionPage?.records ?? []}
        chartTitle={`题目总数：${bank.questionPage?.total}`}
      />
    </div>
  );
}
