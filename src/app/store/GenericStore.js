// @flow

import {Observable, ReplaySubject, Subscriber} from "rxjs"
import {httpHelper} from "../helpers/HttpHelper"
import ApiResource from "./ApiResource"

export const PENDING: string = "pending"
export const LOADING: string = "loading"
export const LOADED: string = "loaded"
export const EMPTY: string = "no_houses"
export const ERROR: string = "error"

export const NETWORK_ERROR: string = "NetworkError"
export const SERVER_ERROR: string = "ServerError"

export default class GenericStore {

    state: PENDING | LOADING | LOADED | EMPTY | ERROR = PENDING
    errorType: NETWORK_ERROR | SERVER_ERROR
    errorMessage: string
    api: ApiResource

    observable: Observable = new Observable()
    replaySubject: ReplaySubject

    constructor(api: ApiResource) {
        this.api = api;
    }

    load(uri: string, onData: (data) => {}, onError?: (e) => {}): ReplaySubject {
        if (this.state === LOADING) {
            return this.replaySubject
        }

        this.state = LOADING;

        this.observable = new Observable((observer: Subscriber) => {
            httpHelper
                .getJson(this.api.host, uri)
                .subscribe(data => {
                        onData(data)

                        this.refreshLoadingState()

                        observer.next(data)
                        observer.complete()
                    },
                    e => {
                        if (onError) {
                            onError(e)
                        }

                        this.refreshLoadingState(e)
                        console.error(e.message)
                        observer.error(e)
                    });
        });

        this.replaySubject = new ReplaySubject(1)

        this.observable.subscribe(this.replaySubject)

        return this.replaySubject
    }

    refreshLoadingState(e?) {
        if (e) {
            this.state = ERROR
            this.errorType = e.message.startsWith("NetworkError") ? NETWORK_ERROR : SERVER_ERROR
            this.errorMessage = e.message

        } else {
            this.state = this.isEmpty() ? EMPTY : LOADED
        }
    }

    isEmpty() {
        return false;
    }
}