const path = require('path')

const {APP_ENV, IS_DEV} = require('./constants')

// 静态资源地址
const STATICDOMAIN = APP_ENV === 'prod' ? '.' : '';

module.exports = {
  devPort: 8080,
  srcPath: path.resolve(__dirname, './../src'),
  // 输出的html文件
  index: path.resolve(__dirname, `./../dist/${APP_ENV}/index.html`),
  assetsRoot: path.resolve(__dirname, `./../dist/${APP_ENV}`),
  assetsSubDirectory: 'static',
  // 占位域名
  assetsPublicPath: IS_DEV ? '/' : `${STATICDOMAIN}/`,
  sourceMap: APP_ENV === 'dev' ? 'eval-source-map' : APP_ENV === 'prod' ? 'source-map' : false,
  // 是否压缩分离css代码  
  extractCss: APP_ENV !== 'dev',
}