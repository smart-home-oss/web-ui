import * as React from "react";
import EmptyProps from "../helpers/EmptyProps";
import {observer} from "mobx-react";
import {ERROR, HOUSES_LOADED, housesStore, LOADING} from "../store/HousesStore";
import House from "./House";
import KeyHelper from "../helpers/KeyHelper";
import HouseItem from "./HouseItem";
import {Row} from 'antd';
import {ErrorResult} from "../shared/ErrorResult";
import {CardSkeleton} from "../shared/CardSkeleton";

class HousesComponent extends React.Component<EmptyProps> {

    componentDidMount(): void {
        housesStore.loadHouses();
    }

    render() {
        switch (housesStore.state) {
            case HOUSES_LOADED:
                let key = new KeyHelper();
                let items = housesStore.houses.map((value: House) => <HouseItem key={key.next()} house={value}/>);
                items = (items.length < 1) ? <ErrorResult status={"NEW"}/> : items;

                return <Row>{items}</Row>;
            case LOADING:
                return <CardSkeleton/>;
            case ERROR:
                return <ErrorResult/>;
            default :
                return <div>Just a nyan cat running..</div>;
        }
    }
}

export default observer(HousesComponent);