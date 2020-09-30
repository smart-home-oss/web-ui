// @flow

import {Observable, ReplaySubject, Subscriber, Subscription} from "rxjs"
import {httpHelper} from "../helpers/HttpHelper"
import ApiResource from "./ApiResource"

export const PENDING: string = "pending"
export const LOADING: string = "loading"
export const LOADED: string = "loaded"
export const EMPTY: string = "empty"
export const ERROR: string = "error"

export const NETWORK_ERROR: string = "NetworkError"
export const SERVER_ERROR: string = "ServerError"

export default class GenericStore {

    state: PENDING | LOADING | LOADED | EMPTY | ERROR = PENDING
    errorType: NETWORK_ERROR | SERVER_ERROR
    errorMessage: string
    api: ApiResource

    subscription: Subscription
    httpSubscription: Subscription
    replaySubject: ReplaySubject

    constructor(api: ApiResource) {
        this.api = api;
    }

    load(uri: string, onData: (any) => {}, onError?: (any) => {}) {
        this.cancelOngoing();

        this.state = LOADING;

        this.replaySubject = new ReplaySubject(1)

        this.subscription = new Observable(
            (observer: Subscriber) => {
                this.httpSubscription =
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
            })
            .subscribe(this.replaySubject);
    }

    cancelOngoing() {
        if (this.replaySubject) {
            this.replaySubject.unsubscribe()
        }

        if (this.subscription) {
            this.subscription.unsubscribe()
        }

        if (this.httpSubscription) {
            this.httpSubscription.unsubscribe()
        }
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