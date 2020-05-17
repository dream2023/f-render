import { getFileName } from "@/helpers/utils";

// 获取comps目录下所有的文件
const requireConfig = require.context("./comps", false, /\.js$/);

// 获取文件内容
const configList = requireConfig.keys().reduce((acc, file) => {
  acc[getFileName(file)] = requireConfig(file).default;
  return acc;
}, {});

export default configList;
