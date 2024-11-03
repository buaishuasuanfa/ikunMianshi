"use client";
import '@/components/QuestionDetail/index.css'
import { Editor } from "@bytemd/react";
import gfm from "@bytemd/plugin-gfm";
import highlight from "@bytemd/plugin-highlight";
import "bytemd/dist/index.css";
import "highlight.js/styles/vs.css";
import "./index.css";
import {Avatar, Card, List, Typography} from "antd";
import Link from "next/link";
import Title from "antd/es/typography/Title";
import {TagList} from "@/components/TagList";
import MdViewer from "@/components/MdViewer";

interface Props {
    questionVo: API.QuestionVO
}

/**
 * 题目详情组件
 * @param props
 * @constructor
 */
const QuestionDetail = (props: Props) => {
    const {questionVo} = props;
    return (
        <div>
            <Card>
                <Title level={1} style={{fontSize:24}}>{questionVo.title}</Title>
                <TagList tagList={questionVo.tags || []}/>
                <div style={{marginBottom:16}}/>
                <MdViewer value={questionVo.content || ''}/>
            </Card>
            <div style={{marginBottom:16}}/>
            <Card title='参考答案'>
                <MdViewer value={questionVo.answer || ''}/>
            </Card>
        </div>
    );
};

export default QuestionDetail;
