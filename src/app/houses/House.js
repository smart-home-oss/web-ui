export default class House {
    id: number;
    name: string;
    addressId: number;

    static fromObject(value): House {
        let house: House = new House();
        house.id = value.id;
        house.name = value.name;
        house.addressId = value.addressId;

        return house;
    }
}