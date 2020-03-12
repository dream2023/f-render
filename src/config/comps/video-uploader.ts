import { Config } from "@/types/config";

const config: Config = {
  url: "https://github.com/dream2023/vue-ele-form-video-uploader",
  attrs: {
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
      type: "json-editor",
      label: "文件类型"
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
      type: "json-editor",
      label: "上传时附带的额外参数"
    },
    headers: {
      type: "json-editor",
      label: "设置上传的请求头部"
    }
  },
  attrsData: {
    action: "https://www.mocky.io/v2/5cc8019d300000980a055e76"
  },
  attrsDefaultData: {
    width: 360,
    height: 0,
    name: "file",
    isShowTip: true,
    data: {},
    headers: {},
    fileType: [],
    withCredentials: false
  },
  common: {},
  commonData: {},
  commonDefaultData: {}
};

export default config;
