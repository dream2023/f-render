export default {
  attrs: {
    size: {
      type: 'select',
      label: '单选框组尺寸',
      options: [{ text: '默认', value: null }, 'medium', 'small', 'mini']
    },
    textColor: {
      type: 'color',
      label: 'Radio 激活时的文本颜色'
    },
    fill: {
      type: 'color',
      label: 'Radio 激活时的填充色和边框色'
    }
  },
  attrsData: {},
  attrsDefaultData: {
    size: null,
    textColor: '#ffffff',
    fill: '#409EFF'
  },
  common: {
    options: {
      type: 'json-editor',
      label: '选项'
    }
  },
  commonData: {
    options: [
      { text: '选项1', value: 1 },
      { text: '选项2', value: 2 },
      { text: '选项3', value: 3 }
    ]
  },
  commonDefaultData: {}
}
