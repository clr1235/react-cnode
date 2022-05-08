// const { assetsPath } = require('../utils')

module.exports = [
  {
    // 资源模块(asset module)是一种模块类型，它允许使用资源文件（字体，图标等）而无需配置额外 loader。
    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
    // test: /\.(png|jpe?g|gif|eot|ttf|woff|woff2|mp4)$/i,
    type: 'asset',
    parser: {
      dataUrlCondition: {
        maxSize: 10000,
      },
    },
  },
  {
    test: /\.svg$/,
    use: [
      {
        // @svgr/webpack允许将svg作为组件使用
        loader: require.resolve('@svgr/webpack'),
        options: {
          prettier: false,
          svgo: false,
          svgoConfig: {
            plugins: [{ removeViewBox: false }],
          },
          titleProp: true,
          ref: true,
        },
      },
      {
        loader: require.resolve('file-loader'),
        options: {
          name: 'static/images/svg/[name].[hash:8].[ext]',
        },
      },
    ],
    // 一个条件，用来与被发出的 request 对应的模块项匹配。
    issuer: {
      and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
    },
  },
]
