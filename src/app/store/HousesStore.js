// @flow

import {extendObservable} from "mobx";
import {Observable, Subscriber} from "rxjs";
import House from "../houses/House";
import {httpHelper} from "../helpers/HttpHelper";
import {HOUSE_MANAGER} from "./ApiResource";
import {roomsStore} from "./RoomsStore";

export const HOUSES_LOADED: string = "houses_loaded"
export const ERROR: string = "error"
export const NO_HOUSES: string = "no_houses"
export const LOADING: string = "loading";
export const PENDING: string = "pending";

class HousesStore {

    houses: House[];
    indexed: Map<number, House>;
    current: House;
    state: string;

    constructor() {
        extendObservable(this, {
            houses: [],
            indexed: new Map<number, House>(),
            current: {},
            state: PENDING
        });
    }

    loadHouses(): Observable {
        if(this.state === LOADING) {
            return this.currentObservable;
        }

        this.state = LOADING;

        this.currentObservable = new Observable((observer: Subscriber) => {
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
                        if (this.houses.length > 0) {
                            this.state = HOUSES_LOADED;
                        } else {
                            this.state = NO_HOUSES;
                        }

                        observer.next(tmp);
                        observer.complete();
                    },
                    e => {
                        this.state = ERROR;
                        observer.error(e);
                    });
        });

        return this.currentObservable;
    }

    setCurrentHouse(id: number) {
        this.current = this.indexed.get(id);

        if (!this.current) {
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