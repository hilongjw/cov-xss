function removeModule (req, res) {
    if (!req.query.id) return res.send({
        error: true,
        msg: 'module id is must be require'
    })
    const query = new AV.Query('Module')
    query.get(req.query.id)
        .then(mdle => {
            if (mdle) {
                if (mdle.get('creator').id === req.session.user.objectId) {
                    return mdle.destroy()
                } else {
                    return Promise.reject({
                        error: true,
                        msg: 'permission denied'
                    })
                }
            } else {
                return Promise.reject({
                    error: true,
                    msg: 'invalid id'
                })
            }
        })
        .then(data => {
            res.send({
                error: false
            })
        })
        .catch(err => {
            res.send({
                error: true
            })
        })
}

module.exports.removeModule = removeModule