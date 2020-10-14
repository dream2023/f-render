export default {
  type: "dynamic",
  label: "动态组件",
  config: {
    url: "https://github.com/dream2023/vue-ele-form-dynamic",
    attrs: {
      config: {
        columns: {
          type: "data-editor",
          label: "列",
          required: true,
          tip: "可以是数组或者对象",
          attrs: {
            types: ["array", "object"]
          }
        },
        rules: {
          type: "data-editor",
          label: "校检规则",
          tip:
            "当columns为数组时, 则rules必须为对象类型, 指定校检字段, 当columns为对象时, 则rules为数组类型",
          attrs: {
            types: ["array", "object"],
            rows: 10
          }
        },
        delimiter: {
          type: "input",
          label: "分割符"
        }
      },
      data: {}
    },
    common: {
      config: {
        default: {
          type: "data-editor",
          label: "默认值",
          attrs: {
            types: ["array", "object"]
          }
        }
      },
      data: {
        default: []
      }
    }
  }
};
