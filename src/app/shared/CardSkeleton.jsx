import React from 'react'
import {Card, Col, Skeleton} from 'antd';

export function CardSkeleton(props) {

    return <Col xs={2} sm={4} md={6} lg={8} xl={5}>
        <Card
            style={{width: "100%"}}
            actions={[<span>Loading..</span>]}>
            <Skeleton active/>
        </Card>
    </Col>;
}