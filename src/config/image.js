export default {
  url: 'https://www.yuque.com/chaojie-vjiel/vbwzgu/kz163g#ld3lx',
  attrs: {
    fit: {
      type: 'select',
      label: '确定图片如何适应容器框',
      options: ['fill', 'contain', 'cover', 'none', 'scale-down']
    },
    lazy: {
      type: 'switch',
      label: '是否开启懒加载'
    },
    scrollContainer: {
      type: 'input',
      label: '开启懒加载后，监听 scroll 事件的容器',
      vif: data => data.lazy
    },
    previewSrcList: {
      type: 'json-editor',
      label: '图片预览列表'
    },
    zIndex: {
      type: 'number',
      label: '设置图片预览的 z-index'
    }
  },
  attrsData: {},
  attrsDefaultData: {
    fit: 'cover',
    lazy: false,
    previewSrcList: [],
    zIndex: 2000
  },
  common: {
    default: {
      type: 'dynamic',
      label: '默认值',
      attrs: {
        columns: {
          type: 'el-input',
          attrs: {
            placeholder: '图片链接'
          }
        }
      }
    }
  },
  commonData: {
    default: ['https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg']
  },
  commonDefaultData: {}
}
