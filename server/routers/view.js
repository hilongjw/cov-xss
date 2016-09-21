const pug = require('pug')
const path = require('path')

function render (view, data) {
    return pug.compileFile(path.join(__dirname, '../views/' + view + '.pug'), {
        cache: true
    })(data)
}

function login (req, res) {
    res.send(render('login', { title: 'Login - Cov XSS', bundle: 'login' }))
}

function index (req, res) {
    res.send(render('index', { title: 'Cov XSS', bundle: 'index' }))
}

module.exports.login = login
module.exports.index = index