import React from 'react'
import {Breadcrumb as BreadcrumbAntd} from 'antd';

export class Breadcrumb extends React.Component {

    render() {
        return <BreadcrumbAntd style={{ margin: '16px 0' }}>
            <BreadcrumbAntd.Item>Houses</BreadcrumbAntd.Item>
            <BreadcrumbAntd.Item>Sunny house</BreadcrumbAntd.Item>
            <BreadcrumbAntd.Item>TODO handle the routing and reflect here the actual path</BreadcrumbAntd.Item>
        </BreadcrumbAntd>;
    }
}