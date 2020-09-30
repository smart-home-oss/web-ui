import * as React from "react";
import {MinusOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, message, Popconfirm, Popover} from "antd";
import NewRoom from "./NewRoom";

type Props = {
    onCreateDevice: (string) => {},
    onDeleteDevice: () => {},
}

export default function TreeMenu(props: Props) {
    return <div className={"room-tree-menu"} >
        <Button shape="square" icon={<PlusOutlined/>}
                onClick={() => props.onCreateDevice()}>
            Add device</Button>
        <Popconfirm
            key="confirm-delete-button"
            title="Are you sure delete this device ?"
            onConfirm={() => {
                message.success('The device is going to be deleted')
                props.onDeleteDevice();
            }}
            onCancel={() => {
                message.info('Sure, no hurry.')
            }}
            okText="Yeah, delete this device"
            cancelText="Nah, maybe later"
        >
            <Button shape="square" icon={<MinusOutlined/>}>Delete device</Button>
        </Popconfirm>
    </div>
}