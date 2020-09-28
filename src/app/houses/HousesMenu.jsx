import * as React from "react";
import {Button, Col, PageHeader} from 'antd';
import {PlusCircleOutlined,} from '@ant-design/icons';
import {Link} from "react-router-dom";

type Props = {
    onCreate: () => {}
}

export default function HousesMenu(props: Props) {

    return <Col key={props.key || "house-item"} xs={24}>
        <PageHeader
            ghost={false}
            extra={[
                <Link key={"new-house-button"} to={"/new/house"}>
                    <Button key="1" type="primary" icon={<PlusCircleOutlined />}
                            onClick={() => props.onCreate()}>
                        New house
                    </Button>
                </Link>
                ,
            ]}
        >
        </PageHeader>

    </Col>
}