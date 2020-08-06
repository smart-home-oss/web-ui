import React from 'react';
import './App.scss';
import {Layout} from 'antd';
import {Footer} from "./app/shared/Footer";
import {Header} from "./app/shared/Header";
import {Content} from "./app/shared/Content";

class App extends React.Component {

    render() {
        return (
            <Layout>
                <Header/>
                <Content/>
                <Footer/>
            </Layout>
        );
    }
}

export default App;
