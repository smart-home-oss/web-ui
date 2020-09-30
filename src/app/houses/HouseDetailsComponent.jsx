import * as React from "react";
import EmptyProps from "../helpers/EmptyProps";
import {observer} from "mobx-react";
import RoomsComponent from "../rooms/RoomsComponent";
import {ErrorResult} from "../shared/ErrorResult";
import {PageHeader} from "antd";
import HouseDetailsMenu from "./ui/HouseDetailsMenu";
import {currentHouseStore} from "../store/CurrentHouseStore";
import {ERROR, LOADING, PENDING} from "../store/GenericStore";
import {houseService} from "./HouseService";
import {CardSkeleton} from "../shared/CardSkeleton";
import Room from "../rooms/objects/Room";

class HouseDetailsComponent extends React.Component<EmptyProps> {

    constructor(props: P, context: any) {
        super(props, context);
        this.state = {
            room: {}
        }
    }

    componentDidMount(): void {
        currentHouseStore.loadHouse(parseInt(this.props.match.params.houseId))
    }

    onHouseDelete(id: number) {
        houseService
            .delete(id)
            .subscribe(
                () => {
                    this.props.history.push("/")
                },
                e => {
                    console.error(e)
                })
    }

    onRoomSelected(r: Room) {
        this.setState({room: r})
    }

    render() {
        if (currentHouseStore.state === ERROR) {
            return <ErrorResult status={"404"} message={"We could not find this house"}/>;
        }

        if (currentHouseStore.state === LOADING || currentHouseStore.state === PENDING) {
            return <CardSkeleton/>;
        }

        let h = currentHouseStore.current;
        let subTitle = "ID: " + h.id
        subTitle += this.state.room ? " / Room : " + this.state.room.name : ""

        return <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title={h.name}
            subTitle={subTitle}
            extra={[
                <HouseDetailsMenu key={"menu"}
                                  house={h}
                                  onDelete={(id) => this.onHouseDelete(id)}/>
            ]}
        >
            <RoomsComponent houseId={h.id}
                            onRoomSelected={(r) => this.onRoomSelected(r)}/>
        </PageHeader>
    }

}

export default observer(HouseDetailsComponent);