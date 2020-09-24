import React from 'react'
import {Layout, Menu} from 'antd';

export class Header extends React.Component{
    render() {
        return <Layout.Header>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['houses']}>
                <Menu.Item key="houses">Houses</Menu.Item>
            </Menu>
        </Layout.Header>;
    }
}