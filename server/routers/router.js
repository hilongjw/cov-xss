const express = require('express')
const router = express.Router()

const signUp = require('./sign').signUp
const signIn = require('./sign').signIn

const isLogin = require('./dash').isLogin

router.get('/', isLogin, function (req, res) {
  res.render('index', { title: 'index', bundle: 'index'})
})

router.get('/login', function (req, res) {
  res.render('login', { title: 'login', bundle: 'login'})
})

router.post('/sign-up', signUp)
router.post('/sign-in', signIn)

module.exports = router