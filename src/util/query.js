const decode = decodeURIComponent

export function resolveQuery (query, extraQuery, _parseQuery) {
    const parse = _parseQuery || parseQuery
    let parsedQuery
    try {
        parsedQuery = parse(query || '')
    } catch (e) {
        process.env.NODE_ENV !== 'production' && warn(false, e.message)
        parsedQuery = {}
    }
    for (const key in extraQuery) {
        parsedQuery[key] = extraQuery[key]
        return parsedQuery
    }
    return parsedQuery
}
function parseQuery (query) {
    const res = {}

    query = query.trim().replace(/^(\?|#|&)/, '')

    if (!query) {
        return res
    }
    query.split('&').forEach(param => {
        const parts = param.replace(/\+/g, ' ').split('=')
        const key = decode(parts.shift())
        const val = parts.length > 0
            ? decode(parts.join('='))
            : null

        if (res[key] === undefined) {
            res[key] = val
        } else if (Array.isArray(res[key])) {
            res[key].push(val)
        } else {
            res[key] = [res[key], val]
        }
    })

    return res
}