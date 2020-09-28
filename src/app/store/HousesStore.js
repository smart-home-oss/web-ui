// @flow

import {extendObservable} from "mobx";
import {ReplaySubject} from "rxjs";
import House from "../houses/objects/House";
import {HOUSE_MANAGER} from "./ApiResource";
import GenericStore, {PENDING} from "./GenericStore";

class HousesStore extends GenericStore {

    houses: House[];
    indexed: Map<number, House>;

    constructor() {
        super(HOUSE_MANAGER)

        extendObservable(this, {
            houses: [],
            indexed: new Map<number, House>(),
            state: PENDING
        });
    }

    getIndexed(id: number) {
        return this.indexed.get(id);
    }

    loadHouses(): ReplaySubject {
        this.load(
            "api/v1/houses",
            data => {
                this.houses = []
                this.indexed.clear();

                data.forEach((value: House) => {
                    let house = House.fromObject(value);
                    this.houses.push(house);
                    this.indexed.set(house.id, house);
                });
            })
    }

    putHouse(h: House) {
        this.indexed.set(h.id, h);
    }

    isEmpty(): boolean {
        return this.houses.length < 1;
    }

    delete(id: number) {
        this.indexed.delete(id)
        this.houses = this.houses.filter(h => h.id !== id)
    }
}

export const housesStore: HousesStore = new HousesStore();