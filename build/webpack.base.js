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
        filename: '[name].[chunkhash:8].bundle.js',
        // publicPath: "/",
        chunkFilename: 'chunk/[name].[chunkhash:8].js',
    },
    resolve: {
        extensions: fileExtensions
    },
    // 此项控制是否生成，以及如何生成source map
    devtool: config.sourceMap,
}