import React from 'react'
import {Button, Result} from 'antd';

type ErrorProps = {
    status?: "NEW" |"500" | "403" | "404"
}
export function ErrorResult (props : ErrorProps) {
    let extra = {}
    let subTitle = "Something bad happened."
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