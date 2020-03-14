import React from 'react';
import './App.scss';
import {Route} from "react-router-dom";
import Menu from "./app/menu/Menu";
import HousesComponent from "./app/houses/HousesComponent";
import HouseDetailsComponent from "./app/houses/HouseDetailsComponent";
import DevicesComponent from "./app/devices/DevicesComponent";
import DeviceDetailsComponent from "./app/devices/DeviceDetailsComponent";
import {infoStore} from "./app/store/InfoStore";

class App extends React.Component {

    componentDidMount(): void {
        infoStore.loadInfos();
    }

    render() {
        return (
            <div className="container">
                <Route component={Menu}/>

                <div className="notification">
                    <Route exact path='/houses' component={HousesComponent} />
                    <Route exact path='/houses/:houseId' component={HouseDetailsComponent} />
                    <Route exact path='/devices' component={DevicesComponent} />
                    <Route exact path='/devices/:houseId' component={DeviceDetailsComponent} />
                </div>
            </div>
        );
    }
}

export default App;
