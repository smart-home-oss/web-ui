export default class House {
    id: number;
    number: string;
    postCode: string;
    street: string;

    static fromObject(value): House {
        let house: House = new House();
        house.id = value.id;
        house.number = value.number;
        house.postCode = value.postCode;
        house.street = value.street;

        return house;
    }
}