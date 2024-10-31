"use client";
import {AntdRegistry} from "@ant-design/nextjs-registry";

import "./globals.css";
import BasicLayout from "@/layouts/BasicLayout";
import React, {useCallback, useEffect} from "react";
import {Provider, useDispatch} from "react-redux";
import store, {AppDispatch} from "@/stores";
import {getLoginUserUsingGet} from "@/api/userController";
import {setLoginUser} from "@/stores/loginUserSlice";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh">
      <body>
        <AntdRegistry>
            <Provider store={store}>
                <InitLayout>
                    <BasicLayout>{children}</BasicLayout>
                </InitLayout>
            </Provider>
        </AntdRegistry>
      </body>
    </html>
  );
}

/**
 * 全局初始化逻辑
 * @param children
 * @constructor
 */
const InitLayout: React.FC<
    Readonly<{
        children: React.ReactNode;
    }>
> = ({ children }) =>{
    const dispatch = useDispatch<AppDispatch>();
    /**
     * 全局初始化函数，有全局单词调用的函数，都可以写到这里
     */
    const doInit = useCallback(async ()=>{
        // 获取用户信息
        const res = await getLoginUserUsingGet()
        if (res.data){
            // 初始化登录态
            dispatch(setLoginUser(res.data))
        }else {
            //  todo 测试代码
            /*setTimeout(()=>{
                const testUser = {'userName':'测试名称',id:1}
                dispatch(setLoginUser(testUser))
            },3000)*/
        }
    },[])

    useEffect(()=>{
        doInit();
    })

    return(
        children
    )
};
