"use client";
import "@/components/QuestionDetail/index.css";
import "bytemd/dist/index.css";
import "highlight.js/styles/vs.css";
import "./index.css";
import { Card } from "antd";
import Title from "antd/es/typography/Title";
import { TagList } from "@/components/TagList";
import MdViewer from "@/components/MdViewer";
import useAddUserSignInRecord from "@/hooks/useAddUserSignInRecord";

interface Props {
  questionVo: API.QuestionVO;
}

/**
 * 题目详情组件
 * @param props
 * @constructor
 */
const QuestionDetail = (props: Props) => {
  const { questionVo } = props;

  useAddUserSignInRecord();
  return (
    <div>
      <Card>
        <Title level={1} style={{ fontSize: 24 }}>
          {questionVo.title}
        </Title>
        <TagList tagList={questionVo.tags || []} />
        <div style={{ marginBottom: 16 }} />
        <MdViewer value={questionVo.content || ""} />
      </Card>
      <div style={{ marginBottom: 16 }} />
      <Card title="参考答案">
        <MdViewer value={questionVo.answer || ""} />
      </Card>
    </div>
  );
};

export default QuestionDetail;
