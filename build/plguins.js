const path = require('path')
const constants = require('./constants')
// 每次打包前清除上一次的打包文件残留
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// 替换antd库中moment为体积更小的dayjs
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin');

const basePlugins = [
  new CleanWebpackPlugin({
    verbose: false,  //开启在控制台输出信息
    root: path.resolve(__dirname, `./../dist/${constants.appEnv}`)
  }),
  new AntdDayjsWebpackPlugin(),
].filter(Boolean);

module.exports = basePlugins;
