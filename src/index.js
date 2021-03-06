import {install} from "./install";
import {supportsPushState} from './util/push-state'
import {inBrowser} from './util/dom'
import {HashHistory} from './history/hash'
import {HTML5History} from './history/html5'
import {AbstractHistory} from './history/abstract'
import { createMatcher } from './create-matcher'

export default class MyVueRouter {
    constructor(options = {}) {
        this.options = options;
        this.apps = [];
        this.app = null;
        this.matcher = createMatcher(options.routes || [], this)
        let mode = options.mode || 'hash'
        this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false
        // if (this.fallback) {
        //     mode = 'hash'
        // }
        // if (!inBrowser) {
        //     mode = 'abstract'
        // }
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
            // if (process.env.NODE_ENV !== 'production') {
            //     assert(false, `invalid mode: ${mode}`)
            // }
        }
    }

    match(raw, current, redirectedFrom) {
        return this.matcher.match(raw, current, redirectedFrom)
    }

    init(app) {
        this.apps.push(app)
        if (this.app) {
            return
        }
        this.app = app
        const history = this.history

        if (history instanceof HTML5History) {
            history.transitionTo(history.getCurrentLocation())
        } else if (history instanceof HashHistory) {
            const setupHashListener = () => {
                history.setupListeners()
            }
            history.transitionTo(
                history.getCurrentLocation(),
                setupHashListener,
                setupHashListener
            )
        }
        history.listen(route => {
            this.apps.forEach((app) => {
                // console.log('app',app)
                app._route = route
                console.log(app._route);
            })
        })
    }

}
MyVueRouter.install = install;
if (inBrowser && window.Vue) {
    Vue.use(MyVueRouter)
}

