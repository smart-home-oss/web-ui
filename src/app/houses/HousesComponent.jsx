import * as React from "react";
import EmptyProps from "../helpers/EmptyProps";
import {observer} from "mobx-react";
import {housesStore} from "../store/HousesStore";
import KeyHelper from "../helpers/KeyHelper";
import HouseItem from "./ui/HouseItem";
import {Row} from 'antd';
import {ErrorResult} from "../shared/ErrorResult";
import {CardSkeleton} from "../shared/CardSkeleton";
import {EMPTY, ERROR, LOADING} from "../store/GenericStore";

class HousesComponent extends React.Component<EmptyProps> {

    componentDidMount(): void {
        housesStore.loadHouses();
    }

    render() {
        if (housesStore.state === LOADING) {
            return <CardSkeleton/>;
        }

        if (housesStore.state === ERROR) {
            return <ErrorResult status={"warning"} message={housesStore.errorMessage}/>;
        }

        if (housesStore.state === EMPTY) {
            return <ErrorResult status={"NEW"}/>;
        }

        let key = new KeyHelper();
        let items = housesStore.houses.map(h => <HouseItem key={key.next()} house={h}/>);
        items = (items.length < 1) ? <ErrorResult status={"NEW"}/> : items;

        return <Row>{items}</Row>
    }
}

export default observer(HousesComponent);