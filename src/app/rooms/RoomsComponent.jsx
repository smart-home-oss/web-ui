import * as React from "react";
import {roomsStore} from "../store/RoomsStore";
import {ERROR, LOADING} from "../store/GenericStore";
import {ErrorResult} from "../shared/ErrorResult";
import {CardSkeleton} from "../shared/CardSkeleton";
import {observer} from "mobx-react";
import RoomsTree from "./ui/RoomsTree";
import {roomService} from "./RoomService";

type Props = {
    houseId: number
}

class RoomsComponent extends React.Component<Props> {

    selectedRoomId: number

    componentDidMount(): void {
        roomsStore.loadByHouseId(this.props.houseId)
    }

    componentDidUpdate(prevProps: Readonly<Props>) {
        if(this.props.houseId !== prevProps.houseId) {
            roomsStore.loadByHouseId(this.props.houseId)
        }
    }

    onSelect = (selectedKeys, info) => {
        this.selectedRoomId = info.node.key
    };

    onCreateRoom(name: string) {
        roomService.create(this.props.houseId, name)
    }

    onDeleteRoom() {
        if (this.selectedRoomId) {
            roomService.delete(this.selectedRoomId)
        }
    }

    render() {
        console.log("render rooms ", this.props.houseId)
        if (roomsStore.state === ERROR) {
            return <ErrorResult status={"404"} message={"We could not find rooms in this house"}/>;
        }

        if (roomsStore.state === LOADING) {
            return <CardSkeleton/>;
        }

        return <RoomsTree rooms={roomsStore.rooms}
                          houseId={this.props.houseId}
                          onSelect={(selectedKeys, info) => this.onSelect(selectedKeys, info)}
                          onCreate={(name) => {
                              this.onCreateRoom(name)
                          }}
                          onDelete={() => {
                              this.onDeleteRoom()
                          }}
        />
    }
}

export default observer(RoomsComponent)