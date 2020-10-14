export default {
  type: "markdown-editor",
  label: "markdown编辑器",
  config: {
    url: "https://github.com/dream2023/vue-ele-form-markdown-editor",
    attrs: {
      config: {
        fontSize: {
          type: "input",
          label: "编辑区域文字大小"
        },
        scrollStyle: {
          type: "switch",
          label: "开启滚动条样式(暂时仅支持chrome)"
        },
        boxShadow: {
          type: "switch",
          label: "开启边框阴影"
        },
        boxShadowStyle: {
          type: "input",
          label: "边框阴影样式"
        },
        transition: {
          type: "switch",
          label: "是否开启过渡动画"
        },
        toolbarsBackground: {
          type: "color",
          label: "工具栏背景颜色"
        },
        previewBackground: {
          type: "color",
          label: "预览框背景颜色"
        },
        subfield: {
          type: "switch",
          label: "true： 双栏(编辑预览同屏)， false： 单栏(编辑预览分屏)"
        },
        defaultOpen: {
          type: "radio",
          label: "默认展示区域",
          options: ["edit", "preview"]
        },
        placeholder: {
          type: "input",
          label: "输入框为空时默认提示文本"
        },
        editable: {
          type: "switch",
          label: "是否允许编辑"
        },
        toolbarsFlag: {
          type: "switch",
          label: "工具栏是否显示"
        },
        navigation: {
          type: "switch",
          label: "默认展示目录"
        },
        shortCut: {
          type: "switch",
          label: "是否启用快捷键"
        },
        autofocus: {
          type: "switch",
          label: "自动聚焦到文本框"
        },
        ishljs: {
          type: "switch",
          label: "代码高亮"
        },
        toolbars: {
          type: "data-editor",
          label: "工具栏",
          attrs: {
            types: ["object"],
            rows: 10
          }
        },
        action: {
          type: "input",
          label: "上传地址",
          required: true
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
          label: "默认值",
          default: ""
        }
      }
    }
  }
};
