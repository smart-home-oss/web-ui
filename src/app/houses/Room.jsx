export default class Room {
    id: number;
    name: string;
    houseId: number;

    static fromObject(value): Room {
        let result: Room = new Room();
        result.id = value.id;
        result.name = value.name;
        result.houseId = value.houseId;

        return result;
    }
}