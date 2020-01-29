import * as React from "react";
import House from "./House";
import FormInput from "../shared/FormInput";

type Params = {
    house: House;
    onChange: (event: any) => {};
}

export default class HouseForm extends React.Component<Params> {

    render() {
        let h: House = this.props.house;
        let onChange = this.props.onChange;

        let div = "";

        if (h) {
            div = <div>

                <FormInput placeholder={"Id"} value={h.id} disabled={true}
                           onChange={onChange}
                           title={"Id"}/>

                <FormInput placeholder={"Number"} value={h.number}
                           title={"Number"}
                           onChange={onChange}
                           exampleText={"Number, example: 15 or 23A"}/>

                <FormInput placeholder={"Street"} value={h.street}
                           title={"Street"}
                           onChange={onChange}
                           exampleText={"Street, example: Skypark Avenue"}/>

                <FormInput placeholder={"Post code"} value={h.postCode}
                           title={"Post code"}
                           onChange={onChange}
                           exampleText={"Post code, example: L-1234"}/>

            </div>
        }

        return div;
    }

}