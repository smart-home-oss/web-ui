// @flow

import {extendObservable} from "mobx";
import {Observable, Subscriber} from "rxjs";
import {httpHelperNoAuth} from "../helpers/HttpHelper";
// import {EXTERNAL_SENSORS_HOST, HOUSE_MANAGER_HOST, OAUTH2_BRIDGE_HOST, USER_MANAGER_HOST} from "./StoreConst";
import {HOUSE_MANAGER_HOST} from "./StoreConst";

class InfoStore {

    houseManagerVersion: any;
    userManagerVersion: any;
    oauth2BridgeVersion: any;
    externalSensorsVersion: any;

    constructor() {
        extendObservable(this, {
            houseManagerVersion: {},
            userManagerVersion: {},
            oauth2BridgeVersion: {},
            externalSensorsVersion: {},
        });
    }

    loadInfos() {
        this.loadInfo(HOUSE_MANAGER_HOST).subscribe(value => {
            this.houseManagerVersion = value
        });
        // this.loadInfo(USER_MANAGER_HOST).subscribe(value => this.userManagerVersion = value);
        // this.loadInfo(OAUTH2_BRIDGE_HOST).subscribe(value => this.oauth2BridgeVersion = value);
        // this.loadInfo(EXTERNAL_SENSORS_HOST).subscribe(value => this.externalSensorsVersion = value);
    }

    loadInfo(host: string): Observable {
        return new Observable((observer: Subscriber) => {
            httpHelperNoAuth
                .getText(host, "actuator/health")
                .subscribe(data => {
                    observer.next(data);
                    observer.complete();
                });
        });
    }
}

export const infoStore = new InfoStore();