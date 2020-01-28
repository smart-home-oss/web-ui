export default class Device {
    id: string;
    name: string;

    static fromObject(value): Device {
        let house: Device = new Device();
        house.id = value.id;
        house.name = value.name;

        return house;
    }
}