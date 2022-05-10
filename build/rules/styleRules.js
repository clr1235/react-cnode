const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
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
    // 生产环境使用 MiniCssExtractPlugin提取css文件
    isProd && MiniCssExtractPlugin.loader,
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
      },
    },
  ].filter(Boolean); // .filter(Boolean)会将数组中的false项剔除掉
  if (preProcessor) {
    loaders.push(
      {
        loader: require.resolve(preProcessor),
        // 如果使用less-loader@5，请移除 lessOptions 这一级直接配置选项。
        options: {
          // 此处用来覆盖修改antd库的全局色彩样式
          lessOptions: {
            modifyVars: {
              '@primary-color': '#1890ff', // 全局主色
              '@link-color': '#1890ff', // 链接色
              '@success-color': '#52c41a', // 成功色
              '@warning-color': '#faad14', // 警告色
              '@error-color': '#f5222d', // 错误色
              '@font-size-base': '14px', // 主字号
              '@heading-color': 'rgba(0, 0, 0, 0.85)', // 标题色
              '@text-color': 'rgba(0, 0, 0, 0.65)', // 主文本色
              '@text-color-secondary': 'rgba(0, 0, 0, 0.45)', // 次文本色
              '@disabled-color': 'rgba(0, 0, 0, 0.25)', // 失效色
              '@border-radius-base': '4px', // 组件/浮层圆角
              '@border-color-base': '#d9d9d9', // 边框色
              // 浮层阴影
              '@box-shadow-base': '0 3px 6px - 4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
            },
            javascriptEnabled: true,
          },
        },
      }
    );
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
        localIdentContext: path.resolve(__dirname, "../../src"),
      },
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
        localIdentContext: path.resolve(__dirname, "../../src"),
      },
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
        localIdentContext: path.resolve(__dirname, "../../src"),
      },
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
        localIdentContext: path.resolve(__dirname, "../../src"),
      },
    }, 'less-loader'),
  }
]
module.exports = styleRules;
