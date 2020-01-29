// @flow

import {extendObservable} from "mobx";
import {Observable, Subscriber} from "rxjs";
import House from "../houses/House";
import {httpHelper} from "../helpers/HttpHelper";
import {SMART_HOME_HOST} from "./StoreConst";
import Room from "../houses/Room";

class HousesStore {

    rooms: Room[];
    indexed: Map<number, Room>;
    current: Room;

    constructor() {
        extendObservable(this, {
            houses: [],
            indexedHouses: new Map<number, House>(),
            currentHouse: {}
        });
    }

    loadByHouseId(id: number): Observable {
        return new Observable((observer: Subscriber) => {
            let tmp: [] = [];

            httpHelper
                .getJson(SMART_HOME_HOST, "/api/v1/rooms?houseId=" + id + "&size=" + 999)
                .subscribe(data => {
                    data.forEach((value: Room) => {
                        let i: Room = Room.fromObject(value);
                        tmp.push(i);
                        this.indexed.set(i.id, i);
                    });

                    this.houses = tmp;

                    observer.next(tmp);
                    observer.complete();
                });
        });
    }

    setCurrentHouse(id: number) {
        this.current = this.indexed.get(id);

        if(!this.current) {
            this.load().subscribe();

            httpHelper
                .getJson(SMART_HOME_HOST, "api/v1/rooms", id)
                .subscribe(data => this.current = Room.fromObject(data));
        }

    }
}

export const housesStore = new HousesStore();