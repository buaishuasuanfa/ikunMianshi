"use server";
import {queryEsQuestionsUsingPost} from "@/api/questionController";
import QuestionTable from "@/components/QuestionTable";
import QuestionSearch from "@/app/questions/components/QuestionSearch";

/**
 * 题目列表
 * @constructor
 */
export default async function QuestionsPage({ searchParams }) {
  // 查询URL参数
  const { query:searchText } = searchParams;
  // 题目列表和总数
  let questionList = [];
  let total = 0;
  // 服务端渲染，直接请求
  try {
    const questionBankRes = await queryEsQuestionsUsingPost({
      searchText,
      pageSize: 12,
      sortField: "createTime",
      sortOrder: "desc",
    });
    questionList = questionBankRes.data?.records ?? [];
    total = questionBankRes?.data.total ?? 0;
  } catch (e: any) {
    console.error("查询题库列表失败" + e.message);
  }

  return (
    <div style={{width:'100%'}} id="questionPage" className="max-width">
      <QuestionSearch title={searchText}/>
      <QuestionTable defaultQuestionList={questionList} defaultTotal={total}  defaultSearchParams={{title:searchText}}/>
    </div>
  );
}
