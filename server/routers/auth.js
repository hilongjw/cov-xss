function isLogin (req, res, next) {
    if (req.session.token) {
        next()
    } else {
        res.redirect('/login')
    }
}

function blackCheck (req, res, next) {
    if (BlackCache.has('__Black' + req.connection.remoteAddress)) {
        return res.status(500).end()
    }
    if (BlackCache.has('__Watch' + req.connection.remoteAddress)) {
        let log = BlackCache.get('__Watch' + req.connection.remoteAddress)
        if (log.value < 0) {
            BlackCache.del('__Watch' + req.connection.remoteAddress)
            BlackCache.set('__Black' + req.connection.remoteAddress, true)
            res.status(500).send({msg: 'Something broke!'})
        } else {
            BlackCache.set('__Watch' + req.connection.remoteAddress, {
                date: new Date(),
                value: waveRank(log) + log.value
            })
            next()
        }
    } else {
        BlackCache.set('__Watch' + req.connection.remoteAddress, {
            date: new Date(),
            value: 10
        })
        next()
    }
}

function waveRank (log) {
    return ((new Date().getTime() - log.date.getTime())) < 200 ? -1 : 1
}

function crossOrigin (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With')
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS')

    if (req.method == 'OPTIONS') {
        res.send(200)
    }
    else {
        next()
    }
}

module.exports.isLogin = isLogin
module.exports.blackCheck = blackCheck
module.exports.crossOrigin = crossOrigin