"use client";
import React from "react";
import './index.css'
import Link from "next/link";

/**
 * 全局底部栏组件
 * @constructor
 */
export default function GlobalFooter() {
    const currentYear = new Date().getFullYear()

  return (
    <div
      className="global-footer"
    >
        <div>@ {currentYear} 面试刷题平台</div>
        <Link href={"https://github.com/buaishuasuanfa/ikunmianshi"} target={"_blank"}>
            GitHub源码地址
        </Link>
    </div>
  );
}
