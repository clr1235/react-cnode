const paths = require('../paths');
module.exports = [{
  test: /\.(js|mjs|jsx)$/,
  include: paths.appSrc,
  use: {
    // 当有设置cacheDirectory时，指定的目录将用来缓存 loader 的执行结果。
    loader: 'babel-loader?cacheDirectory',
    options: {
      presets: ['@babel/preset-env', "@babel/preset-react"],
      // 'transform-runtime' 插件告诉 Babel,要引用runtime来代替注入
      // 引入 @babel/plugin-transform-runtime 并且使所有辅助代码从这里引用。
      plugins: ['@babel/plugin-transform-runtime'],
    }
  }
}, {
  test: /\.(ts|tsx)$/,
  include: paths.appSrc,
  use: {
    loader: 'ts-loader',
  }
}]
