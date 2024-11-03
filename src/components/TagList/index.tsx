"use client";
import React from "react";
import "./index.css";
import { Tag } from "antd";

interface Props {
  tagList: string[];
}
/**
 * 标签组件
 * @constructor
 */
export const TagList: React.FC<Props> = (props: Props) => {
  const { tagList = [] } = props;

  return (
    <div className="tag-list">
      {tagList.map((tag) => (
        <Tag color="red" key={tag}>
          {tag}
        </Tag>
      ))}
    </div>
  );
};