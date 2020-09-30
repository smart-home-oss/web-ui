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

class HouseDetailsComponent extends React.Component<EmptyProps> {

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

    render() {
        if (currentHouseStore.state === ERROR) {
            return <ErrorResult status={"404"} message={"We could not find this house"}/>;
        }

        if (currentHouseStore.state === LOADING || currentHouseStore.state === PENDING) {
            return <CardSkeleton/>;
        }

        console.log("render details " + currentHouseStore.current.id)

        return <PageHeader
            ghost={false}
            onBack={() => window.history.back()}
            title={currentHouseStore.current.name}
            subTitle={"ID: " + currentHouseStore.current.id}
            extra={[
                <HouseDetailsMenu key={"menu"} house={currentHouseStore.current}
                                  onDelete={(id) => this.onHouseDelete(id)}/>
            ]}
        >
            <RoomsComponent houseId={currentHouseStore.current.id}/>
        </PageHeader>
    }

}

export default observer(HouseDetailsComponent);