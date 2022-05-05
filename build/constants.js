// 存放一些用到的常量
const mode = process.env.NODE_ENV
const isDev = process.env.NODE_ENV === "development"
const isProd = process.env.NODE_ENV === "production"
const appEnv = process.env.APP_ENV || "prod"
const fileExtensions = [".ts", ".tsx", ".js", "jsx", '.json']
// 单独打包的第三方库
const vendor = ['react', 'react-dom', 'react-router-dom', 'mobx', 'mobx-react-lite', 'antd', 'axios']
const usedSourceMap = (node_env) => {
    switch (node_env) {
        case 'development': return 'source-map';
        case 'production': return 'cheap-module-source-map';
        default: return 'source-map'
    }
}

module.exports = {
    mode,
    isDev,
    isProd,
    appEnv,
    fileExtensions,
    usedSourceMap,
    vendor
}
