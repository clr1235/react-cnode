const path = require('path');
const { merge } = require('webpack-merge');

const baseConfig = require('./webpack.base');
const styleRules = require('./rules/styleRules');
const jsRules = require('./rules/jsRules');
const fileRules = require('./rules/fileRules');
const plugins = require('./plguins')
module.exports = merge(baseConfig, {
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
})