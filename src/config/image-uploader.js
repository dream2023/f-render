export default {
  url: 'https://github.com/dream2023/vue-ele-form-image-uploader',
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
    corp: {
      type: 'switch',
      label: '是否剪裁'
    },
    cropHeight: {
      type: 'number',
      label: '裁剪高度',
      vif: data => data.corp
    },
    cropWidth: {
      type: 'number',
      label: '裁剪宽度',
      vif: data => data.corp
    },
    size: {
      type: 'number',
      label: '图片显示大小',
      attrs: {
        step: 10
      }
    },
    fileSize: {
      type: 'input',
      label: '文件大小限制(MB)',
      attrs: {
        type: 'number',
        min: 0
      }
    },
    lazy: {
      type: 'switch',
      label: '图片懒加载'
    },
    limit: {
      type: 'input',
      label: '文件个数显示',
      vif: data => data.multiple,
      attrs: {
        type: 'number'
      }
    },
    drag: {
      type: 'switch',
      label: '是否启用拖拽上传'
    },
    multiple: {
      type: 'switch',
      label: '是否支持多选文件'
    },
    withCredentials: {
      type: 'switch',
      label: '支持发送 cookie 凭证信息'
    },
    isShowTip: {
      type: 'switch',
      label: '是否显示提示'
    },
    title: {
      type: 'input',
      label: '弹窗标题'
    },
    thumbSuffix: {
      type: 'input',
      label: '略图后缀, 例如七牛云缩略图样式 (?imageView2/1/w/20/h/20)'
    },
    fileType: {
      type: 'json-editor',
      label: '文件类型, 例如[\'png\', \'jpg\', \'jpeg\']'
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
    name: 'file',
    crop: false,
    size: 150,
    isShowTip: false,
    drag: false,
    data: {},
    headers: {},
    fileType: [],
    withCredentials: false,
    multiple: false
  },
  common: {},
  commonData: {},
  commonDefaultData: {}
}
