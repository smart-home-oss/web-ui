import React from 'react'
import {Button, Result} from 'antd';
import {PlusCircleOutlined} from "@ant-design/icons";
import {Link} from "react-router-dom";

type ErrorProps = {
    status?: "NEW" |"500" | "403" | "404" | "warning",
    message?: string,
}
export function ErrorResult (props : ErrorProps) {
    let extra = <span/>
    let subTitle = props.message ? props.message : "Something bad happened."
    let status = props.status || "500";
    if(props.status === "NEW") {
        extra = <Link key={"new-house-button"} to={"/new/house"}>
            <Button key="1" type="primary" icon={<PlusCircleOutlined />}>
                New house
            </Button>
        </Link>
        status = "404";
        subTitle = "Nothing in here"
    }

    return <Result
        status={status}
        title="Ouch"
        subTitle={subTitle}
        extra={extra}
    />;
}