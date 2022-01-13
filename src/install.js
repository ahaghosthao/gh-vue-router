export let _Vue
export function install (Vue) {
    if (install.installed && _Vue === Vue) return
    install.installed = true
    _Vue = Vue
    const isDef = v => v !== undefined
    Vue.mixin({
        beforeCreate () {
            if (isDef(this.$options.router)) {
                this._routerRoot = this
                this._router = this.$options.router
                this._router.init(this)
                // Vue.util.defineReactive(this, '_route', this._router.history.current)
            } else {
                // this._routerRoot = (this.$parent && this.$parent._routerRoot) || this
            }
            // registerInstance(this, this)
        },
        destroyed () {
            // registerInstance(this)
        }
    })
}