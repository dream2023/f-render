export default {
  url: 'https://element.eleme.cn/#/zh-CN/component/rate',
  attrs: {
    max: {
      type: 'number',
      label: '最大分值'
    },
    allowHalf: {
      type: 'switch',
      label: '是否允许半选'
    },
    lowThreshold: {
      type: 'number',
      label: '低分和中等分数的界限值，值本身被划分在低分中'
    },
    highThreshold: {
      type: 'number',
      label: '高分和中等分数的界限值，值本身被划分在高分中'
    },
    colors: {
      type: 'json-editor',
      label: 'icon 的颜色(3个元素)'
    },
    voidColor: {
      type: 'color',
      label: '未选中 icon 的颜色'
    },
    disabledVoidColor: {
      type: 'color',
      label: '只读时未选中 icon 的颜色'
    },
    iconClasses: {
      type: 'json-editor',
      label: 'icon 的类名'
    },
    voidIconClass: {
      type: 'input',
      label: '未选中 icon 的类名'
    },
    disabledVoidIconClass: {
      type: 'input',
      label: '只读时未选中 icon 的类名'
    },
    showText: {
      type: 'switch',
      label: '是否显示辅助文字，若为真，则会从 texts 数组中选取当前分数对应的文字内容'
    },
    showScore: {
      type: 'switch',
      label: '是否显示当前分数，show-score 和 show-text 不能同时为真'
    },
    textColor: {
      type: 'color',
      label: '辅助文字的颜色'
    },
    texts: {
      type: 'json-editor',
      label: '辅助文字数组'
    },
    scoreTemplate: {
      type: 'input',
      label: '分数显示模板'
    }
  },
  attrsData: {},
  attrsDefaultData: {
    max: 5,
    allowHalf: false,
    lowThreshold: 2,
    highThreshold: 4,
    colors: ['#F7BA2A', '#F7BA2A', '#F7BA2A'],
    voidColor: '#C6D1DE',
    disabledVoidColor: '#EFF2F7',
    iconClasses: ['el-icon-star-on', 'el-icon-star-on', 'el-icon-star-on'],
    voidIconClass: 'el-icon-star-off',
    disabledVoidIconClass: 'el-icon-star-on',
    showText: false,
    showScore: false,
    textColor: '#1F2D3D',
    texts: ['极差', '失望', '一般', '满意', '惊喜'],
    scoreTemplate: '{value}'
  },
  common: {
    default: {
      type: 'rate',
      label: '默认值'
    }
  },
  commonData: {},
  commonDefaultData: {
    default: 0
  }
}
