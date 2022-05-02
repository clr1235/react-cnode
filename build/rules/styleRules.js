const path = require('path');
const {
    isDev,
    isProd,
} = require('../constants')
// loader匹配文件
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const lessRegex = /\.(less)$/;
const lessModuleRegex = /\.module\.(less)$/;

const getStyleLoaders = (cssOptions, preProcessor) => {
    const loaders = [
        isDev && require.resolve('style-loader'),
        // isProd && {
        //     // 生产环境使用 MiniCssExtractPlugin提取css文件
        // },
        {
            loader: require.resolve('css-loader'),
            options: cssOptions,
        },
        // 自动添加css浏览器前缀
        {
            loader: require.resolve('postcss-loader'),
            options: {
              postcssOptions: {
                ident: 'postcss',
                config: false,
                plugins: [
                      'postcss-flexbugs-fixes', // 此插件用来修复flexbug的问题
                      [
                        'postcss-preset-env', // 包含了autoprefixer
                        {
                          autoprefixer: {
                            flexbox: 'no-2009',
                          },
                          // 规定按照哪个阶段的css来实现polyfill
                          stage: 3, // 默认启用阶段2的功能
                        },
                      ],
                      'postcss-normalize', // PostCSS归一化，可让您使用formantize.css或Sanitize.css的各个部分。
                ]
              },
              sourceMap: true,
            },
        },
    ]
    if (preProcessor) {
        if (preProcessor) {
            loaders.push(
              {
                loader: require.resolve(preProcessor),
                options: {
                  sourceMap: true,
                },
              }
            );
          }
    }
    return loaders
}

const styleRules = [
    // 配置css-loader
    {
        test: cssRegex,
        exclude: cssModuleRegex,
        use: getStyleLoaders({
            // 启用/禁用@import规则进行处理，控制@import的解析，默认值为true
            import: true, 
            // importLoaders 选项允许你配置在 css-loader 之前有多少 loader 应用于 @imported 资源与 CSS 模块/ICSS 导入。
            importLoaders: 1,
            // 启用/禁用css模块或者icss及其配置
            modules: {
                mode: 'icss',
                // 允许配置生成的本地标识符(ident)
                // 建议：开发环境使用 '[path][name]__[local]'  生产环境使用 '[hash:base64]'
                localIdentName: "[path][name]__[local]--[hash:base64:5]",
                // 允许为本地标识符名称重新定义基本的 loader 上下文。
                localIdentContext: path.resolve(__dirname, "src"),
            },
            sourceMap: true,
        }),
        // 注意，所有导入文件都会受到 tree shaking 的影响。
        // 这意味着，如果在项目中使用类似 css-loader 并 import 一个 CSS 文件，
        // 则需要将其添加到 side effect 列表中，以免在生产模式中无意中将它删除：
        sideEffects: true,
    },
    // 处理.module.css文件
    {
        test: cssModuleRegex,
        use: getStyleLoaders({
            import: true, 
            importLoaders: 1,
            modules: {
                mode: 'local',
                localIdentName: "[path][name]__[local]--[hash:base64:5]",
                localIdentContext: path.resolve(__dirname, "src"),
            },
            sourceMap: true,
        }),
    },
    // 配置支持less
    {
        test: lessRegex,
        exclude: lessModuleRegex,
        use: getStyleLoaders({
            import: true, 
            importLoaders: 3,
            modules: {
                mode: 'icss',
                localIdentName: "[path][name]__[local]--[hash:base64:5]",
                localIdentContext: path.resolve(__dirname, "src"),
            },
            sourceMap: true,
        }, 'less-loader'),
        sideEffects: true,
    },
    // 支持.module.less文件
    {
        test: lessModuleRegex,
        use: getStyleLoaders({
            import: true, 
            importLoaders: 3,
            modules: {
                mode: 'local',
                localIdentName: "[path][name]__[local]--[hash:base64:5]",
                localIdentContext: path.resolve(__dirname, "src"),
            },
            sourceMap: true,
        }, 'less-loader'),
    }
]

module.exports = {
    getStyleLoaders,
    styleRules
}