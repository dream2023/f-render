export default {
  url: 'https://element.eleme.cn/#/zh-CN/component/select',
  attrs: {
    placeholder: {
      type: 'input',
      label: '占位符'
    },
    popperAppendToBody: {
      type: 'switch',
      label: '是否将弹出框插入至 body 元素。在弹出框的定位出现问题时，可将该属性设置为 false'
    },
    multiple: {
      type: 'switch',
      label: '是否多选'
    },
    valueKey: {
      type: 'input',
      label: '作为 value 唯一标识的键名，绑定值为对象类型时必填'
    },
    size: {
      type: 'select',
      label: '输入框尺寸',
      options: [{ text: '默认', value: null }, 'medium', 'small', 'mini']
    },
    clearable: {
      type: 'switch',
      label: '是否可以清空选项'
    },
    collapseTags: {
      type: 'switch',
      label: '多选时是否将选中值按文字的形式展示'
    },
    multipleLimit: {
      type: 'number',
      label: '多选时用户最多可以选择的项目数，为 0 则不限制'
    },
    autocomplete: {
      type: 'input',
      label: 'select input 的 autocomplete 属性'
    },
    filterable: {
      type: 'switch',
      label: '是否可搜索'
    },
    allowCreate: {
      type: 'switch',
      label: '是否允许用户创建新条目，需配合 filterable 使用'
    },
    remote: {
      type: 'switch',
      label: '是否为远程搜索'
    },
    loadingText: {
      type: 'input',
      label: '远程加载时显示的文字'
    },
    noMatchText: {
      type: 'input',
      label: '搜索条件无匹配时显示的文字，也可以使用slot="empty"设置'
    },
    noDataText: {
      type: 'input',
      label: '选项为空时显示的文字，也可以使用slot="empty"设置'
    },
    popperClass: {
      type: 'input',
      label: 'Select 下拉框的类名'
    },
    reserveKeyword: {
      type: 'switch',
      label: '多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词'
    },
    defaultFirstOption: {
      type: 'switch',
      label: '在输入框按下回车，选择第一个匹配项。需配合 filterable 或 remote 使用'
    },
    automaticDropdown: {
      type: 'switch',
      label: '对于不可搜索的 Select，是否在输入框获得焦点后自动弹出选项菜单'
    }
  },
  attrsData: {},
  attrsDefaultData: {
    size: null,
    multiple: false,
    valueKey: 'value',
    clearable: false,
    collapseTags: false,
    multipleLimit: 0,
    autocomplete: 'off',
    filterable: false,
    allowCreate: false,
    remote: false,
    loading: false,
    loadingText: '加载中',
    noMatchText: '无匹配数据',
    noDataText: '无数据',
    reserveKeyword: false,
    defaultFirstOption: false,
    popperAppendToBody: true,
    automaticDropdown: false
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
