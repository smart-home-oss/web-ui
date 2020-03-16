// @flow

import {Observable} from "rxjs";
import {Subscriber} from "rxjs";

const APPLICATION_JSON = "application/json";
const TEXT_PLAIN = "text/plain";

class HttpHelper {

    timeout: number = 100;
    useAuth: boolean = true;

    constructor(useAuth = true) {
        this.useAuth = useAuth;
    }

// noinspection JSMethodCanBeStatic
    _createDefaultRequest(url: string[], method: string, body: any = null, contentType: string = APPLICATION_JSON): Request {
        let h: Headers = new Headers();
        if(this.useAuth) {
            h.append("Authorization", "Basic " + btoa("admin:password"));
        }

        h.append("Content-Type", contentType);

        // RequestInit
        let request = { method: method,
            headers: h,
            mode: 'cors',
            cache: 'default',
        };

        if(body) {
            request.body = JSON.stringify(body);
        }

        let urlToUse: string = url;

        if(Array.isArray(url)) {
            urlToUse = url.join("/");
        }

        return new Request(urlToUse, request);
    }

    _createGetRequest(url: string[], contentType: string = APPLICATION_JSON): Request {
        return this._createDefaultRequest(url, "get", null, contentType);
    }

    _createPostRequest(body, ...url: string[]): Request {
        return this._createDefaultRequest(url, "post", body);
    }

    _createDeleteRequest(...url: string[]): Request {
        return this._createDefaultRequest(url, "delete");
    }

    _doFetch(request) {
        return new Observable((observer: Subscriber) => {
            fetch(request)
                .then((response) => {
                    response.json().then((data) => {
                        if (response.ok) {
                            observer.next(data);
                            observer.complete();
                        } else {
                            console.error(data, response.status, request.url);
                            observer.error(data)
                        }
                    })
                })
                .catch((e) => {
                    // console.error(e.message, request.url);
                    observer.error(e)
                });
        });
    }

    getJson(...url: string | string []) {
        return this._doFetch(this._createGetRequest(url))
    }

    getText(...url: string | string []) {
        return this._doFetch(this._createGetRequest(url, TEXT_PLAIN))
    }

}

export const httpHelper: HttpHelper = new HttpHelper();
export const httpHelperNoAuth: HttpHelper = new HttpHelper(false);