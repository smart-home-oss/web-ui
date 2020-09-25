// @flow

import {extendObservable} from "mobx";
import House from "../houses/House";
import {HOUSE_MANAGER} from "./ApiResource";
import {roomsStore} from "./RoomsStore";
import {housesStore} from "./HousesStore";
import GenericStore from "./GenericStore";

export const ERROR: string = "error"
export const LOADED: string = "loaded"
export const NETWORK_ERROR: string = "NetworkError"
export const SERVER_ERROR: string = "ServerError"
export const EMPTY: string = "no_houses"
export const LOADING: string = "loading";
export const PENDING: string = "pending";

class CurrentHouseStore extends GenericStore {

    current: House;

    constructor() {
        super(HOUSE_MANAGER)

        extendObservable(this, {
            current: {},
            state: PENDING
        });
    }

    loadHouse(id: number) {
        this.current = housesStore.getIndexed(id);

        this.current ?
            roomsStore.loadByHouseId(this.current.id)
            :
            this.callBackend(id)
    }

    callBackend(id: number) {
        this.load(
            "api/v1/houses" + id,
            data => {
                this.indexed.set(id, House.fromObject(data));
                this.setCurrentHouse(id);
            })
    }
}

export const currentHouseStore: CurrentHouseStore = new CurrentHouseStore();