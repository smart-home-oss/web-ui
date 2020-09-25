import * as React from "react";
import House from "./House";
import {Button, Col, PageHeader} from 'antd';
import {DeleteOutlined,} from '@ant-design/icons';

type Props = {
    house: House,
    key?: string,
    userId?: string,
    onDelete: (id : number) => {}
}

export default function HouseLine(props: Props) {

    return <Col key={props.key || "house-item"} xs={24}>
        <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title={props.house.name}
            subTitle={"ID: " + props.house.id}
            extra={[
                <Button key="1" type="danger" icon={<DeleteOutlined/>}
                        onClick={() => props.onDelete(props.house.id)}>
                    Delete
                </Button>,
            ]}
        >
        </PageHeader>

    </Col>
}