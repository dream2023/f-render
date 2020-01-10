export default {
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
      type: 'radio',
      label: '自适应内容高度值类型',
      options: [
        { text: '自适应', value: 'switch' },
        { text: '最大最小值', value: 'json-editor' }
      ]
    },
    autosize: {
      type: data => data.autosizeType,
      label: '自适应内容高度配置',
      attrs: {
        height: '200px'
      }
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
      label: '是否显示输入字数统计',
      vif: data => data.minlength || data.maxlength
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
    autosizeType: 'switch',
    autosize: false,
    showWordLimit: false,
    clearable: false
  },
  common: {},
  commonData: {},
  commonDefaultData: {}
}
