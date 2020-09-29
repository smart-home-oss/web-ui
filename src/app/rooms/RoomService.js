import {httpHelper} from "../helpers/HttpHelper";
import {HOUSE_MANAGER} from "../store/ApiResource";
import {ReplaySubject} from "rxjs";
import NewRoomRequest from "./objects/NewRoomRequest";
import {roomsStore} from "../store/RoomsStore";
import Room from "./objects/Room";

class RoomService {

    create(houseId: number, name: string): ReplaySubject {
        let r = new NewRoomRequest(houseId, name);
        let replay = httpHelper.post(r, HOUSE_MANAGER.host, "api/v1/house-piece");
        replay.subscribe((data) => roomsStore.putRoom(Room.fromObject(data)))

        return replay;
    }

    delete(id: number): ReplaySubject {
        let replay = httpHelper.delete(HOUSE_MANAGER.host, "api/v1/house-piece", id);
        replay.subscribe(() => roomsStore.delete(id))

        return replay;
    }

}

export const roomService: RoomService = new RoomService()