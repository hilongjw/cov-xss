const express = require('express')
const router = express.Router()

const signUp = require('./sign').signUp
const signIn = require('./sign').signIn

const isLogin = require('./auth').isLogin
const blackCheck = require('./auth').blackCheck
const crossOrigin = require('./auth').crossOrigin

const getParams = require('./api').getParams
const getByAlias = require('./api').getByAlias
const delAliasCache = require('./api').delAliasCache
const getScreenshot = require('./api').getScreenshot


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
router.all('/code', blackCheck, getByAlias)
router.get('/code/fresh', isLogin, delAliasCache)

// get params
router.all('/api/data', crossOrigin, blackCheck, getParams)

//screenshot
router.post('/api/screenshot', crossOrigin, getScreenshot)

module.exports = router