"use client";
import "./index.css";
import Search from "antd/es/input/Search";
import { useRouter } from "next/navigation";

interface SearchTitle {
  title?: string;
}

const QuestionSearch = (searchTitle?: SearchTitle) => {
  const router = useRouter();

  // 搜索栏搜索
  const onSearchAndClear = async (value?: string) => {
    if (value) {
      router.replace(`/questions?query=${value}`);
    } else {
      router.replace(`/questions`);
    }
  };

  return (
    <div
      className="question-search"
      style={{ textAlign: "center", marginBottom: 32 }}
    >
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