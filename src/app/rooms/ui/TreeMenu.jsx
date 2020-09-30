import * as React from "react";
import {MinusOutlined, PlusOutlined} from '@ant-design/icons';
import {Button, message, Popconfirm, Popover} from "antd";
import NewRoom from "./NewRoom";

type Props = {
    onCreate: (string) => {},
    onDelete: () => {},
}

export default function TreeMenu(props: Props) {
    return <div className={"room-tree-menu"} >
        <span>
            <Popover
                content={<NewRoom onCreate={(name) => {
                    props.onCreate(name)
                }}/>}
                title="Add new room" trigger="click">

                  <Button shape="square" icon={<PlusOutlined/>}/>
            </Popover>
            <Popconfirm
                key="confirm-delete-button"
                title="Are you sure delete this room ?"
                onConfirm={() => {
                    message.success('The room is going to be deleted')
                    props.onDelete();
                }}
                onCancel={() => {
                    message.info('Sure, no hurry.')
                }}
                okText="Delete the room ?"
                cancelText="Nah, maybe later"
            >
                <Button shape="square" icon={<MinusOutlined/>}/>
            </Popconfirm>

        </span>
    </div>
}