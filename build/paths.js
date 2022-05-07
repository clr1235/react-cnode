const path = require('path');
const fs = require('fs');
// process.cwd()返回当前的工作目录
// fs.realpathSync 返回解析的路径名
const appDirectory = fs.realpathSync(process.cwd());
console.log(process.cwd(), 'cwd---', appDirectory)
// 生成文件的绝对路径
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);
module.exports = {
  appSrc: resolveApp('src')
}
