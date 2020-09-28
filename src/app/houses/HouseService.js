import {httpHelper} from "../helpers/HttpHelper";
import {HOUSE_MANAGER} from "../store/ApiResource";
import {housesStore} from "../store/HousesStore";
import {ReplaySubject} from "rxjs";
import NewHouseRequest from "./objects/NewHouseRequest";
import House from "./objects/House";

class HouseService {

    delete(id: number): ReplaySubject {
        let replay = httpHelper.delete(HOUSE_MANAGER.host, "api/v1/houses", id);
        replay.subscribe(() => housesStore.delete(id))

        return replay;
    }

    newHouse(r: NewHouseRequest): ReplaySubject {
        let replay = httpHelper.post(r, HOUSE_MANAGER.host, "api/v1/houses");
        replay.subscribe((data) => housesStore.putHouse(House.fromObject(data)))

        return replay;
    }

}

export const houseService: HouseService = new HouseService()