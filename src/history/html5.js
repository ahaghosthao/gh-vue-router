import {History} from "./base";

export class HTML5History extends History {
    constructor(router, base) {
        super(router, base)
    }

    getCurrentLocation() {
        return getLocation(this.base)
    }
}

export function getLocation(base) {
    let path = decodeURI(window.location.pathname)
    if (base && path.indexOf(base) === 0) {
        path = path.slice(base.length)
    }
    return (path || '/') + window.location.search + window.location.hash
}