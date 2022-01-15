export default {
    name:"RouterView",
    functional:true,
    props: {
        name: {
            type: String,
            default: 'default'
        }
    },
    render(_,{ props, children, parent, data }){
        data.routerView = true
        let depth = 0
        const h = parent.$createElement
        const name = props.name
        const route = parent.$route
        const matched = route.matched[depth]
        const component = matched && matched.components[name]
        return h(component, data, children)
    }

}