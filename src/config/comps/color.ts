import { Config } from "@/types/config";

const config: Config = {
  url: "https://element.eleme.cn/#/zh-CN/component/color-picker",
  attrs: {
    popperClass: {
      type: "input",
      label: "ColorPicker 下拉框的类名"
    },
    size: {
      type: "select",
      label: "输入框尺寸",
      options: [{ text: "默认", value: null }, "medium", "small", "mini"]
    },
    showAlpha: {
      type: "switch",
      label: "是否支持透明度选择"
    },
    colorFormat: {
      type: "select",
      label: "写入 v-model 的颜色的格式",
      options: ["hsl", "hsv", "hex", "rgb"]
    },
    predefine: {
      type: "json-editor",
      label: "预定义颜色"
    }
  },
  attrsData: {},
  attrsDefaultData: {
    size: null,
    showAlpha: false,
    colorFormat: "hex",
    predefine: []
  },
  common: {
    default: {
      type: "color",
      label: "默认值"
    }
  },
  commonData: {},
  commonDefaultData: {}
};

export default config;
