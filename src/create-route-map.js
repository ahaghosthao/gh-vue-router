import {cleanPath} from "./util/path";
// import Regexp from 'path-to-regexp'

export function createRouteMap(routes, oldPathList, oldPathMap, oldNameMap) {

    const pathList = oldPathList || []
    // $flow-disable-line
    const pathMap = oldPathMap || Object.create(null)
    // $flow-disable-line
    const nameMap = oldNameMap || Object.create(null)

    routes.forEach(route => {
        addRouteRecord(pathList, pathMap, nameMap, route)
    })

    return {pathList, pathMap, nameMap}

}

function addRouteRecord(
    pathList,
    pathMap,
    nameMap,
    route,
    parent,
    matchAs
) {
    const { path, name } = route
    const pathToRegexpOptions =
        route.pathToRegexpOptions || {strict:false}
    const normalizedPath = normalizePath(path, parent, pathToRegexpOptions.strict)
    const record = {
        path: normalizedPath,
        // regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
        components: route.components || { default: route.component },
        // instances: {},
        name,
        parent,
        matchAs,
        // redirect: route.redirect,
        // beforeEnter: route.beforeEnter,
        // meta: route.meta || {},
        props:
            route.props == null
                ? {}
                : route.components
                    ? route.props
                    : { default: route.props }

    }
    if (!pathMap[record.path]) {
        pathList.push(record.path)
        pathMap[record.path] = record
    }
}

function compileRouteRegex (
    path,
    pathToRegexpOptions
) {
    const regex = Regexp(path, [], pathToRegexpOptions)
    if (process.env.NODE_ENV !== 'production') {
        const keys = Object.create(null)
        regex.keys.forEach(key => {
            warn(
                !keys[key.name],
                `Duplicate param keys in route with path: "${path}"`
            )
            keys[key.name] = true
        })
    }
    return regex
}

function normalizePath (
    path,
    parent,
    strict
) {
    if (!strict) path = path.replace(/\/$/, '')
    if (path[0] === '/') return path
    if (parent == null) return path
    return cleanPath(`${parent.path}/${path}`)
}