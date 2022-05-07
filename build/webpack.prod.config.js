const { merge } = require('webpack-merge');
const webpack = require('webpack')
// 该插件将为你生成一个 HTML5 文件，
// 在 body 中使用 script 标签引入你所有 webpack 生成的 bundle
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const baseConfig = require('./webpack.base')
const paths = require('./paths');
const config = require('./config');

module.exports = merge(baseConfig, {
  plugins: [
    // HtmlWebpackPlugin 简化了 HTML 文件的创建，以便为你的 webpack 包提供服务。
    // 这对于那些文件名中包含哈希值，并且哈希值会随着每次编译而改变的 webpack 包特别有用。
    // 你可以让该插件为你生成一个 HTML 文件，使用 lodash 模板提供模板，或者使用你自己的 loader。
    new HtmlWebpackPlugin({
      title: 'webpackv5 + react',
      template: `${paths.appSrc}/index.html`,
      filename: config.indexHtml,
      // 表示要引入的打包chunk
      chunks: ['app', 'vendor', 'libraries', 'commons', 'utilCommon'],
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      }
    }),
    // 生产环境抽取css代码需配置 MiniCssExtractPlugin.loader一起使用
    new MiniCssExtractPlugin({
      filename: 'static/css/[name].[contenthash:8].css',
      chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
    }),
    new webpack.DefinePlugin({
      // 定义 NODE_ENV 环境变量为 production
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
  ],
  optimization: {
    // 提取公共模块 包括第三方库和自定义工具库
    splitChunks: {
      // 表示选择哪些chunk进行优化。
      chunks: "all",  // async表示抽取按需加载模块，all表示对所有模块生效，initial表示抽取初始模块
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
        // 公共模块
        commons: {
          name: 'commons',
          chunks: 'initial',
          idHint: 'commons',
          // 拆分前必须共享模块的最小 chunks 数
          minChunks: 2,
          minSize: 0,
          reuseExistingChunk: true
        },
        // 抽离指定的第三方库 (在入口文件处已做抽离)
        vendor: {
          name: 'vendor',
          chunks: 'all',
          idHint: 'vendor',
          test: /[\\/]node_modules[\\/](react|react-dom|mobx|mobx-react-lite|axios)[\\/]/,
          priority: 10, // 权重，数值越大权重越高
          // 表示是否使用已有的 chunk，true 则表示如果当前的 chunk 包含的模块已经被抽取出去了，那么将不会重新生成新的，即几个 chunk 复用被拆分出去的一个 module
          reuseExistingChunk: false
        },
        // 抽离自定义工具库
        utilCommon: {
          name: "utilCommon",
          idHint: 'utilCommon',
          minSize: 0,     // 将引用模块分离成新代码文件的最小体积
          minChunks: 2,   // 表示将引用模块被不同文件引用了多少次，才能分离生成新chunk
          priority: -20
        }
      }
    },
    // runtimeChunk: {
    //     name: 'manifest'
    // }
  },
  //添加 stats 配置过滤打包时出现的一些统计信息。
  stats: {
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  },
})
