module.exports = {
  attrs: {},
  attrsData: {},
  attrsDefaultData: {},
  common: {
    default: {
      type: 'json-editor',
      label: '默认值',
      style: {
        height: '130px',
        overflow: 'hidden'
      }
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
