import React from 'react';
import './App.css';
import {Route} from "react-router-dom";
import Menu from "./app/menu/Menu";
import HousesComponent from "./app/houses/HousesComponent";
import HouseDetailsComponent from "./app/houses/HouseDetailsComponent";
import DevicesComponent from "./app/devices/DevicesComponent";
import DeviceDetailsComponent from "./app/devices/DeviceDetailsComponent";

class App extends React.Component {

    render() {
        return (
            <div>
                <Route component={Menu}/>

                <Route exact path='/houses' component={HousesComponent} />
                <Route exact path='/houses/:houseId' component={HouseDetailsComponent} />
                <Route exact path='/devices' component={DevicesComponent} />
                <Route exact path='/devices/:houseId' component={DeviceDetailsComponent} />
            </div>
        );
    }
}

export default App;
