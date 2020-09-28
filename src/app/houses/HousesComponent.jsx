import * as React from "react";
import EmptyProps from "../helpers/EmptyProps";
import {observer} from "mobx-react";
import {housesStore} from "../store/HousesStore";
import KeyHelper from "../helpers/KeyHelper";
import HouseItem from "./HouseItem";
import {Row} from 'antd';
import {ErrorResult} from "../shared/ErrorResult";
import {CardSkeleton} from "../shared/CardSkeleton";
import {ERROR, LOADED, LOADING} from "../store/GenericStore";
import HousesMenu from "./HousesMenu";

class HousesComponent extends React.Component<EmptyProps> {

    componentDidMount(): void {
        housesStore.loadHouses();
    }

    onCreate() {

    }

    render() {
        let content;
        switch (housesStore.state) {
            case LOADED:
                let key = new KeyHelper();
                let items = housesStore.houses.map(h => <HouseItem key={key.next()} house={h}/>);
                items = (items.length < 1) ? <ErrorResult status={"NEW"}/> : items;

                content = <Row>{items}</Row>;
                break;
            case LOADING:
                content = <CardSkeleton/>;
                break;
            case ERROR:
                content = <ErrorResult status={"warning"} message={housesStore.errorMessage} />;
                break;
            default:
                content = <div>Just a nyan cat running..</div>;
        }

        return <div>
            <HousesMenu onCreate={() => this.onCreate()}/>
            {content}
        </div>
    }
}

export default observer(HousesComponent);