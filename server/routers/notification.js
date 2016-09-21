function codeNotify (aliasId, type, action) {
    if (!aliasId) return
    const projectQuery = new AV.Query('Project')
    projectQuery.equalTo('alias', aliasId)
    projectQuery.include('creator')
    projectQuery.first()
        .then(project => {
            if (project) {
                pushNotification(project.get('creator'), type, 'code', project.get('title') + action)
            } else {
                res.send({
                    error: true,
                    msg: 'invalid id'
                })
            }
        })
}

function pushNotification (user, type, about, content) {
    const UserNotification = AV.Object.extend('UserNotification')
    const notification = new UserNotification()

    const acl = new AV.ACL()
    acl.setPublicReadAccess(false)
    acl.setPublicWriteAccess(false)
    acl.setWriteAccess(user, true)
    acl.setReadAccess(user, true)
    notification.setACL(acl)

    notification.save({
        user: user,
        type: type,
        about: about,
        content: content,
        read: false
    })
    .then(data => {
        console.log('saved')
    })
}

module.exports.codeNotify = codeNotify

