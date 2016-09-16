const CACHE_KEY_MAP = {
    'alias': '__PROJECT__ALIAS'
}

function cacheKey (key, type) {
    return CACHE_KEY_MAP[type] + key
}

function getByAlias (req, res) {
    if (!req.query.id) return res.end()
    const alias = req.query.id

    if (LRUCache.has(cacheKey(alias, 'alias'))) {
        return res.send(LRUCache.get(cacheKey(alias, 'alias')))
    }

    const query = new AV.Query('Project')
        query.equalTo('alias', alias)
        query.first()
            .then(project => {
                if (!project) {
                    res.end()
                } else {
                    LRUCache.set(cacheKey(alias, 'alias'), project.get('code'))
                    res.send(project.get('code'))
                }
            })
            .catch(err => {
                console.error('Error at getByAlias', err)
            })
}

function delAliasCache (req, res) {
    if (!req.query.id) return res.send({
        error: true,
        msg: 'id is must be required'
    })
    LRUCache.del(cacheKey(req.query.id, 'alias'))
    res.send({
        error: false
    })
}

function getParams (req, res) {
    console.log(req.connection.remoteAddress)
    res.send([req.ip, req.headers['X-Real-IP'], req.connection.remoteAddress])
}

module.exports.getByAlias = getByAlias
module.exports.delAliasCache = delAliasCache
module.exports.getParams = getParams