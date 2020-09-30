import * as React from "react";
import {useState} from "react";
import Room from "../objects/Room";
import RoomDetailsMenu from "./RoomDetailsMenu";
import AddDeviceDialog from "./AddDeviceDialog";

type Props = {
    room: Room,
}

export default function RoomDetails(props: Props) {
    const [deviceDialogVisible, setDeviceDialogVisible] = useState(false);

    return <div>
        <RoomDetailsMenu onCreateDevice={() => setDeviceDialogVisible(true)}
                         onDeleteDevice={() => console.log("delete device")}/>

        <AddDeviceDialog visible={deviceDialogVisible}
                         handleOk={(d) => {console.log("add selected device")}}
                         handleCancel={() => setDeviceDialogVisible(false)}/>
    </div>
}