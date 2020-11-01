export default {
  type: "textarea",
  label: "多行输入框",
  sort: 2,
  config: {
    url: "https://element.eleme.cn/#/zh-CN/component/input#wen-ben-yu",
    attrs: {
      config: {
        autoSave: {
          type: "switch",
          label: "是否自动保存"
        },
        types: {
          type: "dynamic",
          label: "数据类型"
        },
        placeholder: {
          type: "input",
          label: "输入框占位文本",
          attrs: {
            clearable: true
          }
        },
        rows: {
          type: "number",
          label: "输入框行",
          attrs: {
            min: 1
          }
        },
        autosizeType: {
          type: "radio",
          label: "自适应内容高度值类型",
          default: "switch",
          options: [
            { text: "自适应", value: "switch" },
            { text: "最大最小值", value: "data-editor" }
          ]
        },
        autosize: {
          type: data => data.autosizeType,
          default: data => {
            if (data.autosizeType === "switch") {
              return false;
            } else {
              return { minRows: 2, maxRows: 6 };
            }
          },
          label: "自适应内容高度配置",
          attrs(data) {
            if (data.autosizeType === "data-editor") {
              return {
                types: ["object"],
                rows: 4
              };
            }
          },
          rules: [
            {
              trigger: "blur",
              validator: function(rule, value, callback) {
                if (typeof value === "object") {
                  if (!value.minRows || !value.maxRows) {
                    callback("对象必须包含 minRows 和 maxRows");
                  }
                } else if (typeof value !== "boolean") {
                  callback("数据类型不正确");
                }
              }
            }
          ]
        },
        resize: {
          type: "select",
          label: "控制是否能被用户缩放",
          options: ["both", "horizontal", "vertical"],
          attrs: {
            clearable: true
          }
        },
        showWordLimit: {
          type: "switch",
          label: "是否显示输入字数统计",
          vif: data => data.minlength || data.maxlength
        },
        clearable: {
          type: "switch",
          label: "是否可清空"
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
      data: {}
    }
  }
};
