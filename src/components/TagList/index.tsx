"use client";
import React from "react";
import './index.css'
import Link from "next/link";
import {Tag} from "antd";

interface Props {
    tagList: string[]
}
/**
 * 全局底部栏组件
 * @constructor
 */
export const TagList:React.FC<Props> = (props: Props) => {

    const { tagList = [] } = props;

  return (
    <div
      className="tag-list"
    >
        {tagList.map((tag) => (
            <Tag color='red' key={tag}>{tag}</Tag>
        ))}
    </div>
  );
}
