import { START } from '../util/route'
export class History {
    constructor(router, base) {
        this.router = router
        this.current = START
    }
    listen (cb) {
        this.cb = cb
    }

    transitionTo(location, onComplete, onAbort) {
        const route = this.router.match(location, this.current)
        console.log('transitionTo',route)
        this.confirmTransition(
            route,
            () => {
                // console.log('confirmTransition',route)
                this.updateRoute(route)
                onComplete && onComplete(route)
                // this.ensureURL()

                // fire ready cbs once
                // if (!this.ready) {
                //     this.ready = true
                //     this.readyCbs.forEach(cb => {
                //         cb(route)
                //     })
                // }
            },
            err => {
                if (onAbort) {
                    onAbort(err)
                }
                // if (err && !this.ready) {
                //     this.ready = true
                //     this.readyErrorCbs.forEach(cb => {
                //         cb(err)
                //     })
                // }
            }
        )
    }

    confirmTransition(route, onComplete, onAbort) {
        // const current = this.current
        onComplete(route)


    }
    updateRoute(route)
    {
        // const prev = this.current
        this.current = route
        this.cb && this.cb(route)
        // this.router.afterHooks.forEach(hook => {
        //     hook && hook(route, prev)
        // })
    }


}