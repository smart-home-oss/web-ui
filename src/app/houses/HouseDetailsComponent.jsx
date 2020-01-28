import * as React from "react";
import EmptyProps from "../helpers/EmptyProps";
import {observer} from "mobx-react";
import {housesStore} from "../store/HousesStore";

class HouseDetailsComponent extends React.Component<EmptyProps> {

    componentDidMount(): void {
        housesStore.setCurrentHouse(parseInt(this.props.match.params.houseId));
    }

    render() {
        let house = "House not found";

        if (housesStore.currentHouse) {
            const h = housesStore.currentHouse;
            house = <div>
                <div className="field">
                    <label className="label">Id</label>
                    <div className="control">
                        <label className="input" placeholder="Id">{h.id}</label>
                    </div>
                </div>

                <div className="field">
                    <label className="label">Number</label>
                    <div className="control">
                        <input className="input is-success" type="text" placeholder="Number"
                               value={h.number}
                               onChange={event => {
                               }}/>
                    </div>
                    <p className="help is-success">Number, example: 15 or 23A</p>
                </div>

                <div className="field">
                    <label className="label">Street</label>
                    <div className="control">
                        <input className="input is-success" type="text" placeholder="Street"
                               value={h.street}
                               onChange={event => {
                               }}/>
                    </div>
                    <p className="help is-success">Street, example: Skypark Avenue</p>
                </div>

                <div className="field">
                    <label className="label">Street</label>
                    <div className="control">
                        <input className="input is-success" type="text" placeholder="Post code"
                               value={h.postCode}
                               onChange={event => {
                               }}/>
                    </div>
                    <p className="help is-success">Post code, example: L-1234</p>
                </div>
            </div>
        }

        return <div>
            {house}
        </div>
    }

}

export default observer(HouseDetailsComponent);