import {inBrowser} from "./dom";

export const supportsPushState =
    inBrowser &&
    (function () {
        const ua = window.navigator.userAgent
        // 不支持安卓2、4版本 safari手机版浏览器
        if (
            (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
            ua.indexOf('Mobile Safari') !== -1 &&
            ua.indexOf('Chrome') === -1 &&
            ua.indexOf('Windows Phone') === -1
        ) {
            return false
        }

        return window.history && 'pushState' in window.history
    })()