import { Config } from "@/types/config";

const config: Config = {
  url: "https://element.eleme.cn/#/zh-CN/component/transfer",
  attrs: {
    filterable: {
      type: "switch",
      label: "是否可搜索选项"
    },
    filterPlaceholder: {
      type: "input",
      label: "搜索框占位符",
      vif: data => data.filterable
    },
    targetOrder: {
      type: "select",
      label: "右侧列表元素的排序策略",
      options: ["original", "push", "unshift"]
    },
    titles: {
      type: "json-editor",
      label: "自定义列表标题"
    },
    buttonTexts: {
      type: "json-editor",
      label: "自定义按钮文案"
    },
    format: {
      type: "json-editor",
      label: "列表顶部勾选状态文案"
    },
    props: {
      type: "json-editor",
      label: "数据源的字段别名"
    }
  },
  attrsData: {},
  attrsDefaultData: {
    format: {
      noChecked: "",
      hasChecked: ""
    },
    props: {},
    titles: ["列表 1", "列表 2"],
    targetOrder: "original",
    filterable: false,
    filterPlaceholder: "请输入搜索内容"
  },
  common: {
    default: {
      type: "select",
      label: "默认值",
      options: data =>
        data.options.map((item: AnyObj) => ({
          text: item.label,
          value: item.key
        })),
      attrs: {
        multiple: true
      }
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
      { key: 1, label: "选项1" },
      { key: 2, label: "选项3" },
      { key: 3, label: "选项3" },
      { key: 4, label: "选项4" }
    ]
  },
  commonDefaultData: {}
};

export default config;
