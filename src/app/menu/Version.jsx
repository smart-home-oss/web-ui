import * as React from "react";
import EmptyProps from "../helpers/EmptyProps";
import {infoStore} from "../store/InfoStore";
import {observer} from "mobx-react";
import VersionItem from "./VersionItem";
import {AppInfo} from "../store/AppInfo";
import KeyHelper from "../helpers/KeyHelper";

class Version extends React.Component<EmptyProps> {

    componentDidMount(): void {
        infoStore.loadInfos();
    }

    version(appInfo: AppInfo, key: KeyHelper) {
        return <VersionItem key={key.next()}
                            ok={appInfo.state==="OK"}
                            message={appInfo.message}
                            url={appInfo.url}
                            name={appInfo.name}
                            version={appInfo.version}/>
    }

    hr(key: KeyHelper) {
        return <hr key={key.next()}
                   className="dropdown-divider" />;
    }

    render() {
        let key = new KeyHelper();
        let items = [];
        items.push(this.version(infoStore.houseManagerVersion, key));
        items.push(this.hr(key));
        items.push(this.version(infoStore.userManagerVersion, key));
        items.push(this.hr(key));
        items.push(this.version(infoStore.oauth2BridgeVersion, key));
        items.push(this.hr(key));
        items.push(this.version(infoStore.externalSensorsVersion, key));

        let failedMsg = "";
        if(infoStore.hasFailed) {
            failedMsg = " / has fails";
        }

        return <div>
            <div className="dropdown is-hoverable">
                <div className="dropdown-trigger">
                    <button className="button" aria-haspopup="true" aria-controls="dropdown-menu4">
                        <span>Backend services {failedMsg}</span>
                        <span className="icon is-small">
                        <i className="fas fa-angle-down" aria-hidden="true"/>
                    </span>
                    </button>
                </div>
                <div className="dropdown-menu" id="dropdown-menu4" role="menu">
                    <div className="dropdown-content">
                        {items}
                    </div>
                </div>
            </div>
        </div>
    }

}

export default observer(Version)