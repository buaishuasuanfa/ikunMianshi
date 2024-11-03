"use client";
import "./index.css";
import Search from "antd/es/input/Search";
import { listQuestionVoByPageUsingPost } from "@/api/questionController";
import { message } from "antd";
import { useRouter } from "next/navigation";

interface SearchTitle {
  title?: string;
}

const QuestionSearch = (searchTitle?: SearchTitle) => {
  const router = useRouter();

  // 搜索栏搜索
  const onSearchAndClear = async (value?: string) => {
    if (value) {
      const res = await listQuestionVoByPageUsingPost({ title: value });
      if (res.data) {
        router.replace(`/questions?query=${value}`);
      } else {
        message.error("查询失败");
      }
    } else {
      const res = await listQuestionVoByPageUsingPost({});
      if (res.data) {
        router.replace(`/questions`);
      } else {
        message.error("查询失败");
      }
    }
  };

  return (
    <div style={{ textAlign: "center", marginBottom: 32 }}>
      <Search
        allowClear={true}
        placeholder="搜索题目"
        enterButton="搜索"
        size="large"
        defaultValue={searchTitle?.title}
        style={{ width: "50%" }}
        onSearch={onSearchAndClear}
        onClear={onSearchAndClear}
      />
    </div>
  );
};

export default QuestionSearch;