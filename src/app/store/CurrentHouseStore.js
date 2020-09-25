// @flow

import {extendObservable} from "mobx";
import House from "../houses/House";
import {HOUSE_MANAGER} from "./ApiResource";
import {roomsStore} from "./RoomsStore";
import {housesStore} from "./HousesStore";
import GenericStore, {PENDING} from "./GenericStore";

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

        if (this.current) {
            roomsStore.loadByHouseId(this.current.id)
            this.refreshLoadingState()
        } else {
            this.callBackend(id)
        }
    }

    callBackend(id: number) {
        this.load(
            "api/v1/houses/" + id,
            data => {
                housesStore.putHouse(House.fromObject(data));
                this.loadHouse(id);
            })
    }

}

export const currentHouseStore: CurrentHouseStore = new CurrentHouseStore();