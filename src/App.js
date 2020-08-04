import React from 'react';
import './App.scss';
import { Layout, Menu, Breadcrumb } from 'antd';
import {Footer} from "./app/shared/Footer";
import {Header} from "./app/shared/Header";

const { Content } = Layout;

class App extends React.Component {

    render() {
        return (
            <Layout className="layout">
                <Header />
                <Footer />
            </Layout>
        );
    }
}

export default App;
