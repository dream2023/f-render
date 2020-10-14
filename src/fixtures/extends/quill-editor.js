export default {
  type: "quill-editor",
  label: "富文本编辑器",
  config: {
    url: "https://github.com/dream2023/vue-ele-form-quill-editor",
    attrs: {
      config: {
        action: {
          type: "input",
          label: "上传地址",
          required: true
        },
        editorOptions: {
          type: "data-editor",
          label: "编辑器设置",
          tip: "请参考: https://github.com/davidroyer/vue2-editor",
          attrs: {
            types: ["object"]
          }
        },
        placeholder: {
          type: "input",
          label: "占位符"
        },
        fileSize: {
          type: "input",
          label: "文件大小限制(MB)",
          attrs: {
            type: "number",
            min: 0
          }
        },
        name: {
          type: "input",
          label: "上传的文件字段名",
          required: true
        },
        withCredentials: {
          type: "switch",
          label: "支持发送 cookie 凭证信息"
        },
        data: {
          type: "data-editor",
          label: "上传时附带的额外参数",
          attrs: {
            types: ["object"]
          }
        },
        headers: {
          type: "data-editor",
          label: "设置上传的请求头部",
          attrs: {
            types: ["object"]
          }
        },
        editorToolbar: {
          type: "data-editor",
          label: "自定义toolbar",
          attrs: {
            types: ["array"]
          }
        }
      },
      data: {
        action: "https://www.mocky.io/v2/5cc8019d300000980a055e76"
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
