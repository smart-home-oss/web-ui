import React from 'react'
import {Button, Col, Layout, Row} from 'antd';
import {Link} from "react-router-dom";
import {PlusCircleOutlined} from "@ant-design/icons";

export default function Header() {
    return <Layout.Header>
        <Row>
            <Col span={8}>
                <Link to={{pathname: "/"}}>
                    <h1 className="logo">Smart House OSS</h1>
                </Link>
            </Col>
            <Col span={16} offset={0} className={"align-right"}>
                <Link key={"new-house-button"} to={"/new/house"}>
                    <Button key="1" type="primary" icon={<PlusCircleOutlined />}>
                        New house
                    </Button>
                </Link>
            </Col>
        </Row>




    </Layout.Header>;
}