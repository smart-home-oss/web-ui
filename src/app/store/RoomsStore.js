// @flow

import {extendObservable} from "mobx";
import {Observable, Subscriber} from "rxjs";
import House from "../houses/House";
import {httpHelper} from "../helpers/HttpHelper";
import {HOUSE_MANAGER} from "./ApiResource";
import Room from "../houses/Room";

class RoomsStore {

    rooms: Room[];
    indexed: Map<number, Room>;
    current: Room;

    constructor() {
        extendObservable(this, {
            rooms: [],
            indexed: new Map<number, House>(),
            current: {}
        });
    }

    loadByHouseId(id: number): Observable {
        return new Observable((observer: Subscriber) => {
            let tmp: [] = [];

            httpHelper
                .getJson(HOUSE_MANAGER.host, "api/v1/rooms?houseId=" + id + "&size=" + 999)
                .subscribe(data => {
                    data.forEach((value: Room) => {
                        let i: Room = Room.fromObject(value);
                        tmp.push(i);
                        this.indexed.set(i.id, i);
                    });

                    this.rooms = tmp;

                    observer.next(tmp);
                    observer.complete();
                });
        });
    }

    setCurrentRoom(id: number) {
        this.current = this.indexed.get(id);

        // if(!this.current) {
        //     this.load().subscribe();
        //
        //     httpHelper
        //         .getJson(HOUSE_MANAGER.host, "api/v1/rooms", id)
        //         .subscribe(data => this.current = Room.fromObject(data));
        // }

    }
}

export const roomsStore: RoomsStore = new RoomsStore();