import {Button, Result} from "antd";
import React from "react";

/**
 * 无权限页面
 * @constructor
 */
const Forbidden = ()=>{
    return(
        <Result
            status='403'
            title='403'
            subTitle='抱歉，您无权限访问此页面'
            extra={
                <Button href='/' type='primary'>
                    返回首页
                </Button>
            }
        />
    );
};

export default Forbidden;