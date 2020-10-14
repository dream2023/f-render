export default {
  type: "data-editor",
  label: "JSON编辑器",
  config: {
    url: "https://github.com/dream2023/vue-ele-form-upload-file",
    attrs: {
      config: {
        height: {
          type: "input",
          label: "高度"
        },
        plus: {
          type: "switch",
          label: "是否显示全屏按钮"
        },
        options: {
          type: "data-editor",
          label: "配置",
          attrs: {
            types: ["object"]
          }
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
            types: ["object", "array"]
          }
        }
      }
    }
  }
};
