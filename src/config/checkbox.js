module.exports = {
  common: {
    default: {
      type: 'json-editor',
      label: '默认值',
      default: [],
      style: {
        height: '130px',
        overflow: 'hidden'
      }
    },
    options: {
      type: 'json-editor',
      label: '选项',
      default: [
        { text: '选项1', value: 1 },
        { text: '选项2', value: 2 },
        { text: '选项3', value: 3 }
      ]
    }
  }

}
