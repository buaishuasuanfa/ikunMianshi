"use server";
import "./index,.css";
import { getQuestionVoByIdUsingGet } from "@/api/questionController";
import QuestionDetail from "@/components/QuestionDetail";

export default async function QuestionBank({ params }) {
  const { questionId } = params;

  let question;

  // 获取题目详情
  try {
    const questionBankRes = await getQuestionVoByIdUsingGet({
      id: questionId,
    });
    question = questionBankRes?.data;
  } catch (e: any) {
    console.error("获取题目详情失败" + e.message);
  }

  if (!question) {
    return <div>获取题目详情失败！请重新刷新页面</div>;
  }
  return (
    <div id="questionDetail" className='max-width'>
      <QuestionDetail questionVo={question} />
    </div>
  );
}
