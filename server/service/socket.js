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

            const query = new AV.Query('Project')

            query.equalTo('alias', keyId)
            query.include('creator')
            query.limit(1)
            query.find()
                .then(projects => {
                    if (!projects.length) return
                    console.log('new avaliable client')
                    let project = projects[0]
                    data['CID'] = socket.id
                    data['UID'] = project.get('creator').id
                    data['project'] = project.get('title')
                    clientData['UID'] = project.get('creator').id

                    POOL.Receiver.push(clientData)
                    toSender(project.get('creator').id, 'new-client', data)
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