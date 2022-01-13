import {install} from "./install";
import { supportsPushState } from './util/push-state'
import { inBrowser } from './util/dom'
import { HashHistory } from './history/hash'
import { HTML5History } from './history/html5'
import { AbstractHistory } from './history/abstract'

export default class MyVueRouter {
    constructor(options = {}) {
        this.options = options;
        this.apps = [];
        this.app = null;
        let mode = options.mode || 'hash'
        this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false
        if (this.fallback) {
            mode = 'hash'
        }
        if (!inBrowser) {
            mode = 'abstract'
        }
        this.mode = mode
        switch (mode) {
            case 'history':
                this.history = new HTML5History(this, options.base)
                break
            case 'hash':
                this.history = new HashHistory(this, options.base, this.fallback)
                break
            case 'abstract':
                this.history = new AbstractHistory(this, options.base)
                break
            default:
                if (process.env.NODE_ENV !== 'production') {
                    assert(false, `invalid mode: ${mode}`)
                }
        }
    }

    init(app) {
        console.log('执行了init方法')
        this.apps.push(app)
        // if (this.app) {
        //     return
        // }
        this.app = app
    }

}
MyVueRouter.install = install;

