import * as React from "react";
import {Tree} from "antd";
import {DownOutlined} from '@ant-design/icons';
import Room from "../objects/Room";
import TreeItem from "../objects/TreeItem";
import TreeMenu from "./TreeMenu";

type Props = {
    houseId: number,
    rooms: Room[],
    onSelect: (any, any) => {},
    onCreate: (string) => {},
    onDelete: () => {},
}

export default function RoomsTree(props: Props) {

    let treeData = [];

    props.rooms.forEach(r => {
        treeData.push(TreeItem.fromRoom(r))
    })

    return <div>
        <TreeMenu onCreate={(name) => {props.onCreate(name)}}
                  onDelete={props.onDelete}/>
        <Tree className={"margin-small"}
              showLine switcherIcon={<DownOutlined/>}
              onSelect={props.onSelect} treeData={treeData}/>
    </div>
}