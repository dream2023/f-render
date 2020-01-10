export default {
  attrs: {
    placeholder: {
      type: 'input',
      label: '占位内容'
    },
    format: {
      type: 'input',
      label: '显示在输入框中的格式'
    },
    clearable: {
      type: 'switch',
      label: '是否显示清除按钮'
    },
    editable: {
      type: 'switch',
      label: '文本框可输入'
    },
    size: {
      type: 'select',
      label: '输入框尺寸',
      options: [{ text: '默认', value: null }, 'medium', 'small', 'mini']
    },
    popperClass: {
      type: 'input',
      label: 'DatePicker 下拉框的类名'
    },
    pickerOptions: {
      type: 'json-editor',
      label: '当前时间日期选择器特有的选项'
    },
    prefixIcon: {
      type: 'input',
      label: '自定义头部图标的类名'
    },
    clearIcon: {
      type: 'input',
      label: '自定义清空图标的类名'
    },
    readonly: {
      type: 'switch',
      label: '完全只读'
    }
  },
  attrsData: {},
  attrsDefaultData: {
    readonly: false,
    editable: true,
    clearable: true,
    size: null,
    pickerOptions: {},
    prefixIcon: 'el-icon-date',
    clearIcon: 'el-icon-circle-close'
  },
  common: {
    default: {
      type: 'dates',
      label: '默认值'
    }
  },
  commonData: {},
  commonDefaultData: {}
}
