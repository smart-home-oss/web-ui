// @flow

import {extendObservable} from "mobx";
import {Observable, Subscriber} from "rxjs";
import {httpHelper} from "../helpers/HttpHelper";
import Device from "../devices/Device";
import {SMART_HOME_HOST} from "./StoreConst";

class DevicesStore {

    devices: Device[];

    constructor() {
        extendObservable(this, {
            devices: []
        });
    }

    loadDevices(): Observable {
        return new Observable((observer: Subscriber) => {
            let tmp: [] = [];

            httpHelper
                .getJson(SMART_HOME_HOST, "/api/v1/devices")
                .subscribe(data => {
                    data.forEach((value: Device) => {
                        tmp.push(Device.fromObject(value))
                    });

                    this.devices = tmp;

                    observer.next(tmp);
                    observer.complete();
                });
        });
    }
}

export const devicesStore = new DevicesStore();