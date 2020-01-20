export default {
  url: 'https://element.eleme.cn/#/zh-CN/component/radio',
  attrs: {
    size: {
      type: 'select',
      label: '单选框组尺寸',
      options: [{ text: '默认', value: null }, 'medium', 'small', 'mini']
    }
  },
  attrsData: {},
  attrsDefaultData: {
    size: null
  },
  common: {
    default: {
      type: 'radio',
      label: '默认值',
      isReloadOptions: true,
      options: (data) => data.options
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
  commonDefaultData: {}
}
