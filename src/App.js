import React from 'react';
import {Route} from "react-router-dom";

import './App.scss';
import {Layout} from 'antd';
import {Footer} from "./app/shared/Footer";
import {Header} from "./app/shared/Header";
import HousesComponent from "./app/houses/HousesComponent";
import HouseDetailsComponent from "./app/houses/HouseDetailsComponent";
import DevicesComponent from "./app/devices/DevicesComponent";
import DeviceDetailsComponent from "./app/devices/DeviceDetailsComponent";

class App extends React.Component {

    render() {
        return (
            <Layout>
                <Header/>
                <Layout.Content>
                    <Route exact path='/onboarding' component={OnboardingComponent} />
                    <Route exact path='/houses' component={HousesComponent} />
                    <Route exact path='/houses/:houseId' component={HouseDetailsComponent} />
                    <Route exact path='/devices' component={DevicesComponent} />
                    <Route exact path='/devices/:houseId' component={DeviceDetailsComponent} />
                </Layout.Content>
                <Footer/>
            </Layout>
        );
    }
}

export default App;
