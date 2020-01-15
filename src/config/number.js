export default {
  url: 'https://element.eleme.cn/#/zh-CN/component/input-number',
  attrs: {
    placeholder: {
      type: 'input',
      label: '输入框默认 placeholder'
    },
    min: {
      type: 'number',
      label: '最小值'
    },
    max: {
      type: 'number',
      label: '最大值'
    },
    step: {
      type: 'number',
      label: '步长'
    },
    stepStrictly: {
      type: 'switch',
      label: '是否只能输入 step 的倍数'
    },
    precision: {
      type: 'number',
      label: '数值精度'
    },
    size: {
      type: 'radio',
      label: '计数器尺寸',
      options: [{ text: '默认', value: null }, 'large', 'small']
    },
    controls: {
      type: 'switch',
      label: '是否使用控制按钮'
    },
    controlsPosition: {
      type: 'radio',
      label: '控制按钮位置',
      options: [{ text: '默认', value: null }, 'right']
    }
  },
  attrsData: {},
  attrsDefaultData: {
    size: null,
    min: -Infinity,
    max: Infinity,
    step: 1,
    controlsPosition: null,
    precision: 0,
    stepStrictly: false,
    controls: true
  },
  common: {
    default: {
      type: 'number',
      label: '默认值'
    }
  },
  commonData: {},
  commonDefaultData: {
  }
}
