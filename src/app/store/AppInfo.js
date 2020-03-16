import {AppJavaInfo} from "./AppJavaInfo";

export class AppInfo {
    state: "LOADING"|"OK"|"ERROR" = "LOADING";
    message: string;
    url: string;
    name: string = "";
    version: string = "";
    encoding: string;
    java: AppJavaInfo = new AppJavaInfo();

    static fromError(error: any, url: string) {
        let result: AppInfo = new AppInfo();
        result.url = url;

        if(error) {
            result.state = "ERROR";
            result.message = error.message;
        }

        return result;
    }

    static fromValue(data: any, url: string) {
        let result: AppInfo = new AppInfo();
        result.url = url;

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