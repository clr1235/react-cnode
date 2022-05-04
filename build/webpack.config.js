const path = require('path');

const config = require('./config')
const {fileExtensions} = require('./constants')
const styleRules = require('./rules/styleRules');
const jsRules = require('./rules/jsRules');
const fileRules = require('./rules/fileRules');
const plugins = require('./plguins')
const optimization = require('./optimization')

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
    module: {
        // 将缺失的导出提示成错误而不是警告
        strictExportPresence: true,
        // loaders
        rules: [
            {
                // 遍历一下所有的loader，直到某一个符合要求
                oneOf: [
                    ...jsRules,
                    ...styleRules,
                    ...fileRules,
                ]
            }
        ]
    },
    plugins,
    // 优化
    optimization,
}