import React from 'react'
import {Layout, Menu} from 'antd';

export class Header extends React.Component{
    render() {
        return <Layout.Header>
            <div className="logo" />
            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['home']}>
                <Menu.Item key="home">Home</Menu.Item>
            </Menu>
        </Layout.Header>;
    }
}