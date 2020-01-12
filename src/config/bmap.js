export default {
  attrs: {
    ak: {
      type: 'input',
      label: '密钥',
      required: true
    },
    zoom: {
      type: 'number',
      label: '缩放比'
    },
    isScrollWheelZoom: {
      type: 'switch',
      label: '滚轮缩放大小'
    },
    mapHeight: {
      type: 'number',
      label: '地图高度',
      attrs: {
        step: 50
      }
    },
    isShowNavigation: {
      type: 'switch',
      label: '是否显示缩略控件'
    },
    isShowGeolocation: {
      type: 'switch',
      label: '是否显示自动定位控件'
    },
    placeholder: {
      type: 'input',
      label: '搜索占位符'
    }
  },
  attrsData: {
    ak: '9YLHZRPvUNLhi34Oh2ojqeGSpzCf1rVG'
  },
  attrsDefaultData: {
    zoom: 12,
    isScrollWheelZoom: false,
    mapHeight: 400,
    isShowGeolocation: true
  },
  common: {
    default: {
      type: 'json-editor',
      label: '默认值'
    }
  },
  commonData: {},
  commonDefaultData: {
    default: null
  }
}
