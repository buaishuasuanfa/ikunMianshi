"use client";
import '@/components/QuestionBankList/index.css'
import { Editor } from "@bytemd/react";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import "bytemd/dist/index.css";
import "highlight.js/styles/vs.css";
import "./index.css";
import {Avatar, Card, List, Typography} from "antd";
import Link from "next/link";

interface Props {
    questionBankList: API.QuestionVO[]
}

/**
 * 题目列表组件
 * @param props
 * @constructor
 */
const QuestionBankList = (props: Props) => {

    const {questionBankList = []} = props;

    return (
        <List className="question-bank-list"
              grid={{
                  gutter:16,
                  column:4,
                  xs:1,
                  sm:1,
                  md:3,
                  lg:3,
              }}
            dataSource={questionBankList}
              renderItem={(item: API.QuestionBankVO) => (
                  <List.Item>
                      <Card>
                          <Link href={`/questionBank/${item.id}`}>
                              <Card.Meta
                                avatar={<Avatar src={item.picture}/>}
                                title={item.title}
                                description={
                                  <Typography.Paragraph
                                    type='secondary'
                                    ellipsis={{rows:1}}
                                    style={{marginRight:0}}
                                  >
                                      {item.description}
                                  </Typography.Paragraph>
                                }
                              />
                          </Link>
                      </Card>
                  </List.Item>
              )}
        />
    );
};

export default QuestionBankList;
