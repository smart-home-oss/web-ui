// @flow

import {Observable, ReplaySubject} from "rxjs";
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
    _createDefaultRequest(urlParts: string[], method: string, body: any = null, contentType: string = APPLICATION_JSON): Request {
        let h: Headers = new Headers();
        if(this.useAuth) {
            h.append("Authorization", "Basic " + btoa("admin:password"));
        }

        h.append("Content-Type", contentType);

        // RequestInit
        let options = {
            method: method,
            headers: h,
            mode: 'cors',
            cache: 'default',
            contentType: contentType,
        };

        if(body) {
            options.body = JSON.stringify(body);
        }

        let url: string;

        if(Array.isArray(urlParts)) {
            url = urlParts.join("/");
        } else {
            url = urlParts
        }

        return new Request(url, options);
    }

    _createGetRequest(url: string[], contentType: string = APPLICATION_JSON): Request {
        return this._createDefaultRequest(url, "GET", null, contentType);
    }

    _createPostRequest(body, url: string[]): Request {
        return this._createDefaultRequest(url, "POST", body);
    }

    _createDeleteRequest(url: string[]): Request {
        return this._createDefaultRequest(url, "DELETE", null, TEXT_PLAIN);
    }

    _doFetch(request) {
        return new Observable((observer: Subscriber) => {
            fetch(request)
                .then((response) => {
                    if(request.headers.get("Content-Type") === APPLICATION_JSON) {
                        response.json().then((data) => {
                            this._handleResponse(request, response, observer, data)
                        })
                    } else {
                        this._handleResponse(request, response, observer, response.body)
                    }
                })
                .catch((e) => {
                    // console.error(e.message, request.url);
                    observer.error(e)
                });
        });
    }

    _handleResponse(request, response, observer, value) {
        if (response.ok) {
            observer.next(value);
            observer.complete();
        } else {
            console.error(value, response.status, request.url);
            observer.error(value)
        }
    }

    getJson(...url: string | string []) {
        return this._doFetch(this._createGetRequest(url))
    }

    delete(...url: string | string []) {
        let observable = this._doFetch(this._createDeleteRequest(url))

        let replaySubject = new ReplaySubject(1)
        observable.subscribe(replaySubject)

        return replaySubject
    }

    getText(...url: string | string []) {
        return this._doFetch(this._createGetRequest(url, TEXT_PLAIN))
    }

}

export const httpHelper: HttpHelper = new HttpHelper();
export const httpHelperNoAuth: HttpHelper = new HttpHelper(false);