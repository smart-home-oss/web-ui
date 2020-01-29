import * as React from "react";
import EmptyProps from "../helpers/EmptyProps";
import {observer} from "mobx-react";
import {housesStore} from "../store/HousesStore";
import HouseForm from "./HouseForm";
import {roomsStore} from "../store/RoomsStore";
import RoomsForm from "./RoomsForm";

class HouseDetailsComponent extends React.Component<EmptyProps> {

    componentDidMount(): void {
        housesStore.setCurrentHouse(parseInt(this.props.match.params.houseId));
    }

    render() {
        let houseForm;
        let roomsForm;

        if (housesStore.current) {
            const h = housesStore.current;
            houseForm = <HouseForm house={h} onChange={(event) => {
                console.log("on house form - on change, ", event)
            }}/>;

        } else {
            houseForm = "House not found...";
        }

        if (roomsStore.current) {
            roomsForm = <RoomsForm current={roomsStore.current}
                                   rooms={roomsStore.rooms} />
        } else {
            roomsForm = "No house = No rooms!";
        }

        return <div>
            <div className="columns is-desktop">
                <div className="column">
                    <h3 className="title">House details</h3>
                    {houseForm}
                </div>
                <div className="column">
                    <h3 className="title">Rooms</h3>
                    {roomsForm}
                </div>
            </div>


        </div>
    }

}

export default observer(HouseDetailsComponent);