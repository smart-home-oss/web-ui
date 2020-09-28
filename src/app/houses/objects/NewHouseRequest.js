export default class NewHouseRequest {
    name: string;
    number: string;
    street: string;
    city: string;
    country: string;
    postalCode: string;

    static fromForm(value): House {
        let r: NewHouseRequest = new NewHouseRequest();
        r.name = value.name;
        r.number = value.number;
        r.street = value.street;
        r.city = value.city;
        r.country = value.country;
        r.postalCode = value["postal-code"];

        return r;
    }
}