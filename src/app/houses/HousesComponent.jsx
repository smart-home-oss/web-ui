import * as React from "react";
import EmptyProps from "../helpers/EmptyProps";
import {observer} from "mobx-react";
import {ERROR, HOUSES_LOADED, housesStore, LOADING} from "../store/HousesStore";
import House from "./House";
import KeyHelper from "../helpers/KeyHelper";
import HouseItem from "./HouseItem";
import { Col, Row } from 'antd';

class HousesComponent extends React.Component<EmptyProps> {

    componentDidMount(): void {
        housesStore.loadHouses();
    }

    render() {

        let rows: [] = <li>No houses found</li>;
        let key = new KeyHelper();

        switch (housesStore.state) {
            case HOUSES_LOADED:
                rows = [];
                let columns = [];
                housesStore.houses.forEach((value: House) => {
                    let column = <Col key={key.next()} span={8}>
                            <HouseItem house={value}/>
                        </Col>;
                    columns.push(column)

                    if(columns.length === 3) {
                        let row = <Row gutter={10} style={{marginTop: 10}}>
                            {columns}
                        </Row>;
                        rows.push(row)

                        columns = [];
                    }
                });
                // TODO, make it better, this if should be part of the forEach
                if(columns.length > 0) {
                    let row = <Row gutter={10} style={{marginTop: 10}}>
                        {columns}
                    </Row>;
                    rows.push(row)
                }

                break;
            case LOADING:
                rows = <li>Loading...</li>;
                break;
            case ERROR:
                rows = <li>Error</li>;
                break;
        }

        return <div>
            <h1>Houses</h1>
            <div className="site-card-wrapper">
                {rows}
            </div>
        </div>;
    }

}

export default observer(HousesComponent);