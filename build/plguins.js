const webpack = require('webpack')
// 该插件将为你生成一个 HTML5 文件，
// 在 body 中使用 script 标签引入你所有 webpack 生成的 bundle
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 每次打包前清除上一次的打包文件残留
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const {isDev, isProd} = require('./constants')
const paths = require('./paths');

const basePlugins = [
    new CleanWebpackPlugin(),
    // HtmlWebpackPlugin 简化了 HTML 文件的创建，以便为你的 webpack 包提供服务。
    // 这对于那些文件名中包含哈希值，并且哈希值会随着每次编译而改变的 webpack 包特别有用。
    // 你可以让该插件为你生成一个 HTML 文件，使用 lodash 模板提供模板，或者使用你自己的 loader。
    new HtmlWebpackPlugin({
        template: `${paths.appSrc}/index.html`
    }),
    // 开发环境启用HMR
    isDev && new webpack.HotModuleReplacementPlugin(),
    // 生产环境抽取css代码需配置 MiniCssExtractPlugin.loader一起使用
    isProd && new MiniCssExtractPlugin({
        filename: 'static/css/[name].[contenthash:8].css',
        chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
    }),
].filter(Boolean);

module.exports = basePlugins;
