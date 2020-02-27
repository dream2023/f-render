import { Config } from "@/types/config";

const config: Config = {
  url: "https://www.yuque.com/chaojie-vjiel/vbwzgu/kz163g#ZFYvW",
  attrs: {
    placeholder: {
      type: "input",
      label: "占位符"
    },
    popperAppendToBody: {
      type: "switch",
      label:
        "是否将弹出框插入至 body 元素。在弹出框的定位出现问题时，可将该属性设置为 false"
    },
    size: {
      type: "select",
      label: "输入框尺寸",
      options: [{ text: "默认", value: null }, "medium", "small", "mini"]
    },
    clearable: {
      type: "switch",
      label: "是否可以清空选项"
    },
    collapseTags: {
      type: "switch",
      label: "多选时是否将选中值按文字的形式展示"
    },
    multipleLimit: {
      type: "number",
      label: "多选时用户最多可以选择的项目数，为 0 则不限制",
      attrs: {
        min: 0
      }
    },
    popperClass: {
      type: "input",
      label: "Select 下拉框的类名"
    },
    defaultFirstOption: {
      type: "switch",
      label: "在输入框按下回车，选择第一个匹配项"
    },
    automaticDropdown: {
      type: "switch",
      label: "对于不可搜索的 Select，是否在输入框获得焦点后自动弹出选项菜单"
    }
  },
  attrsData: {},
  attrsDefaultData: {
    size: null,
    multiple: false,
    valueKey: "value",
    clearable: false,
    collapseTags: false,
    multipleLimit: 0,
    autocomplete: "off",
    filterable: false,
    allowCreate: false,
    remote: false,
    loading: false,
    loadingText: "加载中",
    noMatchText: "无匹配数据",
    noDataText: "无数据",
    reserveKeyword: false,
    defaultFirstOption: false,
    popperAppendToBody: true,
    automaticDropdown: false
  },
  common: {
    default: {
      type: "dynamic",
      label: "默认值",
      attrs: {
        columns: {
          type: "el-input",
          attrs: {
            placeholder: "默认tag"
          }
        }
      }
    }
  },
  commonData: {},
  commonDefaultData: {}
};

export default config;
