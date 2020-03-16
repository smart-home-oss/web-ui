import EmptyProps from "../helpers/EmptyProps";
import * as React from "react";
import {Link} from "react-router-dom";
import Version from "./Version";

export default class Menu extends React.Component<EmptyProps> {

    render() {
        return (
            <div>

                <div/>
                {/*<Link to={"/devices"}>Devices</Link>*/}

                <nav className="level navbar" role="navigation" aria-label="main navigation">
                    <div className="level-right">
                        <div className="level-item">
                            <label className={"margin-left-small margin-right-small is-5"}>
                                <strong>Smart Home OSS</strong>
                            </label>

                            <Link to={"/houses"} className="level-item navbar-item">Houses</Link>
                        </div>
                    </div>
                    <div className={"level-left"}>
                        <Version />
                    </div>
                </nav>
            </div>
        );
    }


}

// export default observer(Menu)