import * as React from "react";
import {Col, Row, Tree} from "antd";
import {DownOutlined} from '@ant-design/icons';
import Room from "../objects/Room";
import TreeItem from "../objects/TreeItem";
import TreeMenu from "./TreeMenu";

type Props = {
    houseId: number,
    rooms: Room[],
    onSelect: (selectedKeys, info) => {},
    onCreate: (string) => {},
    onDelete: () => {},
}

export default function RoomsTree(props: Props) {

    let treeData = [];
    props.rooms.forEach(r => {
        treeData.push(TreeItem.fromRoom(r))
    })

    return <div>
        <Row>
            <Col className={"house-room-tree"}>
                <TreeMenu onCreate={(name) => {props.onCreate(name)}}
                          onDelete={props.onDelete} />
                <Tree showLine switcherIcon={<DownOutlined/>}
                      onSelect={props.onSelect} treeData={treeData}/>
            </Col>
        </Row>
    </div>
}