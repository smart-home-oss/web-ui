import {AppJavaInfo} from "./AppJavaInfo";
import ApiResource from "./ApiResource";

export class AppInfo {
    state: "LOADING"|"OK"|"ERROR" = "LOADING";
    message: string;
    resource: ApiResource = new ApiResource();
    name: string = "";
    version: string = "";
    encoding: string;
    java: AppJavaInfo = new AppJavaInfo();

    static fromError(error: any, apiResource: ApiResource) {
        let result: AppInfo = new AppInfo();
        result.resource = apiResource;
        result.name = apiResource.name;

        if(error) {
            result.state = "ERROR";
            result.message = error.message;
        }

        return result;
    }

    static fromValue(data: any, apiResource: ApiResource) {
        let result: AppInfo = new AppInfo();
        result.resource = apiResource;

        if(data) {
            result.state = "OK";
            result.name = data["app"]["name"];
            result.version = data["app"]["version"];
            result.encoding = data["app"]["encoding"];

            result.java.hydrate(data["java"]);
        }

        return result;
    }
}