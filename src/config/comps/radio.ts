import { Config } from "@/types/config";

const config: Config = {
  url: "https://element.eleme.cn/#/zh-CN/component/radio",
  attrs: {
    size: {
      type: "select",
      label: "单选框组尺寸",
      options: [{ text: "默认", value: null }, "medium", "small", "mini"]
    }
  },
  attrsData: {},
  attrsDefaultData: {
    size: null
  },
  common: {
    default: {
      type: "radio",
      label: "默认值",
      isReloadOptions: true,
      options: data => data.options
    },
    options: {
      type: "json-editor",
      label: "选项",
      tip:
        'options支持`API接口`、`数组`、`函数`、`Promise`等, 具体看<a target="_blank" href="https://www.yuque.com/chaojie-vjiel/vbwzgu/rgenav" class="el-link el-link--primary">文档</a>'
    }
  },
  commonData: {
    options: [
      { text: "选项1", value: 1 },
      { text: "选项2", value: 2 },
      { text: "选项3", value: 3 }
    ]
  },
  commonDefaultData: {}
};

export default config;
