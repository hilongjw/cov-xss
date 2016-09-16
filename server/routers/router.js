const express = require('express')
const router = express.Router()

const signUp = require('./sign').signUp
const signIn = require('./sign').signIn

const isLogin = require('./dash').isLogin

const getByAlias = require('./api').getByAlias
const delAliasCache = require('./api').delAliasCache


router.get('/', isLogin, function (req, res) {
  res.render('index', { title: 'index', bundle: 'index'})
})

router.get('/login', function (req, res) {
  res.render('login', { title: 'login', bundle: 'login'})
})

// login api
router.post('/sign-up', signUp)
router.post('/sign-in', signIn)

// api
router.all('/code', getByAlias)
router.get('/code/fresh', delAliasCache)


module.exports = router