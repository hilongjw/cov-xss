'use strict'

function genErrorCode (type, msg) {
    return {
        error: type,
        msg: msg
    }
}

function newUser (username, password, email) {
    return new Promise((resolve, reject) => {
        const user = new AV.User()
        user.setUsername(username)
        user.setPassword(password)
        user.setEmail(email)
        user.signUp()
            .then(user => {
                resolve(user)
            }, (err) => {
                console.log('Error at newUser: ', err)
                reject({
                    error: true,
                    msg: '服务器遇到了一些问题...'
                })
            })
        })
}

function checkInvitation (code) {
    return new Promise((resolve, reject) => {
        const query = new AV.Query('Invitation')
        query.equalTo('code', code)
        query.equalTo('used', false)
        query.first()
            .then(invitationCode => {
                if (invitationCode) {
                    resolve(invitationCode)
                } else {
                    reject({
                        error: true,
                        msg: '无效的邀请码'
                    })
                }
            }, err => {
                console.log('Error at checkInvitation: ', err)
                reject({
                    error: true,
                    msg: '无效的邀请码*'
                })
            })
    })
}

function signUp (req, res) {
     if (!req.body.username ||
        !req.body.password ||
        !req.body.invitation) {
        return  res.send({
            error: true,
            msg: 'some params is must required'
        })
     }

     let invitationCode = null
     let loginedUser = null

     checkInvitation(req.body.invitation)
        .then(code => {
            invitationCode = code
            return newUser(req.body.username, req.body.password)
        })
        .then(user => {
            loginedUser = user
            invitationCode.set('used', true)
            return invitationCode.save()
        })
        .then(() => {
            res.send({
                error: false,
                msg: '注册成功, 马上登陆吧!',
                user: loginedUser
            })
        })
        .catch(err => {
            res.send(err)
        })
}

function signIn (req, res) {
    if (!req.body.username ||
        !req.body.password) {
        return  res.send({
            error: true,
            msg: 'some params is must required'
        })
    }

    AV.User.logIn(req.body.username, req.body.password)
        .then(user => {
            req.session.token = user._sessionToken
            req.session.user = user
            res.send({
                error: false,
                token: user._sessionToken
            })
        }, err => {
            console.log(err)
            res.send({
                error: true,
                msg: '用户名与密码不匹配'
            })
        })
}

function logOut (req, res) {
    req.session.destroy((err) => {
        res.send({
            error: false
        })
    })
}

module.exports.signUp = signUp
module.exports.signIn = signIn
module.exports.logOut = logOut