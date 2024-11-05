"use client";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import { ProTable } from "@ant-design/pro-components";
import React, { useEffect, useRef, useState } from "react";
import { queryEsQuestionsUsingPost } from "@/api/questionController";
import "./index.css";
import { TagList } from "@/components/TagList";
import Link from "next/link";

interface Props {
  defaultQuestionList: API.QuestionVO[];
  defaultTotal: number;
  defaultSearchParams?: API.QuestionQueryRequest;
}

/**
 * 题目页面
 *
 * @constructor
 */
const QuestionTable = (props: Props) => {
  const { defaultQuestionList, defaultTotal } = props;
  const actionRef = useRef<ActionType>();
  // 默认参数
  const [questionList, setQuestionList] = useState<API.QuestionVO[]>(
    defaultQuestionList || [],
  );
  const [total, setTotal] = useState<number>(defaultTotal || 0);
  // 是否为首次加载
  const [firstLoading, setFirstLoading] = useState(true);

  const onSearch = async (params, sort, filter) => {
    // 判断是否为首次加载
    if (firstLoading) {
      setFirstLoading(false);
      if (defaultTotal) {
        return {};
      }
    }

    const sortField = Object?.keys(sort)?.[0] || "createTime";
    const sortOrder = sort?.[sortField] || "descend";

    const { data, code } = await queryEsQuestionsUsingPost({
      ...params,
      sortField,
      sortOrder,
      ...filter,
    } as API.QuestionQueryRequest);
    const newData = data?.records || [];
    const newTotal = data?.total || 0;
    console.log(newData);

    setQuestionList(newData);
    setTotal(newTotal);

    return {
      success: code === 0,
    };
  };

  useEffect(() => {
    setQuestionList(defaultQuestionList);
  }, [defaultQuestionList]);
  /**
   * 表格列配置
   */
  const columns: ProColumns<API.QuestionVO>[] = [
    {
      dataIndex: "index",
      valueType: "indexBorder",
      width: 48,
    },
    {
      title: "标题",
      dataIndex: "title",
      valueType: "text",
      hideInSearch: true,
      render: (_, record) => {
        return <Link href={`/question/${record.id}`}>{record.title}</Link>;
      },
    },
    {
      title: "标签",
      dataIndex: "tags",
      valueType: "select",
      fieldProps: {
        mode: "tags",
      },
      render: (_, record) => {
        const tagList = record.tags || [];
        return <TagList tagList={tagList} />;
      },
    },
  ];

  return (
    <ProTable<API.QuestionVO>
      className="question-table"
      headerTitle={"查询表格"}
      actionRef={actionRef}
      rowKey="key"
      search={{
        labelWidth: "auto",
        filterType: "light",
      }}
      // 隐藏工作栏
      options={false}
      // params={searchParams}
      dataSource={questionList}
      pagination={{
        total,
        showTotal: (total) => `总共${total}条`,
        pageSize: 12,
      }}
      request={onSearch}
      columns={columns}
    />
  );
};
export default QuestionTable;
