import { Config } from "@/types/config";

const config: Config = {
  url: "https://github.com/dream2023/vue-ele-form-codemirror",
  attrs: {
    options: {
      type: "json-editor",
      label: "配置"
    }
  },
  attrsData: {},
  attrsDefaultData: {
    options: {}
  },
  common: {
    default: {
      type: "textarea",
      label: "默认值"
    }
  },
  commonData: {},
  commonDefaultData: {}
};

export default config;
