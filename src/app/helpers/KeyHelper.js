export default class KeyHelper {
    now: string;
    i: number = 0;

    constructor() {
        this.now = new Date();
    }

    next() {
        return this.i++ + this.now;
    }
}