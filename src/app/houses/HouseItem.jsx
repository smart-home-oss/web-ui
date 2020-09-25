import * as React from "react";
import House from "./House";
import {Avatar, Card, Col} from 'antd';
import {PicsumImage} from "../shared/PicsumImage";
import {Link} from "react-router-dom";

const {Meta} = Card;

type Props = {
    house: House,
    userId? : string,
}

export default function HouseItem(props: Props) {

    return <Col xs={12} sm={12} md={8} lg={8} xl={6}>
        <Link to={"/houses/" + props.house.id}>
            <Card
                className={"house-item"}
                cover={<PicsumImage value={props.house.id}/>}>
                <Meta
                    avatar={<Avatar src={"https://picsum.photos/seed/" + (props.userId || 42) + "1/96/96"}/>}
                    title={props.house.id}
                    description={props.house.name}
                />
            </Card>
        </Link>
    </Col>
}