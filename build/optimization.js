const constants = require('./constants')
const config = require('./config')
// webpack v5 自带了terser-webpack-plugin，如果想自定义配置，则仍需要安装该插件
// 该插件使用 terser 来压缩 JavaScript。
const TerserPlugin = require('terser-webpack-plugin')
//这个插件使用 cssnano 优化和压缩 CSS
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

module.exports = {
    // 控制生产环境的下的代码压缩
    minimize: config.isProd,
    //打包压缩js/css文件
    minimizer: [
        new TerserPlugin({
          // 禁止将注释提取到单独的文件中，生成.LICENSE.txt文件
          extractComments: false,
          terserOptions: {
              ecma: undefined,
              warnings: false,
              parse: {
                  ecma: 8,
              },
              compress: {
                  ecma: 5,
                  warnings: false,
                  comparisons: false,
                  inline: 2,
                  // 删除所有的 `console` 语句，可以兼容ie浏览器
                  drop_console: true,
                  pure_funcs: ['console.log'] // 移除console
              },
              mangle: {
                  safari10: true,
              },
              output: {
                  ecma: 5,
                  // 最紧凑的输出
                  beautify: false,
                  // 删除所有的注释
                  comments: false,
                  // 启动此选项是因为没有使用默认值正确缩小表情符号和正则表达式
                  ascii_only: true,
              }
          }
        }),
        new CssMinimizerPlugin(),
    ],
    // 提取公共模块 包括第三方库和自定义工具库
    // splitChunks: {
    //     chunks: "all",  // async表示抽取异步模块，all表示对所有模块生效，initial表示对同步模块生效
    //     // 缓存组
    //     cacheGroups: {
    //     default: false,
    //     buildup: {
    //         chunks: 'all',
    //         test: /[\\/]node_modules[\\/]/
    //     },
    //     commons: {
    //         name: 'commons',
    //         chunks: 'initial',
    //         minChunks: 2,
    //         reuseExistingChunk: true
    //     },
    //     vendors: {  // 抽离第三方库
    //         name: 'vendors',
    //         // test: /[\\/]node_modules[\\/]/,
    //         test: /[\\/]node_modules[\\/](react|react-dom|lodash|moment|immutable|mobx|mobx-react|axios)[\\/]/,
    //         priority: -10, // 权重，数值越大权重越高
    //         // 表示是否使用已有的 chunk，true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的，即几个 chunk 复用被拆分出去的一个 module
    //         reuseExistingChunk: false
    //     },
    //     utilCommon: { // 抽离自定义工具库
    //         name: "utilCommon",
    //         minSize: 0,     // 将引用模块分离成新代码文件的最小体积
    //         minChunks: 2,   // 表示将引用模块如不同文件引用了多少次，才能分离生成新chunk
    //         priority: -20
    //     }
    //     }
    // },
    // runtimeChunk: {
    //     name: 'manifest'
    // }
}
