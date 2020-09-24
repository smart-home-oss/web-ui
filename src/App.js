import React from 'react';
import {Route, Redirect} from "react-router-dom";

import './App.scss';
import {Layout} from 'antd';
import {Footer} from "./app/shared/Footer";
import {Header} from "./app/shared/Header";
import HousesComponent from "./app/houses/HousesComponent";
import HouseDetailsComponent from "./app/houses/HouseDetailsComponent";
import DevicesComponent from "./app/devices/DevicesComponent";
import DeviceDetailsComponent from "./app/devices/DeviceDetailsComponent";
import {Breadcrumb} from "./app/shared/Breadcrumb";

class App extends React.Component {

    render() {
        return (
            <Layout className="layout">
                <Header/>
                <Layout.Content style={{ padding: '0 50px' }}>
                    <Breadcrumb />

                    <div className="site-layout-content">
                        <Route exact path="/">
                            <Redirect to="/houses" />
                        </Route>

                        <Route exact path='/houses' component={HousesComponent} />
                        <Route exact path='/houses/:houseId' component={HouseDetailsComponent} />
                        <Route exact path='/devices' component={DevicesComponent} />
                        <Route exact path='/devices/:houseId' component={DeviceDetailsComponent} />
                    </div>

                </Layout.Content>
                <Footer/>
            </Layout>
        );
    }
}

export default App;
