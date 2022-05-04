const path = require('path')
const config = require('./config')
const {fileExtensions} = require('./constants')

module.exports = {
    mode: process.env.NODE_ENV,
    entry: {
        app: path.join(__dirname, '../src/index.tsx'),
    },
    output: {
        path: path.join(__dirname, '../dist'),
        filename: 'js/[name].[chunkhash:8].bundle.js',
        // publicPath: "/",
        chunkFilename: 'js/chunk/[name].[chunkhash:8].js',
        // 此项决定了资源模块的输出位置
        assetModuleFilename: 'static/images/[name].[hash:8][ext]',
    },
    resolve: {
        extensions: fileExtensions
    },
    // 此项控制是否生成，以及如何生成source map
    devtool: config.sourceMap,
}