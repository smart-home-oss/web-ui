export default class NewRoomRequest {
    houseId: number
    name: String

    constructor(houseId: number, roomName: String) {
        this.houseId = houseId;
        this.name = roomName;
    }
}