export default {
  type: "upload-file",
  label: "文件上传",
  config: {
    url: "https://github.com/dream2023/vue-ele-form-upload-file",
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
        placeholder: {
          type: "input",
          label: "上传按钮文本"
        },
        fileSize: {
          type: "input",
          label: "文件大小限制(MB)",
          attrs: {
            type: "number",
            min: 0
          }
        },
        fileType: {
          type: "data-editor",
          label: '文件类型, 例如["png", "jpg", "jpeg"]',
          attrs: {
            types: ["array"],
            rows: 4
          }
        },
        multiple: {
          type: "switch",
          label: "是否支持多选文件"
        },
        limit: {
          type: "input",
          label: "文件个数显示",
          vif: data => data.multiple,
          attrs: {
            type: "number",
            min: 0
          }
        },
        isCanDownload: {
          type: "switch",
          label: "是否显示下载"
        },
        isCanDelete: {
          type: "switch",
          label: "是否可删除"
        },
        isCanUploadSame: {
          type: "switch",
          label: "是否可上传相同文件"
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
