// @flow

import {EXTERNAL_SENSORS_HOST, HOUSE_MANAGER_HOST, OAUTH2_BRIDGE_HOST, USER_MANAGER_HOST} from "./StoreConst";
import {computed, extendObservable} from "mobx";
import {Observable, Subscriber} from "rxjs";
import {httpHelperNoAuth} from "../helpers/HttpHelper";
import {AppInfo} from "./AppInfo";

class InfoStore {

    houseManagerVersion: AppInfo;
    userManagerVersion: AppInfo;
    oauth2BridgeVersion: AppInfo;
    externalSensorsVersion: AppInfo;

    infos: AppInfo[];

    constructor() {
        extendObservable(this, {
            houseManagerVersion: new AppInfo(),
            userManagerVersion: new AppInfo(),
            oauth2BridgeVersion: new AppInfo(),
            externalSensorsVersion: new AppInfo(),
        });

        this.infos = [this.houseManagerVersion, this.userManagerVersion, this.oauth2BridgeVersion, this.externalSensorsVersion]
    }

    loadInfos() {
        this.subscribe(this.loadInfo(HOUSE_MANAGER_HOST),
            appInfo => this.houseManagerVersion = appInfo);

        this.subscribe(this.loadInfo(USER_MANAGER_HOST),
            appInfo => this.userManagerVersion = appInfo);

        this.subscribe(this.loadInfo(OAUTH2_BRIDGE_HOST),
            appInfo => this.oauth2BridgeVersion = appInfo);

        this.subscribe(this.loadInfo(EXTERNAL_SENSORS_HOST),
            appInfo => this.externalSensorsVersion = appInfo);
    }

    subscribe(observable: Observable, callback: (appInfo: AppInfo) => {}) {
        observable.subscribe(
            appInfo => {
                callback(appInfo)
            },
            appInfo => {
                callback(appInfo)
            }
        );
    }

    loadInfo(host: string): Observable {
        return new Observable((observer: Subscriber) => {
            let url = host + "/actuator/info";
            httpHelperNoAuth
                .getText(url)
                .subscribe(
                    data => {
                        observer.next(AppInfo.fromValue(data, url));
                        observer.complete();
                    },
                    error => {
                        observer.error(AppInfo.fromError(error, url))
                    });
        });
    }

    hasFailed = computed(() => {
        for (const value of this.infos) {
            if (value.state === "ERROR") {
                return true;
            }
        }

        return false;
    });
}

export const infoStore = new InfoStore();