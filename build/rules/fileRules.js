const {assetsPath} = require('../utils')

module.exports = [
    {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
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
                name: 'static/media/[name].[hash].[ext]',
                },
            },
        ],
        // 一个条件，用来与被发出的 request 对应的模块项匹配。
        issuer: {
            and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
        },
    },
]
