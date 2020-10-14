export default {
  type: "codemirror",
  label: "代码编辑器",
  config: {
    url: "https://github.com/dream2023/vue-ele-form-codemirror",
    attrs: {
      config: {
        options: {
          type: "data-editor",
          label: "配置",
          attrs: {
            types: ["object"],
            rows: 10
          }
        }
      }
    },
    common: {
      config: {
        default: {
          type: "textarea",
          label: "默认值"
        }
      }
    }
  }
};
