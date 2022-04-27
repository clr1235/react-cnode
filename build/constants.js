// 存放一些用到的常量
const IS_DEV = process.env.NODE_ENV === "development"
const APP_ENV = process.env.APP_ENV || "prod"
const FILE_EXTENSIONS = [".ts", ".tsx", ".js", "jsx", '.json']

module.exports = {
  IS_DEV,
  APP_ENV,
  FILE_EXTENSIONS
}