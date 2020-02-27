import { Config } from "@/types/config";
import { getFileName } from "@/helpers/utils";

// 获取comps目录下所有的文件
const requireConfig = require.context("./comps", false, /\.ts$/);

// 获取文件内容
type ConfigList = { [key: string]: Config };
const configList: ConfigList = requireConfig
  .keys()
  .reduce((acc: ConfigList, file: string) => {
    acc[getFileName(file)] = requireConfig(file).default;
    return acc;
  }, {});

export default configList;
