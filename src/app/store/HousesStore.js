// @flow

import {extendObservable} from "mobx";
import {Observable, Subscriber} from "rxjs";
import House from "../houses/House";
import {httpHelper} from "../helpers/HttpHelper";
import {HOUSE_MANAGER} from "./ApiResource";
import {roomsStore} from "./RoomsStore";

const HOUSES_LOADED : string = "houses_loaded"
const ERROR : string = "error"
const NO_HOUSES : string = "no_houses"
const LOADING : string = "loading";

class HousesStore {

    houses: House[];
    indexed: Map<number, House>;
    current: House;

    constructor() {
        extendObservable(this, {
            houses: [],
            indexed: new Map<number, House>(),
            current: {}
        });
    }

    loadHouses(): Observable {
        return new Observable((observer: Subscriber) => {
            let tmp: [] = [];

            httpHelper
                .getJson(HOUSE_MANAGER.host, "api/v1/houses")
                .subscribe(data => {
                    data.forEach((value: House) => {
                        let house = House.fromObject(value);
                        tmp.push(house);
                        this.indexed.set(house.id, house);
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
            this.loadHouses().subscribe();

            httpHelper
                .getJson(HOUSE_MANAGER.host, "api/v1/houses", id)
                .subscribe(data => {
                    let house: House = House.fromObject(data);
                    this.indexed.set(house.id, house);
                    this.setCurrentHouse(house.id);
                });
        } else {
            roomsStore.loadByHouseId(this.current.id).subscribe();
        }

    }
}

export const housesStore: HousesStore = new HousesStore();