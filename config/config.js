const AV = require('leancloud-storage')
const APP_ID = 'fGSOP41vBX7wu7JTiLFYMTY1-gzGzoHsz'
const APP_KEY = 'UcfcgGazYKtU5sagnhhofhP9'
const MASTER_KEY = process.env.MASTER_KEY

const SERVER_CONFIG = {
    development: {
        PORT: 8080
    },
    development_backend: {
        PORT: 8080
    },
    production: {
        PORT: 80
    }
}

AV.init({
    appId: APP_ID,
    appKey: APP_KEY,
    masterKey: MASTER_KEY
})

if (MASTER_KEY) {
    AV.Cloud.useMasterKey()
}

module.exports.AV = AV
module.exports.SERVER_CONFIG = SERVER_CONFIG