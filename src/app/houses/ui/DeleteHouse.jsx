import {Button, message, Popconfirm} from "antd";
import {DeleteOutlined} from "@ant-design/icons";
import * as React from "react";

type Props = {
    onDelete: () => {}
}
export default function DeleteHouse(props: Props) {
    return <Popconfirm
        key="confirm-delete-button"
        title="Are you sure delete this house ?"
        onConfirm={() => {
            message.success('The house is going to be deleted')
            props.onDelete();
        }}
        onCancel={() => {
            message.info('Sure, no hurry.')
        }}
        okText="Delete the house"
        cancelText="Nah, maybe later"
    >
        <Button key="delete-button" type="danger" icon={<DeleteOutlined/>}>
            Delete
        </Button>
    </Popconfirm>
}