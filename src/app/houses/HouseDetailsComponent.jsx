import * as React from "react";
import EmptyProps from "../helpers/EmptyProps";
import {observer} from "mobx-react";
import {roomsStore} from "../store/RoomsStore";
import RoomsForm from "../rooms/RoomsForm";
import {ErrorResult} from "../shared/ErrorResult";
import {PageHeader} from "antd";
import HouseDetailsMenu from "./ui/HouseDetailsMenu";
import {currentHouseStore} from "../store/CurrentHouseStore";
import {ERROR, LOADING} from "../store/GenericStore";
import {houseService} from "./HouseService";
import {CardSkeleton} from "../shared/CardSkeleton";

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
        let roomsForm = <div/>

        if (currentHouseStore.state === ERROR) {
            return <ErrorResult status={"404"} message={"We could not find this house"}/>;
        }

        if (currentHouseStore.state === LOADING) {
            return <CardSkeleton/>;
        }

        if (roomsStore.current) {
            roomsForm = <RoomsForm current={roomsStore.current} rooms={roomsStore.rooms}/>
        }

        let h = currentHouseStore.current;

        return <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title={h.name}
            subTitle={"ID: " + h.id}
            extra={[
                <HouseDetailsMenu key={"menu"} house={h} onDelete={(id) => this.onHouseDelete(id)}/>
            ]}
        >
            {roomsForm}
        </PageHeader>
    }

}

export default observer(HouseDetailsComponent);