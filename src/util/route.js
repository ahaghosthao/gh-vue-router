export const START = createRoute(null, {
    path: '/'
})

export function createRoute(record, location, redirectedFrom, router) {
    const route = {
        // name: location.name || (record && record.name),
        // meta: (record && record.meta) || {},
        path: location.path || '/',
        // hash: location.hash || '',
        // query,
        // params: location.params || {},
        // fullPath: getFullPath(location, stringifyQuery),
        matched: record ? formatMatch(record) : []
    }
    return Object.freeze(route)
}
function formatMatch (record) {
    const res = []
    while (record) {
        res.unshift(record)
        record = record.parent
    }
    return res
}