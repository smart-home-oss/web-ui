import * as React from "react";
import {roomsStore} from "../store/RoomsStore";
import {ERROR, LOADING} from "../store/GenericStore";
import {ErrorResult} from "../shared/ErrorResult";
import {CardSkeleton} from "../shared/CardSkeleton";
import {observer} from "mobx-react";
import RoomsTree from "./ui/RoomsTree";
import {roomService} from "./RoomService";
import {Col, Row} from "antd";
import RoomDetails from "./ui/RoomDetails";
import Room from "./objects/Room";

type Props = {
    houseId: number,
    onRoomSelected?: (Room) => {}
}

class RoomsComponent extends React.Component<Props> {

    constructor(props: Props, context: any) {
        super(props, context);
        this.state = {
            selectedRoom: {}
        }
    }

    componentDidMount(): void {
        roomsStore.loadByHouseId(this.props.houseId)
    }

    componentDidUpdate(prevProps: Readonly<Props>) {
        if (this.props.houseId !== prevProps.houseId) {
            roomsStore.loadByHouseId(this.props.houseId)
        }
    }

    onSelect(r: Room) {
        this.setState({selectedRoom: r})
        if(this.props.onRoomSelected) {
            this.props.onRoomSelected(r)
        }
    }

    onCreateRoom(name: string) {
        roomService.create(this.props.houseId, name)
    }

    onDeleteRoom() {
        if (this.state.selectedRoom) {
            roomService.delete(this.state.selectedRoom.id)
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

        return <Row>
            <Col className={"room-tree"} span={4}>
                <RoomsTree rooms={roomsStore.rooms}
                           houseId={this.props.houseId}
                           onSelect={(selectedKeys, info) => this.onSelect(selectedKeys, info)}
                           onCreate={(name) => this.onCreateRoom(name)}
                           onDelete={() => this.onDeleteRoom()}/>
            </Col>
            <Col className={"room-tree margin-left"} span={19}>
                <RoomDetails room={this.state.selectedRoom}/>
            </Col>
        </Row>

    }
}

export default observer(RoomsComponent)