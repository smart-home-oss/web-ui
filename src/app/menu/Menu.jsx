import EmptyProps from "../helpers/EmptyProps";
import * as React from "react";
import {observer} from "mobx-react";
import {Link} from "react-router-dom";

class Menu extends React.Component<EmptyProps> {


    render() {
        return (
            <div>
                <Link to={"/houses"}>Houses</Link>
                <div />
                <Link to={"/devices"}>Devices</Link>
            </div>
        );
    }


}

export default observer(Menu)
// export default Menu