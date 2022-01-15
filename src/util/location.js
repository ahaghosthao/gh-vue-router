import {parsePath, resolvePath} from "./path";
import {resolveQuery} from "./query";

export function normalizeLocation (raw, current, append, router ) {
    let next = typeof raw === 'string' ? { path: raw } : raw
    return next
    // const parsedPath = parsePath(next.path || '')
    // const basePath = (current && current.path) || '/'
    // const path = parsedPath.path
    //     ? resolvePath(parsedPath.path, basePath, append || next.append)
    //     : basePath
    // const query = resolveQuery(
    //     parsedPath.query,
    //     next.query,
    //     router && router.options.parseQuery
    // )
    //
    // let hash = next.hash || parsedPath.hash
    // if (hash && hash.charAt(0) !== '#') {
    //     hash = `#${hash}`
    // }
    //
    // return {
    //     _normalized: true,
    //     path,
    //     query,
    //     hash
    // }
}