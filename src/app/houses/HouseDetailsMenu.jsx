import * as React from "react";
import House from "./House";
import {Button, Col, PageHeader} from 'antd';
import {DeleteOutlined,} from '@ant-design/icons';
import { Popconfirm, message } from 'antd';

type Props = {
    house: House,
    key?: string,
    userId?: string,
    onDelete: (id : number) => {}
}

export default function HouseDetailsMenu(props: Props) {

    return <Col key={props.key || "house-item"} xs={24}>
        <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title={props.house.name}
            subTitle={"ID: " + props.house.id}
            extra={[
                <Popconfirm
                    key="confirm-delete-button"
                    title="Are you sure delete this house ?"
                    onConfirm={() => {
                        message.success('The house is going to be deleted')
                        props.onDelete(props.house.id);
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
                </Popconfirm>,
            ]}
        >
        </PageHeader>

    </Col>
}