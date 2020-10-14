export default {
  type: "bmap",
  label: "地图",
  config: {
    url: "https://github.com/dream2023/vue-ele-form-bmap",
    attrs: {
      config: {
        ak: {
          type: "input",
          label: "密钥",
          required: true
        },
        zoom: {
          type: "number",
          label: "缩放比",
          attrs: {
            min: 1
          }
        },
        isScrollWheelZoom: {
          type: "switch",
          label: "滚轮缩放大小"
        },
        mapHeight: {
          type: "number",
          label: "地图高度",
          attrs: {
            min: 0,
            step: 50
          }
        },
        isShowNavigation: {
          type: "switch",
          label: "是否显示缩略控件"
        },
        isShowGeolocation: {
          type: "switch",
          label: "是否显示自动定位控件"
        },
        placeholder: {
          type: "input",
          label: "搜索占位符"
        }
      },
      data: {
        ak: "9YLHZRPvUNLhi34Oh2ojqeGSpzCf1rVG"
      }
    },
    common: {
      config: {
        default: {
          type: "data-editor",
          label: "默认值",
          attrs: {
            types: ["string", "object"],
            rows: 4
          }
        }
      }
    }
  }
};
