function io (server) {
    const io = require('socket.io')(server)

    let POOL = {
        Senders: [],
        Receiver: []
    }

    const sendCode = io.of('/run-exec').on('connection', (socket) => {
        console.log('new sender')

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
            POOL.Senders.push({
                keyId: data.keyId,
                client: socket
            })
            POOL.Receiver.forEach(item => {
                if (item.keyId === data.keyId) {
                    toSender(data.keyId, 'new-client', item.data)
                }
            })
        })

        // send execute code
        socket.on('run-code', (data) => {
            if (!data.cId) return
            POOL.Receiver.forEach((item, index) => {
                if (item.cId === data.cId) {
                    item.client.emit('code', data)
                }
            })
        })
    })

    

    const execCode = io.of('/exec').on('connection', (socket) => {
        console.log('got new client')

        // new client init 
        socket.on('init-client', data => {
            if (!data.keyId) return
            const keyId = data.keyId
            data['cId'] = socket.id
            let clientData = {
                keyId: keyId,
                cId: socket.id,
                client: socket,
                data: data
            }

            POOL.Receiver.push(clientData)
            toSender(keyId, 'new-client', clientData.data)
        })

        // client offline
        socket.on('disconnect', () => {
            POOL.Receiver.forEach((item, index) => {
                if (item.client === socket) {
                    toSender(item.keyId, 'die-client', item.cId)
                    POOL.Receiver.splice(index, 1)
                }
            })
        })

        // execute code
        socket.on('exec-code-result', data => {
            POOL.Receiver.forEach((item, index) => {
                if (item.client === socket) {
                    toSender(item.keyId, 'exec-code-result', data)
                }
            })
        })
    })

    function toSender (keyId, channel, data, mailNotify) {
        let sender = POOL.Senders.find(s => s.keyId === keyId)
        if (sender) {
            sender.client.emit(channel, data)
        } else {
            if (mailNotify) {
                console.log('failed at', channel, data)
            }
        }
        
    }
}

module.exports = io