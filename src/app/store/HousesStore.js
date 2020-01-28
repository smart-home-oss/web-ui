// @flow

import {extendObservable} from "mobx";
import {Observable, Subscriber} from "rxjs";
import House from "../houses/House";
import {httpHelper} from "../helpers/HttpHelper";
import {SMART_HOME_HOST} from "./StoreConst";

class HousesStore {

    houses: House[];
    indexedHouses: Map<number, House>;
    currentHouse: House;

    constructor() {
        extendObservable(this, {
            houses: [],
            indexedHouses: new Map<number, House>(),
            currentHouse: {}
        });
    }

    loadHouses(): Observable {
        return new Observable((observer: Subscriber) => {
            let tmp: [] = [];

            httpHelper
                .getJson(SMART_HOME_HOST, "/api/v1/houses")
                .subscribe(data => {
                    data.forEach((value: House) => {
                        let house = House.fromObject(value);
                        tmp.push(house);
                        this.indexedHouses.set(house.id, house);
                    });

                    this.houses = tmp;

                    observer.next(tmp);
                    observer.complete();
                });
        });
    }

    setCurrentHouse(id: number) {
        this.currentHouse = this.indexedHouses.get(id);

        if(!this.currentHouse) {
            this.loadHouses().subscribe();

            httpHelper
                .getJson(SMART_HOME_HOST, "api/v1/houses", id)
                .subscribe(data => this.currentHouse = House.fromObject(data));
        }

    }
}

export const housesStore = new HousesStore();