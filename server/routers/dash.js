function isLogin (req, res, next) {
    if (req.session.token) {
        next()
    } else {
        next()
        // res.redirect('/login')
    }
}

module.exports.isLogin = isLogin