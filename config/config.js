const AV = require('leancloud-storage')
const APP_ID = 'fGSOP41vBX7wu7JTiLFYMTY1-gzGzoHsz'
const APP_KEY = 'UcfcgGazYKtU5sagnhhofhP9'

const SERVER_CONFIG = {
    ADDRESS: 'http://127.0.0.1',
    PORT: 8080
}

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
})

module.exports.AV = AV
module.exports.SERVER_CONFIG = SERVER_CONFIG