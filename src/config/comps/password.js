const config = {
  url: "https://element.eleme.cn/#/zh-CN/component/input#mi-ma-kuang",
  attrs: {
    placeholder: {
      type: "input",
      label: "输入框占位文本",
      attrs: {
        clearable: true
      }
    },
    prefixIcon: {
      type: "input",
      label: "输入框头部图标",
      attrs: {
        clearable: true
      }
    },
    suffixIcon: {
      type: "input",
      label: "输入框尾部图标",
      attrs: {
        clearable: true
      }
    },
    clearable: {
      type: "switch",
      label: "是否可清空"
    },
    minlength: {
      type: "number",
      label: "最小输入长度",
      attrs: {
        min: 0
      }
    },
    maxlength: {
      type: "number",
      label: "最大输入长度",
      attrs: {
        min: 0
      }
    },
    showWordLimit: {
      type: "switch",
      label: "是否显示输入字数统计",
      vif: data => data.minlength || data.maxlength
    },
    size: {
      type: "select",
      label: "输入框尺寸",
      options: [{ text: "默认", value: null }, "medium", "small", "mini"]
    },
    autofocus: {
      type: "switch",
      label: "原生属性，自动获取焦点"
    },
    tabindex: {
      type: "input",
      label: "输入框的tabindex",
      attrs: {
        clearable: true
      }
    },
    validateEvent: {
      type: "switch",
      label: "输入时是否触发表单的校验"
    }
  },
  attrsData: {},
  attrsDefaultData: {
    size: null,
    showPassword: false,
    type: "text",
    showWordLimit: false,
    clearable: false,
    autofocus: false,
    validateEvent: true,
    maxlength: 0,
    minlength: 0
  },
  common: {},
  commonData: {},
  commonDefaultData: {}
};

export default config;
