const path = require('path')
const http = require('http')
const express = require('express')

const LRU = require("lru-cache")
const bodyParser = require('body-parser')
const session = require('express-session')
const compression = require('compression')

const app = express()
const AV = require('./config/config').AV
const router = require('./server/routers/index')
const NODE_ENV = process.env.NODE_ENV || 'production'
const isDev = NODE_ENV === 'development'
const SERVER_CONFIG = require('./config/config').SERVER_CONFIG[NODE_ENV]

global.NODE_ENV = NODE_ENV
global.AV = AV
global.LRUCache = LRU({
    max: 500,
    length: function (n, key) { return n.length * 2 + key.length },
    maxAge: 1000 * 60 * 60
})
global.BlackCache = LRU({
    max: 100,
    maxAge: 1000 * 60 * 60
})

app.set('views', path.join(__dirname, 'server/views'))
app.set('view engine', 'ejs')
app.enable('trust proxy')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    limit: '5mb',
    extended: true
}))
app.use(compression())
app.use(session({
  secret: 'sakjfbasfusfjkasduiasfjknaskfbajnsf89asfasn234hb',
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 3600000 }
}))

app.use(function(err, req, res, next) {
    console.error(err.stack)
    res.status(500).send({msg: 'Something broke!'})
})

app.use(router)

if (isDev) {
    // local variables for all views
    app.locals.env = NODE_ENV;
    app.locals.reload = true;
    
    // static assets served by webpack-dev-middleware & webpack-hot-middleware for development
    const webpack = require('webpack')
    const webpackDevMiddleware = require('webpack-dev-middleware')
    const webpackHotMiddleware = require('webpack-hot-middleware')
    const webpackDevConfig = require('./build/webpack.config.js')

    const compiler = webpack(webpackDevConfig)

    app.use(webpackDevMiddleware(compiler, {
        publicPath: webpackDevConfig.output.publicPath,
        noInfo: true,
        stats: {
            colors: true
        }
    }))

    app.use(webpackHotMiddleware(compiler))

    const server = http.createServer(app)

    app.use(express.static(path.join(__dirname, 'public')))

    server.listen(SERVER_CONFIG.PORT, function(){
        console.log('App (dev) is now running on PORT '+ SERVER_CONFIG.PORT +'!')
    })
} else {
    // static assets served by express.static() for production
    app.use(express.static(path.join(__dirname, 'public')))
    
    app.listen(SERVER_CONFIG.PORT, function () {
        console.log('App (production) is now running on PORT '+ SERVER_CONFIG.PORT +'!')
    })
}
