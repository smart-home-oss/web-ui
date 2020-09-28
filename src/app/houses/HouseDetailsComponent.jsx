import * as React from "react";
import EmptyProps from "../helpers/EmptyProps";
import {observer} from "mobx-react";
import {roomsStore} from "../store/RoomsStore";
import RoomsForm from "./RoomsForm";
import {ErrorResult} from "../shared/ErrorResult";
import {Row} from "antd";
import HouseDetailsMenu from "./HouseDetailsMenu";
import {currentHouseStore} from "../store/CurrentHouseStore";
import {LOADED} from "../store/GenericStore";
import {houseService} from "./HouseService";

class HouseDetailsComponent extends React.Component<EmptyProps> {

    componentDidMount(): void {
        currentHouseStore.loadHouse(parseInt(this.props.match.params.houseId))
    }

    onHouseDelete(id: number) {
        houseService
            .delete(id)
            .subscribe(
                () => {
                    this.props.history.push("/");
                },
                e => {
                    console.error(e)
                })
    }

    render() {
        let houseInfo, roomsForm

        if (currentHouseStore.state === LOADED) {
            houseInfo = currentHouseStore.current ?
                <HouseDetailsMenu house={currentHouseStore.current} onDelete={(id) => this.onHouseDelete(id)}/>
                :
                <ErrorResult status={"404"} message={"We could not find this house"}/>;
        }

        roomsForm = roomsStore.current ?
            <RoomsForm current={roomsStore.current} rooms={roomsStore.rooms}/>
            :
            "No house = No rooms!"

        return <div>
            <Row>
                {houseInfo}
            </Row>
            <Row>
                {roomsForm}
            </Row>
        </div>
    }

}

export default observer(HouseDetailsComponent);