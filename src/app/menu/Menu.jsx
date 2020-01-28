import EmptyProps from "../helpers/EmptyProps";
import * as React from "react";
import {observer} from "mobx-react";
import {Link} from "react-router-dom";

class Menu extends React.Component<EmptyProps> {


    render() {
        return (
            <div>

                <div/>
                {/*<Link to={"/devices"}>Devices</Link>*/}

                <nav className="level">
                    <div className="level-right">
                        <div className="level-item">
                            <label className={"margin-right-small is-5"}>
                                <strong>Smart Home OSS</strong>
                            </label>

                            <Link to={"/houses"} className="level-item">Houses</Link>
                        </div>
                    </div>
                </nav>
            </div>
        );
    }


}

export default observer(Menu)
// export default Menu