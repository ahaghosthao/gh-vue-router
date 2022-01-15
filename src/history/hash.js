import {History} from "./base";
import {supportsPushState} from "../util/push-state";

export  class HashHistory extends History{
    constructor(router,name) {
        super(router,name)
    }
    getCurrentLocation () {
        return getHash()
    }

    setupListeners(){
        // const router = this.router
        window.addEventListener(
            supportsPushState ? 'popstate' : 'hashchange',
            () => {
                // const current = this.current
                // if (!ensureSlash()) {
                //     return
                // }
                this.transitionTo(getHash(), route => {
                    // if (supportsScroll) {
                    //     handleScroll(this.router, route, current, true)
                    // }
                    // if (!supportsPushState) {
                    //     replaceHash(route.fullPath)
                    // }
                })
            }
        )
    }
}
export function getHash () {
    let href = window.location.href
    const index = href.indexOf('#')
    // empty path
    if (index < 0) return ''

    href = href.slice(index + 1)
    // decode the hash but not the search or hash
    // as search(query) is already decoded
    // https://github.com/vuejs/vue-router/issues/2708
    const searchIndex = href.indexOf('?')
    if (searchIndex < 0) {
        const hashIndex = href.indexOf('#')
        if (hashIndex > -1) {
            href = decodeURI(href.slice(0, hashIndex)) + href.slice(hashIndex)
        } else href = decodeURI(href)
    } else {
        href = decodeURI(href.slice(0, searchIndex)) + href.slice(searchIndex)
    }

    return href
}