"use server";
import { Divider, Flex } from "antd";
import Title from "antd/es/typography/Title";
import Link from "next/link";
import { listQuestionBankVoByPageUsingPost } from "@/api/questionBankController";
import { listQuestionVoByPageUsingPost } from "@/api/questionController";
import QuestionList from "@/components/QuestionList";
import QuestionBankList from "@/components/QuestionBankList";

export default async function HomePage() {
  let questionList = [];
  let questionBankList = [];

  // 服务端渲染，直接请求
  try {
    const questionBankRes = await listQuestionBankVoByPageUsingPost({
      pageSize: 12,
      sortField: "createTime",
      sortOrder: "desc",
    });
    questionBankList = questionBankRes.data?.records ?? [];
  } catch (e: any) {
    console.error("查询题库列表失败" + e.message);
  }
  try {
    const questionRes = await listQuestionVoByPageUsingPost({
      pageSize: 12,
      sortField: "createTime",
      sortOrder: "desc",
    });
    questionList = questionRes.data?.records ?? [];
  } catch (e: any) {
    console.error("查询题目列表失败" + e.message);
  }

  return (
    <div id="homePage" className='max-width'>
      <Flex justify={"space-between"} align={"center"}>
        <Title level={3}>最新题库</Title>
        <Link href={"/questionBanks"}>查看更多</Link>
      </Flex>
      <QuestionBankList questionBankList={questionBankList}/>
      <Divider />
      <Flex justify={"space-between"} align={"center"}>
        <Title level={3}>最新题目</Title>
        <Link href={"/questions"}>查看更多</Link>
      </Flex>
      <QuestionList questionsList={questionList}/>
    </div>
  );
}
