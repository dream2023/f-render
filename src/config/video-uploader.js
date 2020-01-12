export default {
  attrs: {
    action: {
      type: 'input',
      label: '上传地址',
      required: true
    },
    name: {
      type: 'input',
      label: '上传的文件字段名',
      required: true
    },
    fileSize: {
      type: 'input',
      label: '文件大小限制(MB)',
      attrs: {
        type: 'number',
        min: 0
      }
    },
    width: {
      type: 'input',
      label: '显示宽度',
      attrs: {
        type: 'number',
        step: 10
      }
    },
    height: {
      type: 'input',
      label: '显示高度(默认auto)',
      attrs: {
        type: 'number',
        step: 10
      }
    },
    fileType: {
      type: 'json-editor',
      label: '文件类型'
    },
    isShowTip: {
      type: 'switch',
      label: '是否显示提示'
    },
    withCredentials: {
      type: 'switch',
      label: '支持发送 cookie 凭证信息'
    },
    data: {
      type: 'json-editor',
      label: '上传时附带的额外参数'
    },
    headers: {
      type: 'json-editor',
      label: '设置上传的请求头部'
    }
  },
  attrsData: {
    action: 'https://jsonplaceholder.typicode.com/posts'
  },
  attrsDefaultData: {
    width: 360,
    name: 'file',
    isShowTip: true,
    data: {},
    headers: {},
    fileType: [],
    withCredentials: false
  },
  common: {},
  commonData: {},
  commonDefaultData: {}
}
