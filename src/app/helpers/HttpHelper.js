// @flow

import {Observable} from "rxjs";
import {Subscriber} from "rxjs";

class HttpHelper {

    timeout: number = 100;

    // noinspection JSMethodCanBeStatic
    _createDefaultRequest(url: string[], method: string, body: any = null): Request {
        let h: Headers = new Headers();
        h.append("Authorization", "Basic " + btoa("admin:password"));
        h.append("Content-Type", "application/json");

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
    };

    _createGetRequest(url: string[]): Request {
        return this._createDefaultRequest(url, "get");
    }

    _createPostRequest(body, ...url: string[]): Request {
        return this._createDefaultRequest(url, "post", body);
    }

    _createDeleteRequest(...url: string[]): Request {
        return this._createDefaultRequest(url, "delete");
    }

    _json(request) {
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
                    console.error(e.message, request.url);
                    observer.error(e)
                });
        });
    }

    getJson(...url: string | string []) {
        return this._json(this._createGetRequest(url))
    }

}

export const httpHelper: HttpHelper = new HttpHelper();