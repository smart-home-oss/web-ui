import * as React from "react";
import EmptyProps from "../helpers/EmptyProps";
import {observer} from "mobx-react";
import {housesStore} from "../store/HousesStore";

class HouseDetailsComponent extends React.Component<EmptyProps> {

    componentDidMount(): void {
        housesStore.setCurrentHouse(parseInt(this.props.match.params.houseId));
    }

    render() {
        let house = "House not found";

        if(housesStore.currentHouse) {
            const h = housesStore.currentHouse;
            house = <ul>
                <li>{h.id}</li>
                <li>{h.number}</li>
                <li>{h.street}</li>
                <li>{h.postCode}</li>
            </ul>
        }

        return <div>
            {house}
        </div>
    }

}

export default observer(HouseDetailsComponent);