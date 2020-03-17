export default class ApiResource {
    host: string;
    name: string;

    constructor(host: string, name: string) {
        this.host = host;
        this.name = name;
    }

    getInfoUrl() {
        return this.host + "/actuator/info"
    }
}

export const HOUSE_MANAGER: ApiResource = new ApiResource("http://localhost:7000", "house-manager");
export const USER_MANAGER: ApiResource = new ApiResource("http://localhost:7001", "user-manager");
export const OAUTH2_BRIDGE: ApiResource = new ApiResource("http://localhost:7002", "oauth2-bridge");
export const EXTERNAL_SENSORS: ApiResource = new ApiResource("http://localhost:7003", "external-sensors");
