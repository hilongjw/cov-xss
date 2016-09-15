const AV = require('leancloud-storage')
const APP_ID = 'fGSOP41vBX7wu7JTiLFYMTY1-gzGzoHsz'
const APP_KEY = 'UcfcgGazYKtU5sagnhhofhP9'

AV.init({
  appId: APP_ID,
  appKey: APP_KEY
})

module.exports = AV