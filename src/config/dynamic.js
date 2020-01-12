export default {
  attrs: {
    columns: {
      type: 'json-editor',
      label: '列',
      required: true,
      tip: '可以是数组或者对象'
    },
    rules: {
      type: 'json-editor',
      label: '校检规则',
      tip: '当columns为数组时, 则rules必须为对象类型, 指定校检字段, 当columns为对象时, 则rules为数组类型'
    },
    delimiter: {
      type: 'input',
      label: '分割符'
    }
  },
  attrsData: {
    columns: {
      type: 'el-input',
      attrs: {
        placeholder: '电脑配件'
      }
    }
  },
  attrsDefaultData: {
    rules: [],
    delimiter: '-'
  },
  common: {
    default: {
      type: 'json-editor',
      label: '默认值'
    }
  },
  commonData: {
    default: []
  },
  commonDefaultData: {
  }
}
