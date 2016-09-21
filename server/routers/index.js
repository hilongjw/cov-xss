'use strict'
const express = require('express')
const router = express.Router()

const User = require('./user')
const Auth = require('../middleware/auth')
const API = require('./api')
const View = require('./view')
const Module = require('./module')

// views
router.get('/', Auth.isLogin, View.index)
router.get('/login', View.login)

// login api
router.post('/sign-up', Auth.blackCheck, User.signUp)
router.post('/sign-in', Auth.blackCheck, User.signIn)
router.post('/log-out', Auth.isLogin, User.logOut)

// api
router.all('/code', Auth.blackCheck, API.getCodeByAlias)
router.get('/code/fresh', Auth.isLogin, API.delAliasCache)

// get params
router.all('/api/data', Auth.crossOrigin, Auth.blackCheck, API.getParams)

//screenshot
router.post('/api/screenshot', Auth.crossOrigin, Auth.blackCheck, API.getScreenshot)

// module
router.get('/dash/api/remove-module', Auth.isLogin, Module.remove)

module.exports = router