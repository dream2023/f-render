module.exports = {
  attrs: {
    placeholder: {
      type: 'input',
      label: '输入框占位文本',
      attrs: {
        clearable: true
      }
    },
    rows: {
      type: 'number',
      label: '输入框行'
    },
    autosizeType: {
      type: 'select',
      label: '是否自适应内容高度',
      options: [
        { text: '默认', value: null },
        { text: '自适应', value: 1 },
        { text: '最大最小值', value: 2 }
      ]
    },
    autosize: {
      type: 'switch',
      label: '是否开启自适应内容高度',
      vif: (data) => data.autosizeType === 1
    },
    minRows: {
      type: 'number',
      label: '最小行数',
      vif: (data) => data.autosizeType === 2
    },
    maxRows: {
      type: 'number',
      label: '最大行数',
      vif: (data) => data.autosizeType === 2
    },
    resize: {
      type: 'select',
      label: '控制是否能被用户缩放',
      options: [
        'both', 'horizontal', 'vertical'
      ],
      attrs: {
        clearable: true
      }
    },
    showWordLimit: {
      type: 'switch',
      label: '是否显示输入字数统计'
    },
    clearable: {
      type: 'switch',
      label: '是否可清空'
    },

    autofocus: {
      type: 'switch',
      label: '原生属性，自动获取焦点'
    },
    tabindex: {
      type: 'input',
      label: '输入框的tabindex',
      attrs: {
        clearable: true
      }
    },
    validateEvent: {
      type: 'switch',
      label: '输入时是否触发表单的校验'
    }
  },
  attrsData: {},
  assistProperty: ['autosizeType'],
  attrsDefaultData: {
    rows: 2,
    autosize: false,
    showWordLimit: false,
    clearable: false
  },
  common: {},
  commonData: {},
  commonDefaultData: {}
}
