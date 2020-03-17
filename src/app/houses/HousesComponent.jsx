import * as React from "react";
import EmptyProps from "../helpers/EmptyProps";
import {observer} from "mobx-react";
import {housesStore} from "../store/HousesStore";
import House from "./House";
import KeyHelper from "../helpers/KeyHelper";
import HouseItem from "./HouseItem";

class HousesComponent extends React.Component<EmptyProps> {

    componentDidMount(): void {
        housesStore.loadHouses().subscribe();
    }

    render() {

        let items: [] = <li>No houses found</li>;
        let key = new KeyHelper();

        if (housesStore.houses) {
            items = [];
            housesStore.houses.forEach((value: House) => {
                let item = <div key={key.next()} className={"column is-quarter"}>
                    <HouseItem house={value} />
                </div>;

                items.push(item)
            });
        }

        return <div>
            <h1 className="title">Houses</h1>
            <h2 className="subtitle">Review the list of existing houses</h2>
            <div className="container is-fullhd">
                <div className="columns is-multiline">
                    {items}
                </div>
            </div>
        </div>;
    }

}

export default observer(HousesComponent);