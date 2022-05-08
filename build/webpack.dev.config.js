const { merge } = require('webpack-merge');
const webpack = require('webpack')
// 该插件将为你生成一个 HTML5 文件，
// 在 body 中使用 script 标签引入你所有 webpack 生成的 bundle
const HtmlWebpackPlugin = require('html-webpack-plugin');
const baseConfig = require('./webpack.base')
const paths = require('./paths');
const config = require('./config');

module.exports = merge(baseConfig, {
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
    port: config.devPort,
    // 告诉 dev-server 在服务器已经启动后打开默认的浏览器
    open: true,
    // 代理---处理跨域转发
    proxy: {
      '/api/v1': {
        // 当遇到 /api 路径时，将其转换成 target 的值
        target: 'http://127.0.0.1:7001',
        changeOrigin: true,
      }
    }
  },
  watchOptions: {
    ignored: /node_modules/,
    aggregateTimeout: 600,
  },
  optimization: {
    // 开发环境不压缩代码
    minimize: false,
    // 提取公共模块 包括第三方库和自定义工具库
    splitChunks: {
      // 表示选择哪些chunk进行优化。
      chunks: "all",  // async表示抽取异步模块，all表示对所有模块生效，initial表示对同步模块生效
      minSize: 30000, // 模块超过30k自动被抽离成公共模块
      minChunks: 1, // 模块被引用>=1次，便分割
      // 缓存组
      cacheGroups: {
        // 禁用任何的默认缓存组
        default: false,
        // 抽取所有的第三方库
        libraries: {
          chunks: 'all',
          idHint: 'thirdPartyLibraries',
          name: 'libraries',
          // 控制此缓存组选择的模块
          test: /[\\/]node_modules[\\/]/
        },
      }
    },
  },
  plugins: [
    // HtmlWebpackPlugin 简化了 HTML 文件的创建，以便为你的 webpack 包提供服务。
    // 这对于那些文件名中包含哈希值，并且哈希值会随着每次编译而改变的 webpack 包特别有用。
    // 你可以让该插件为你生成一个 HTML 文件，使用 lodash 模板提供模板，或者使用你自己的 loader。
    new HtmlWebpackPlugin({
      title: 'webpackv5 + react',
      template: `${paths.appSrc}/index.html`,
      filename: 'index.html',
    }),
    // 开发环境启用HMR
    new webpack.HotModuleReplacementPlugin(),
  ],
  // 控制bundle信息的显示
  stats: {
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false,
    errors: true,
    env: false,
    version: false,
    hash: false,
    // 添加构建日期与时间信息
    builtAt: false,
    // 添加时间信息
    timings: true,
  },
})
