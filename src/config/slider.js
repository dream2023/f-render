export default {
  url: 'https://element.eleme.cn/#/zh-CN/component/slider',
  attrs: {
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
    showInput: {
      type: 'switch',
      label: '是否显示输入框，仅在非范围选择时有效'
    },
    showInputControls: {
      type: 'switch',
      label: '在显示输入框的情况下，是否显示输入框的控制按钮'
    },
    inputSize: {
      type: 'select',
      label: '输入框的尺寸',
      options: ['large', 'medium', 'small', 'mini']
    },
    showStops: {
      type: 'switch',
      label: '是否显示间断点'
    },
    showTooltip: {
      type: 'switch',
      label: '是否显示 tooltip'
    },
    range: {
      type: 'switch',
      label: '是否为范围选择'
    },
    vertical: {
      type: 'switch',
      label: '是否竖向模式'
    },
    height: {
      type: 'input',
      label: 'Slider 高度，竖向模式时必填'
    },
    label: {
      type: 'input',
      label: '屏幕阅读器标签'
    },
    debounce: {
      type: 'number',
      label: '输入时的去抖延迟，毫秒，仅在show-input等于true时有效',
      attrs: {
        step: 100
      }
    },
    tooltipClass: {
      type: 'input',
      label: 'tooltip 的自定义类名'
    },
    marks: {
      type: 'json-editor',
      label: '标记，key 的类型必须为 number 且取值在闭区间 [min, max] 内，每个标记可以单独设置样式'
    }
  },
  attrsData: {},
  attrsDefaultData: {
    min: 0,
    max: 100,
    step: 1,
    showInput: false,
    showInputControls: true,
    inputSize: 'small',
    showStops: false,
    showTooltip: true,
    range: false,
    vertical: false,
    debounce: 300,
    marks: {}
  },
  common: {
    default: {
      type: 'number',
      label: '默认值'
    }
  },
  commonData: {},
  commonDefaultData: {}
}
