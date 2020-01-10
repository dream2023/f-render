export default {
  attrs: {
    activeColor: {
      type: 'color',
      label: 'switch 打开时的背景色'
    },
    inactiveColor: {
      type: 'color',
      label: 'switch 关闭时的背景色'
    },
    width: {
      type: 'number',
      label: 'switch 的宽度（像素）',
      attrs: {
        step: 10
      }
    },
    activeIconClass: {
      type: 'input',
      label: 'switch 打开时所显示图标的类名，设置此项会忽略 active-text'
    },
    inactiveIconClass: {
      type: 'input',
      label: 'switch 关闭时所显示图标的类名，设置此项会忽略 inactive-text'
    },
    activeText: {
      type: 'input',
      label: 'switch 打开时的文字描述'
    },
    inactiveText: {
      type: 'input',
      label: 'switch 关闭时的文字描述'
    },
    validateEvent: {
      type: 'switch',
      label: '改变 switch 状态时是否触发表单的校验'
    }
  },
  attrsData: {},
  attrsDefaultData: {
    width: 40,
    activeColor: '#409EFF',
    inactiveColor: '#C0CCDA',
    validateEvent: true
  },
  common: {
    default: {
      type: 'switch',
      label: '默认值'
    }
  },
  commonData: {},
  commonDefaultData: {}
}
