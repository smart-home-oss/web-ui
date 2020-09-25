import React from 'react'
import {Button, Result} from 'antd';

type ErrorProps = {
    status?: "NEW" |"500" | "403" | "404" | "warning",
    message?: string,
}
export function ErrorResult (props : ErrorProps) {
    let extra = <span/>
    let subTitle = props.message ? props.message : "Something bad happened."
    let status = props.status || "500";
    if(props.status === "NEW") {
        extra = <Button type="primary" key="console">
            Create new house
        </Button>
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