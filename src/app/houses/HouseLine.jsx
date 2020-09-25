import * as React from "react";
import House from "./House";
import {Avatar, Col} from 'antd';

type Props = {
    house: House,
    key? : string,
    userId? : string,
}

export default function HouseLine(props: Props) {

    return <Col key={props.key || "house-item"} xs={24}>
        <Avatar src={"https://picsum.photos/seed/" + (props.userId || 42) + "1/96/96"}/>
        <label> {props.house.id} </label>
        <label> {props.house.name}</label>
    </Col>
}