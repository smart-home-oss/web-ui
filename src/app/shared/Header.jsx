import React from 'react'
import {Layout, Menu} from 'antd';
import {Link} from "react-router-dom";

export class Header extends React.Component {
    render() {
        return <Layout.Header>
            <Link to={{pathname: "/"}}>
                <h1 className="logo">Smart House OSS</h1>
            </Link>

            <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['houses']}>

                <Menu.Item key="houses">
                    <Link to={"/houses"}>
                        Houses
                    </Link>
                </Menu.Item>
            </Menu>
        </Layout.Header>;
    }
}