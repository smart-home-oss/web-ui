import * as React from "react";
import Room from "../objects/Room";
import RoomDetailsMenu from "./RoomDetailsMenu";
import {Modal} from "antd";

type Props = {
    visible: boolean,
    handleOk: () => {},
    handleCancel: () => {},
}

export default function AddDeviceDialog(props: Props) {

    return <Modal
        title="Basic Modal"
        visible={props.visible}
        onOk={props.handleOk}
        onCancel={() => {if(props.handleCancel) props.handleCancel()}}
    >
        Add list of devices
    </Modal>
}