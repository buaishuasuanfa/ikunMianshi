"use client";
import "./index.css";
import { Card, List } from "antd";
import Link from "next/link";
import { TagList } from "@/components/TagList";

interface Props {
  questionBankId?: number;
  questionsList: API.QuestionVO[];
  chartTitle?: string;
}

/**
 * 题目列表组件
 * @param props
 * @constructor
 */
const QuestionList = (props: Props) => {
  const { questionsList = [], chartTitle, questionBankId } = props;

  return (
    <Card className="question-list" title={chartTitle}>
      <List
        dataSource={questionsList}
        renderItem={(item: API.QuestionVO) => (
          <List.Item extra={<TagList tagList={item.tags || []} />}>
            <List.Item.Meta
              title={
                <Link
                  href={
                    questionBankId
                      ? `/questionBank/${questionBankId}/question/${item.id}`
                      : `/question/${item.id}`
                  }
                >
                  {item.title}
                </Link>
              }
            />
          </List.Item>
        )}
      ></List>
    </Card>
  );
};

export default QuestionList;
