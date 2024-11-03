"use server";
import Title from "antd/es/typography/Title";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";
import QuestionBankList from "@/components/QuestionBankList";

export default async function BanksPage() {
  let questionBankList = [];

  // 题库数不多，直接全量查询
  const pageSize = 200;
  // 服务端渲染，直接请求
  try {
    const questionBankRes = await listQuestionBankVoByPageUsingPost({
      pageSize,
      sortField: "createTime",
      sortOrder: "desc",
    });
    questionBankList = questionBankRes.data?.records ?? [];
  } catch (e: any) {
    console.error("查询题库列表失败" + e.message);
  }

  return (
    <div id="banks-page" className="max-width">
      <Title level={3}>题库大全</Title>
      <QuestionBankList questionBankList={questionBankList} />
    </div>
  );
}
