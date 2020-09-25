import {httpHelper} from "../helpers/HttpHelper";
import {HOUSE_MANAGER} from "../store/ApiResource";
import {housesStore} from "../store/HousesStore";
import {ReplaySubject} from "rxjs";

class HouseService {

    delete(id: number): ReplaySubject {
        let replay = httpHelper.delete(HOUSE_MANAGER.host, "api/v1/houses", id);
        replay.subscribe(() => housesStore.delete(id))

        return replay;
    }

}

export const houseService: HouseService = new HouseService()