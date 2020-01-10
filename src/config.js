// 获取config目录下所有的文件
const requireConfig = require.context('./config', false, /\.js$/)
const configList = requireConfig.keys().reduce((acc, file) => {
  acc[file.slice(2, -3)] = requireConfig(file).default
  return acc
}, {})

export default configList
