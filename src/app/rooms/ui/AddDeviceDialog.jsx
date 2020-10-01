import * as React from "react";
import {useEffect, useState} from "react";
import {List, Modal} from "antd";
import {devicesService} from "../../devices/DevicesService";
import Device from "../../devices/Device";

type Props = {
    visible: boolean,
    handleOk: () => {},
    handleCancel: () => {},
}

export default function AddDeviceDialog(props: Props) {

    const [devices: Device[], setDevices] = useState([]);

    useEffect(() => {
        let replay = devicesService.findUnassigned();
        replay.subscribe(d => {
            setDevices(d)
        })

        return () => {replay.unsubscribe()}
    })

    return <Modal
        title="Basic Modal"
        visible={props.visible}
        onOk={props.handleOk}
        onCancel={() => {if(props.handleCancel) props.handleCancel()}}
    >
        <List
            bordered
            dataSource={devices}
            renderItem={(item: Device) => (
                <List.Item>
                    {item.name}
                </List.Item>
            )}
        />
    </Modal>
}