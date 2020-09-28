import * as React from "react";
import House from "../objects/House";
import {Dropdown, Menu} from 'antd';
import DeleteHouse from "./DeleteHouse";
import KeyHelper from "../../helpers/KeyHelper";

type Props = {
    house: House,
    key?: string,
    userId?: string,
    onDelete: (id : number) => {}
}

export default function HouseDetailsMenu(props: Props) {

    const keyHelper: KeyHelper = new KeyHelper();

    const menu = <Menu>
        <Menu.Item key={keyHelper.next()}>
            <DeleteHouse onDelete={() => props.onDelete(props.house.id)}/>
        </Menu.Item>
    </Menu>

    return  <Dropdown.Button overlay={menu}/>
}