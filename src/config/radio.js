export default {
  attrs: {
    textColor: {
      type: 'color',
      label: '按钮形式的 Radio 激活时的文本颜色'
    },
    fill: {
      type: 'color',
      label: '按钮形式的 Radio 激活时的填充色和边框色'
    }
  },
  attrsData: {},
  attrsDefaultData: {
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
