const config = {
  url: "https://element.eleme.cn/#/zh-CN/component/button",
  attrs: {
    size: {
      type: "select",
      label: "尺寸",
      options: [{ text: "默认", value: null }, "medium", "small", "mini"]
    },
    type: {
      type: "select",
      label: "类型",
      options: [
        { text: "默认", value: null },
        "primary",
        "success",
        "warning",
        "danger",
        "info",
        "text"
      ]
    },
    plain: {
      type: "switch",
      label: "是否朴素按钮"
    },
    round: {
      type: "switch",
      label: "是否圆角按钮"
    },
    circle: {
      type: "switch",
      label: "是否圆形按钮"
    },
    icon: {
      type: "input",
      label: "图标类名",
      attrs: {
        clearable: true
      }
    },
    autofocus: {
      type: "switch",
      label: "是否默认聚焦"
    },
    nativeType: {
      type: "radio",
      label: "原生 type 属性",
      options: ["button", "submit", "reset"]
    }
  },
  attrsData: {},
  attrsDefaultData: {
    size: null,
    type: null,
    plain: false,
    round: false,
    circle: false,
    autofocus: false,
    nativeType: "button"
  },
  common: {
    default: {
      type: "input",
      label: "按钮文本"
    }
  },
  commonData: {
    default: "按钮文本"
  },
  commonDefaultData: {}
};
export default config;
