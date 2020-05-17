const config = {
  url:
    "https://element.eleme.cn/#/zh-CN/component/date-picker#xuan-ze-yue-fen-fan-wei",
  attrs: {
    startPlaceholder: {
      type: "input",
      label: "范围选择时开始日期的占位内容"
    },
    endPlaceholder: {
      type: "input",
      label: "范围选择时结束日期的占位内容"
    },
    rangeSeparator: {
      type: "input",
      label: "选择范围时的分隔符"
    },
    format: {
      type: "input",
      label: "显示在输入框中的格式"
    },
    valueFormat: {
      type: "input",
      label: "绑定值的格式, 不指定则绑定值为 Date 对象",
      attrs: {
        clearable: true
      }
    },
    clearable: {
      type: "switch",
      label: "是否显示清除按钮"
    },
    editable: {
      type: "switch",
      label: "文本框可输入"
    },
    size: {
      type: "select",
      label: "输入框尺寸",
      options: [{ text: "默认", value: null }, "medium", "small", "mini"]
    },
    unlinkPanels: {
      type: "switch",
      label: "在范围选择器里取消两个日期面板之间的联动"
    },
    align: {
      type: "select",
      label: "对齐方式",
      options: ["left", "center", "right"]
    },
    popperClass: {
      type: "input",
      label: "DatePicker 下拉框的类名"
    },
    prefixIcon: {
      type: "input",
      label: "自定义头部图标的类名"
    },
    clearIcon: {
      type: "input",
      label: "自定义清空图标的类名"
    },
    readonly: {
      type: "switch",
      label: "完全只读"
    },
    validateEvent: {
      type: "switch",
      label: "输入时是否触发表单的校验"
    }
  },
  attrsData: {},
  attrsDefaultData: {
    validateEvent: false,
    unlinkPanels: false,
    readonly: false,
    editable: true,
    clearable: true,
    align: "left",
    size: null,
    rangeSeparator: "-",
    prefixIcon: "el-icon-date",
    clearIcon: "el-icon-circle-close"
  },
  common: {
    default: {
      type: "monthrange",
      label: "默认值"
    }
  },
  commonData: {},
  commonDefaultData: {}
};

export default config;
