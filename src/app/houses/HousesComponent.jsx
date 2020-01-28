import * as React from "react";
import EmptyProps from "../helpers/EmptyProps";
import {observer} from "mobx-react";
import {housesStore} from "../store/HousesStore";
import House from "./House";
import KeyHelper from "../helpers/KeyHelper";
import {Link} from "react-router-dom";

class HousesComponent extends React.Component<EmptyProps> {

    componentDidMount(): void {
        housesStore.loadHouses().subscribe();
    }

    render() {

        let li: [] = <li>No houses found</li>;
        let key = new KeyHelper();

        if (housesStore.houses) {
            li = [];
            housesStore.houses.forEach((value: House) => {
                li.push(<li key={key.next()} ><Link to={"/houses/" + value.id}>{value.number} {value.street} {value.postCode}</Link></li>)
            });
        }

        return <ul>
            <li>Houses component</li>
            {li}
        </ul>;
    }

}

export default observer(HousesComponent);