export default {
  attrs: {
    type: {
      type: 'select',
      label: '类型',
      options: ['image', 'video', 'iframe']
    },
    width: {
      type: 'number',
      label: '缩略图宽度',
      attrs: {
        step: 10
      }
    },
    height: {
      type: 'number',
      label: '缩略图高度',
      attrs: {
        step: 10
      }
    },
    lazy: {
      type: 'switch',
      label: '缩略图是否懒加载'
    },
    thumbSuffix: {
      type: 'input',
      label: '缩略图后缀'
    },
    thumbStyle: {
      type: 'json-editor',
      label: '缩略图样式'
    },
    carouselAttrs: {
      type: 'json-editor',
      label: '轮播图属性'
    }
  },
  attrsData: {},
  attrsDefaultData: {
    type: 'image',
    size: 150,
    width: 150,
    height: 150,
    lazy: false,
    thumbStyle: {},
    carouselAttrs: {}
  },
  common: {
    default: {
      type: 'json-editor',
      label: '默认值'
    }
  },
  commonData: {
    default: ['https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg', 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg']
  },
  commonDefaultData: {}
}
