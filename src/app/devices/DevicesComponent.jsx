import EmptyProps from "../helpers/EmptyProps";
import {observer} from "mobx-react";
import * as React from "react";
import {devicesStore} from "../store/DevicesStore";
import Device from "./Device";

class DevicesComponent extends React.Component<EmptyProps> {

    componentDidMount(): void {
        devicesStore.loadDevices().subscribe();
    }

    render() {

        let li: [] = devicesStore.devices.forEach((value: Device) => {
            return <li><a href={"/device/" + value.id}>{value.name}</a></li>
        });

        return <ul>
            <li>Devices component</li>
            {li}
        </ul>;
    }

}

export default observer(DevicesComponent)