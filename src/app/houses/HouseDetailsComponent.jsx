import * as React from "react";
import EmptyProps from "../helpers/EmptyProps";
import {observer} from "mobx-react";
import {housesStore} from "../store/HousesStore";
import HouseForm from "./HouseForm";

class HouseDetailsComponent extends React.Component<EmptyProps> {

    componentDidMount(): void {
        housesStore.setCurrentHouse(parseInt(this.props.match.params.houseId));
    }

    render() {
        let houseForm;

        if (housesStore.currentHouse) {
            const h = housesStore.currentHouse;
            houseForm = <HouseForm house={h} onChange={(event) => {
                console.log("on house form - on change, ", event)
            }}/>
        } else {
            houseForm = "House not found..."
        }

        return <div>
            <div className="columns is-desktop">
                <div className="column">
                    <h3 className="title">House details</h3>
                    {houseForm}
                </div>
                <div className="column">
                    <h3 className="title">Rooms</h3>
                </div>
            </div>


        </div>
    }

}

export default observer(HouseDetailsComponent);