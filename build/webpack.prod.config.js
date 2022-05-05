const path = require('path');
const { merge } = require('webpack-merge');
const baseConfig = require('./webpack.base')
const {vendor} = require('./constants')

module.exports = merge(baseConfig, {
    entry: {
      app: path.join(__dirname, '../src/index.tsx'),
      // 将以下的第三方包单独打包
      vendor,
    }
})
