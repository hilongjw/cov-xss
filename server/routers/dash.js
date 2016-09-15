function isLogin (req, res, next) {
    if (req.session.token) {
        next()
    } else {
        res.redirect('/login')
    }
}

module.exports.isLogin = isLogin