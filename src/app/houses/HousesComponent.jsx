import * as React from "react";
import EmptyProps from "../helpers/EmptyProps";
import {observer} from "mobx-react";
import {housesStore} from "../store/HousesStore";
import House from "./House";
import KeyHelper from "../helpers/KeyHelper";
import {Link} from "react-router-dom";

class HousesComponent extends React.Component<EmptyProps> {

    componentDidMount(): void {
        housesStore.loadHouses().subscribe();
    }

    render() {

        let trs: [] = <li>No houses found</li>;
        let key = new KeyHelper();

        if (housesStore.houses) {
            trs = [];
            housesStore.houses.forEach((value: House) => {
                let item = <tr key={key.next()} >
                    <th>{value.id}</th>
                    <td>{value.number}</td>
                    <td>{value.street}</td>
                    <td>{value.postCode}</td>
                    <td><Link to={"/houses/" + value.id}>edit</Link></td>
                </tr>;

                trs.push(item)
            });
        }

        return <div>
            <h1 className="title">Houses</h1>
            <h2 className="subtitle">Review the list of existing houses</h2>
            <table className="table">
                <thead>
                <tr>
                    <th title="Id">Id</th>
                    <th><abbr title="Number">Nr.</abbr></th>
                    <th title="Street">Street</th>
                    <th title="Post code">PostCode</th>
                    <th title="Action">Action</th>
                </tr>
                </thead>
                <tbody>
                {trs}
                </tbody>
            </table>
        </div>;
    }

}

export default observer(HousesComponent);