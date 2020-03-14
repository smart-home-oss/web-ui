import EmptyProps from "../helpers/EmptyProps";
import * as React from "react";
import {observer} from "mobx-react";
import {Link} from "react-router-dom";
import {infoStore} from "../store/InfoStore";

class Menu extends React.Component<EmptyProps> {

    componentDidMount(): void {
        infoStore.loadInfos();
    }

    render() {

        let version: string = "..";
        if(infoStore.houseManagerVersion) {
            version = infoStore.houseManagerVersion.status;
        }
        console.log("render menu " , new Date());

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
                        <span>House Manager {version}</span>
                    </div>
                </nav>
            </div>
        );
    }


}

export default observer(Menu)