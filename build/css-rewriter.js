'use strict'

const webpackSources = require('webpack-sources')

let Options = {
    fileReg: /\.css$/g,
    processor: null
}

function CovRewriter (options) {
    Object.assign(Options, options)
}

const createCssAsset = (css, originalAsset) => {
    return new webpackSources.RawSource(css);
}

const assetsHandler = (key, assets) => {
    return new Promise((resolve, reject) => {
        if (Options.processor) {
            let val = assets[key]
            Options.processor(val.source())
                .then(data => {
                    console.log('key', key)
                    assets[key] = createCssAsset(data, val)
                    resolve()
                })
        } else {
            resolve()
        }
    })
}

CovRewriter.prototype.assetFind = function (assets) {
    let asset = ''
    let queue = []
    Object.keys(assets).forEach(key => {
        if (Options.fileReg.test(key)) {
            queue.push(assetsHandler(key, assets))
            // asset = assets[key]
            // if (Options.processor) {
            //     assets[key] = this.createCssAsset(Options.processor(asset.source()), asset)
            // }
        }
    })
    return Promise.all(queue)
}

CovRewriter.prototype.apply = function (compiler) {
    compiler.plugin('emit', (compilation, callback) => {
        this.assetFind(compilation.assets)
            .then(done => {
                console.log('done')
                callback()
            })
    })
}

module.exports = CovRewriter