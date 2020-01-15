export default {
  url: 'https://www.yuque.com/chaojie-vjiel/vbwzgu/kz163g#y1sNr',
  attrs: {
    border: {
      type: 'switch',
      label: '是否显示边框'
    },
    size: {
      type: 'select',
      label: 'Checkbox 的尺寸',
      options: [{ text: '默认', value: null }, 'medium', 'small', 'mini'],
      vif: data => data.border
    },
    indeterminate: {
      type: 'switch',
      label: '设置 indeterminate 状态，只负责样式控制'
    }
  },
  attrsData: {},
  attrsDefaultData: {
    border: false,
    size: null,
    indeterminate: false
  },
  common: {
    title: {
      type: 'input',
      label: '说明文本'
    },
    default: {
      type: 'switch',
      label: '默认值'
    }
  },
  commonData: {
    title: '是否选择'
  },
  commonDefaultData: {}
}
