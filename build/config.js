const path = require('path')

const { appEnv, isDev } = require('./constants')

// 静态资源地址
const STATICDOMAIN = appEnv === 'prod' ? '.' : '';

module.exports = {
  devPort: 9000,
  srcPath: path.resolve(__dirname, './../src'),
  // 输出的html文件
  indexHtml: path.resolve(__dirname, `./../dist/${appEnv}/index.html`),
  assetsRoot: path.resolve(__dirname, `./../dist/${appEnv}`),
  assetsSubDirectory: 'static',
  // 占位域名
  assetsPublicPath: isDev ? '/' : `${STATICDOMAIN}/`,
  sourceMap: appEnv === 'dev' ? 'eval-source-map' : appEnv === 'prod' ? 'source-map' : false,
  // 是否压缩分离css代码
  extractCss: appEnv !== 'dev',
}
