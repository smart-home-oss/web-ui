export default class House {
    id: number;
    number: string;
    postCode: string;
    street: string;

    getNumberStreet() {
        return this.number + ", " + this.street;
    }

    getNumberStreetTrim() {
        let str = this.getNumberStreet();

        return str.substr(0, 20) + (str.length > 20 ? "..." : "");
    }

    static fromObject(value): House {
        let house: House = new House();
        house.id = value.id;
        house.number = value.number;
        house.postCode = value.postCode;
        house.street = value.street;

        return house;
    }
}