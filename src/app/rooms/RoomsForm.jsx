import * as React from "react";
import Room from "./Room";
import KeyHelper from "../helpers/KeyHelper";

type Params = {
    rooms: Room[],
    current: Room[]
}

export default class RoomsForm extends React.Component<Params> {

    render() {
        let trs = [];
        let key = new KeyHelper();

        if (this.props.rooms) {
            this.props.rooms.forEach((value: Room) => {
                let item = <tr key={key.next()}>
                    <th>{value.id}</th>
                    <td>{value.name}</td>
                </tr>;

                trs.push(item)
            });
        }

        return <span>Rooms details</span>
    }

}