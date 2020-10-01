import {httpHelper} from "../helpers/HttpHelper";
import {HOUSE_MANAGER} from "../store/ApiResource";
import {ReplaySubject} from "rxjs";
import Device from "./Device";

class DevicesService {

    findUnassigned(): ReplaySubject {
        let replay = httpHelper.getJson(HOUSE_MANAGER.host, "api/v1/house-piece?unassigned=true");
        let chain = new ReplaySubject();
        replay.subscribe((data) => {
            let result = data.map(data => {
                return Device.fromObject(data)
            })

            chain.next(result)
        })

        return chain;
    }

}

export const devicesService: DevicesService = new DevicesService()