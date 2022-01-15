import {createRouteMap} from './create-route-map'
import {createRoute} from './util/route'
import {normalizeLocation} from "./util/location";

export function createMatcher(routes, router) {
    const {pathList, pathMap, nameMap} = createRouteMap(routes)
    // console.log("pathList",pathList)
    // console.log("pathMap",pathMap)

    function addRoutes (routes) {
        createRouteMap(routes, pathList, pathMap, nameMap)
    }

    function match(raw, currentRoute, redirectedFrom) {
        // debugger
        console.log('currentRoute',currentRoute)
        const location = normalizeLocation(raw, currentRoute, false, router)
        console.log(location)
        const {name} = location
        if (name) {
            //TODO
        } else if (location.path) {
            // const path = pathList[i]
            const record = pathMap[location.path]
            console.log('record',record)
            // if(location.path){}
            // if (matchRoute(record.regex, location.path, location.params)) {
            return _createRoute(record, location, redirectedFrom)
            // }
            // for (let i = 0; i < pathList.length; i++) {
            //     const path = pathList[i]
            //     const record = pathMap[path]
            //     console.log('record',record)
            //     // if(location.path){}
            //     // if (matchRoute(record.regex, location.path, location.params)) {
            //         return _createRoute(record, location, redirectedFrom)
            //     // }
            // }
        }
        return _createRoute(null, location)
    }

    return {
        match,
        addRoutes
    }


    function matchRoute(
        regex,
        path,
        params
    ) {
        const m = path.match(regex)
        if (!m) {
            return false
        } else if (!params) {
            return true
        }

    }

    function _createRoute(record, location, redirectedFrom) {
        // if (record && record.redirect) {
        //     return redirect(record, redirectedFrom || location)
        // }
        // if (record && record.matchAs) {
        //     return alias(record, location, record.matchAs)
        // }
        return createRoute(record, location, redirectedFrom, router)
    }

}