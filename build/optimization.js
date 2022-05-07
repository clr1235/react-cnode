// const constants = require('./constants')
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
}
