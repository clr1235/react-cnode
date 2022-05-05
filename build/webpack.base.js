const path = require('path');

const config = require('./config')
const {fileExtensions} = require('./constants')
const styleRules = require('./rules/styleRules');
const jsRules = require('./rules/jsRules');
const fileRules = require('./rules/fileRules');
const plugins = require('./plguins')
const optimization = require('./optimization')

const baseConf = {
  mode: process.env.NODE_ENV,
  entry: {
      app: path.join(__dirname, '../src/index.tsx'),
  },
  output: {
      path: config.assetsRoot,
      // chunkhash表示打包完的文件内容的hash
      filename: 'js/[name].[chunkhash:8].js',
      // publicPath: "",
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
              // oneOf是一种性能优化，文件只能匹配数组内的一个loader ，避免多次去匹配没有必要的loader
              oneOf: [
                  ...jsRules,
                  ...styleRules,
                  ...fileRules,
              ]
          }
      ]
  },
  plugins,
  performance: false,
  // 优化
  optimization,
  // 控制bundle信息的显示
  // stats: 'errors-warnings',
  stats: {
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false,
    timings: false,
    errors: true,
    env: false,
    version: false,
    hash: false
  }
}


module.exports = baseConf;
