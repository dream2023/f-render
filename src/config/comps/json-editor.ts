import { Config } from "@/types/config";

const config: Config = {
  url: "https://github.com/dream2023/vue-ele-form-upload-file",
  attrs: {
    height: {
      type: "input",
      label: "高度"
    },
    plus: {
      type: "switch",
      label: "是否显示全屏按钮"
    },
    options: {
      type: "json-editor",
      label: "配置"
    }
  },
  attrsData: {},
  attrsDefaultData: {
    height: "300px",
    plus: false,
    options: {}
  },
  common: {
    default: {
      type: "json-editor",
      label: "默认值"
    }
  },
  commonData: {},
  commonDefaultData: {}
};

export default config;
