// @flow

import ApiResource, {EXTERNAL_SENSORS, HOUSE_MANAGER, OAUTH2_BRIDGE, USER_MANAGER} from "./ApiResource";
import {computed, extendObservable} from "mobx";
import {httpHelperNoAuth} from "../helpers/HttpHelper";
import {AppInfo} from "./AppInfo";

class InfoStore {
    timeoutIdx;

    houseManager: AppInfo;
    userManager: AppInfo;
    oauth2Bridge: AppInfo;
    externalSensors: AppInfo;

    infos: AppInfo[];

    constructor() {
        extendObservable(this, {
            houseManager: new AppInfo(),
            userManager: new AppInfo(),
            oauth2Bridge: new AppInfo(),
            externalSensors: new AppInfo(),
        });

        this.infos = [this.houseManager, this.userManager, this.oauth2Bridge, this.externalSensors]
    }

    loadInfos() {
        if(this.timeoutIdx) {
            return
        }

        this.timeoutIdx = setTimeout(() => {
            this.__doLoading();
        }, 10 * 1000);

        this.__doLoading();
    }

    __doLoading() {
        this.loadInfo(HOUSE_MANAGER, i => this.houseManager = i);
        this.loadInfo(USER_MANAGER, i => this.userManager = i);
        this.loadInfo(OAUTH2_BRIDGE, i => this.oauth2Bridge = i);
        this.loadInfo(EXTERNAL_SENSORS, i => this.externalSensors = i);
    }

    loadInfo(apiResource: ApiResource, callback: (appInfo: AppInfo) => {}) {
        let url = apiResource.getInfoUrl();
        httpHelperNoAuth
            .getText(url)
            .subscribe(
                data => {
                    callback(AppInfo.fromValue(data, apiResource));
                },
                error => {
                    callback(AppInfo.fromError(error, apiResource))
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