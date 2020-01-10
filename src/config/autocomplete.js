export default {
  attrs: {
    placeholder: {
      type: 'input',
      label: '输入框占位文本',
      attrs: {
        clearable: true
      }
    },
    valueKey: {
      type: 'input',
      label: '输入建议对象中用于显示的键名',
      attrs: {
        clearable: true
      }
    },
    prefixIcon: {
      type: 'input',
      label: '输入框头部图标',
      attrs: {
        clearable: true
      }
    },
    suffixIcon: {
      type: 'input',
      label: '输入框尾部图标',
      attrs: {
        clearable: true
      }
    },
    debounce: {
      type: 'number',
      label: '获取输入建议的去抖延时',
      attrs: {
        step: 100
      }
    },
    placement: {
      type: 'select',
      label: '菜单弹出位置',
      options: ['top', 'top-start', 'top-end', 'bottom', 'bottom-start', 'bottom-end']
    },
    popperClass: {
      type: 'input',
      label: 'Autocomplete 下拉列表的类名'
    },
    triggerOnFocus: {
      type: 'switch',
      label: '是否在输入框 focus 时显示建议列表'
    },
    selectWhenUnmatched: {
      type: 'switch',
      label: '在输入没有任何匹配建议的情况下，按下回车是否触发 select 事件'
    },
    hideLoading: {
      type: 'switch',
      label: '是否隐藏远程加载时的加载图标'
    },
    popperAppendToBody: {
      type: 'switch',
      label: '是否将下拉列表插入至 body 元素。在下拉列表的定位出现问题时，可将该属性设置为 false'
    },
    highlightFirstItem: {
      type: 'switch',
      label: '是否默认突出显示远程搜索建议中的第一项'
    }
  },
  attrsData: {},
  attrsDefaultData: {
    valueKey: 'value',
    debounce: 300,
    placement: 'bottom-end',
    triggerOnFocus: false,
    selectWhenUnmatched: false,
    hideLoading: false,
    popperAppendToBody: true,
    highlightFirstItem: false
  },
  common: {},
  commonData: {},
  commonDefaultData: {}
}
