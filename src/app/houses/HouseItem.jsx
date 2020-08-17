import * as React from "react";
import House from "./House";
import {Link} from "react-router-dom";
import { Card, Avatar } from 'antd';
import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';

const { Meta } = Card;
type HouseProps = {
    house: House
}
export default class HouseItem extends React.Component<HouseProps> {

    render() {
        return <Card
                style={{ width: 250 }}
                cover={
                    <img
                        alt="example"
                        src={"https://picsum.photos/seed/" + this.props.house.id + "1/250/110"}
                    />
                }
                actions={[
                    <SettingOutlined key="setting" />,
                    <EditOutlined key="edit" />,
                    <EllipsisOutlined key="ellipsis" />,
                ]}
            >
                <Meta
                    avatar={<Avatar src={"https://picsum.photos/seed/" + this.props.house.id + "1/96/96"} />}
                    title={this.props.house.id}
                    description={this.props.house.name}
                />
            </Card>;
    }

}