export default {
  type: "video-uploader",
  label: "上传视频",
  config: {
    url: "https://github.com/dream2023/vue-ele-form-video-uploader",
    attrs: {
      config: {
        action: {
          type: "input",
          label: "上传地址",
          required: true
        },
        name: {
          type: "input",
          label: "上传的文件字段名",
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
        width: {
          type: "number",
          label: "显示宽度",
          attrs: {
            step: 10,
            min: 0
          }
        },
        height: {
          type: "number",
          label: "显示高度(默认auto)",
          attrs: {
            step: 10,
            min: 0
          }
        },
        fileType: {
          type: "data-editor",
          label: "文件类型",
          attrs: {
            types: ["array"],
            rows: 4
          }
        },
        isShowTip: {
          type: "switch",
          label: "是否显示提示"
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
    }
  }
};
