export default {
  attrs: {
    min: {
      type: 'number',
      label: '可被勾选的 Checkbox 的最小数量'
    },
    max: {
      type: 'number',
      label: '可被勾选的 Checkbox 的最大数量'
    }
  },
  attrsData: {},
  attrsDefaultData: {
    min: 0,
    max: 0
  },
  common: {
    default: {
      type: 'json-editor',
      label: '默认值'
    },
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
  commonDefaultData: {
    default: []
  }
}
