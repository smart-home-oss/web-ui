// @flow

import {extendObservable} from "mobx";
import {HOUSE_MANAGER} from "./ApiResource";
import Room from "../rooms/objects/Room";
import GenericStore, {PENDING} from "./GenericStore";

class RoomsStore extends GenericStore {

    rooms: Room[];
    indexed: Map<number, Room>;
    current: Room;

    constructor() {
        super(HOUSE_MANAGER)
        extendObservable(this, {
            rooms: [],
            indexed: new Map<number, Room>(),
            current: {},
            state: PENDING
        });
    }

    loadByHouseId(id: number) {
        console.log("load rooms for house ", id)
        this.rooms = [];
        this.indexed = new Map<number, Room>()

        this.load(
            "api/v1/house-piece?houseId=" + id + "&size=999",
            data => {
                this.rooms = []

                data.forEach((value: Room) => {
                    let r: Room = Room.fromObject(value);
                    this.rooms.push(r);
                    this.indexed.set(r.id, r);
                });

                console.log("loaded rooms count ", this.rooms.length)
            })
    }

    putRoom(r: Room) {
        this.rooms = this.rooms.concat(r)
        this.indexed.set(r.id, r);
    }

    delete(id: number) {
        this.rooms = this.rooms.filter(r => r.id !== id)
        this.indexed.delete(id);
    }

    setCurrent(id: number) {
        this.current = this.indexed.get(id);
    }

    isEmpty() {
        return this.rooms.length < 1;
    }
}

export const roomsStore: RoomsStore = new RoomsStore();