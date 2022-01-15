export default {
    name: "RouterLink",
    props: {
        tag: {
            type: String,
            default: 'a'
        },
        to: {
            type: String,
            default: '/bar'
        }
    },
    render(h) {
        let data = {}
        if (this.tag === 'a') {
            let href = "#" + this.to;
            data.attrs = {href}
        }
        return h(this.tag, data, ['routerLink'])
    }
}