const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const paths = require('./paths');
// loader匹配文件
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const lessRegex = /\.(less)$/;
const lessModuleRegex = /\.module\.(less)$/;

module.exports = {
    mode: process.env.NODE_ENV,
    entry: {
        app: path.join(__dirname, '../src/index.tsx'),
    },
    output: {
        path: path.join(__dirname, '../dist'),
        filename: '[name].[chunkhash:8].bundle.js',
        // publicPath: "/",
        chunkFilename: 'chunk/[name].[chunkhash:8].js',
    },
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json']
    },
    module: {
        // 将缺失的导出提示成错误而不是警告
        strictExportPresence: true,
        // loaders
        rules: [
            {
                test: /\.(js|mjs|jsx|ts|tsx)$/,
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
            },
            // 配置css-loader
            {
                test: cssRegex,
                exclude: cssModuleRegex,
                use: [
                    // style-loader将css插入到DOM中， 推荐将 style-loader 与 css-loader 一起使用
                    require.resolve('style-loader'),
                    // css-loader 会对 @import 和 url() 进行处理，就像 js 解析 import/require() 一样。
                    {
                        loader: 'css-loader',
                        options: {
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
                        },
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
                ],
                // 注意，所有导入文件都会受到 tree shaking 的影响。
                // 这意味着，如果在项目中使用类似 css-loader 并 import 一个 CSS 文件，
                // 则需要将其添加到 side effect 列表中，以免在生产模式中无意中将它删除：
                sideEffects: true,
            },
            // 处理.module.css文件
            {
                test: cssModuleRegex,
                use: [
                    require.resolve('style-loader'),
                    {
                        loader: 'css-loader',
                        options: {
                            // 启用/禁用@import规则进行处理，控制@import的解析，默认值为true
                            import: true, 
                            // importLoaders 选项允许你配置在 css-loader 之前有多少 loader 应用于 @imported 资源与 CSS 模块/ICSS 导入。
                            importLoaders: 1,
                            // 启用/禁用css模块或者icss及其配置
                            modules: {
                                mode: 'local',
                                // 允许配置生成的本地标识符(ident)
                                // 建议：开发环境使用 '[path][name]__[local]'  生产环境使用 '[hash:base64]'
                                localIdentName: "[path][name]__[local]--[hash:base64:5]",
                                // 允许为本地标识符名称重新定义基本的 loader 上下文。
                                localIdentContext: path.resolve(__dirname, "src"),
                            },
                            sourceMap: true,
                        },
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
            },
            // 配置支持less
            {
                test: lessRegex,
                exclude: lessModuleRegex,
                use: [
                    // style-loader将css插入到DOM中， 推荐将 style-loader 与 css-loader 一起使用
                    require.resolve('style-loader'),
                    // css-loader 会对 @import 和 url() 进行处理，就像 js 解析 import/require() 一样。
                    {
                        loader: 'css-loader',
                        options: {
                            // 启用/禁用@import规则进行处理，控制@import的解析，默认值为true
                            import: true, 
                            // importLoaders 选项允许你配置在 css-loader 之前有多少 loader 应用于 @imported 资源与 CSS 模块/ICSS 导入。
                            importLoaders: 3,
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
                        },
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
                    'less-loader',
                ],
                sideEffects: true,
            },
            // 支持.module.less文件
            {
                test: lessModuleRegex,
                use: [
                    require.resolve('style-loader'),
                    {
                        loader: 'css-loader',
                        options: {
                            // 启用/禁用@import规则进行处理，控制@import的解析，默认值为true
                            import: true, 
                            // importLoaders 选项允许你配置在 css-loader 之前有多少 loader 应用于 @imported 资源与 CSS 模块/ICSS 导入。
                            importLoaders: 3,
                            // 启用/禁用css模块或者icss及其配置
                            modules: {
                                mode: 'local',
                                // 允许配置生成的本地标识符(ident)
                                // 建议：开发环境使用 '[path][name]__[local]'  生产环境使用 '[hash:base64]'
                                localIdentName: "[path][name]__[local]--[hash:base64:5]",
                                // 允许为本地标识符名称重新定义基本的 loader 上下文。
                                localIdentContext: path.resolve(__dirname, "src"),
                            },
                            sourceMap: true,
                        },
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
                    'less-loader'
                ],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: `${paths.appSrc}/index.html`
        })
    ],
    devServer: {
        client: {
            // 当出现编译错误或警告时，在浏览器中显示全屏覆盖。
            overlay: true,
            // 在浏览器中以百分比显示编译进度。
            progress: false,
            // 告诉 dev-server 它应该尝试重新连接客户端的次数。当为 true 时，它将无限次尝试重新连接。
            reconnect: true,
        },
        // 启用gzip 压缩
        compress: true,
        port: 9000,
        // 启用webpack的模块热替换
        hot: true,
        // 告诉 dev-server 在服务器已经启动后打开默认的浏览器
        open: true,
        // 代理---处理跨域转发
        proxy: {

        }
    },
}