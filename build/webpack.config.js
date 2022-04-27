const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('./paths');
const {styleRules} = require('./rules/styleRules.js');
const jsRules = require('./rules/jsRules');
const fileRules = require('./rules/fileRules');

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
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
    },
    module: {
        // 将缺失的导出提示成错误而不是警告
        strictExportPresence: true,
        // loaders
        rules: [
            ...jsRules,
            ...styleRules,
            ...fileRules,
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: `${paths.appSrc}/index.html`
        })
    ],
    devServer: {
        client: {
            // 当出现编译错误或警告时，在浏览器中显示全屏覆盖。
            overlay: true,
            // 在浏览器中以百分比显示编译进度。
            progress: false,
            // 告诉 dev-server 它应该尝试重新连接客户端的次数。当为 true 时，它将无限次尝试重新连接。
            reconnect: true,
        },
        // 启用gzip 压缩
        compress: true,
        port: 9000,
        // 启用webpack的模块热替换
        hot: true,
        // 告诉 dev-server 在服务器已经启动后打开默认的浏览器
        open: true,
        // 代理---处理跨域转发
        proxy: {

        }
    },
}