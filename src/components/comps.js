const options = [
  { text: '选项1', value: 1 },
  { text: '选项2', value: 2 },
  { text: '选项3', value: 3 }
]
export default [
  {
    title: '内置组件',
    comps: [
      {
        type: 'text',
        label: '静态文本',
        default: '我是一段静态文本',
        defaultType: 'input'
      },
      {
        type: 'input',
        label: '单行输入框',
        isHideOptions: true,
        defaultType: 'input'
      },
      {
        type: 'autocomplete',
        label: '带建议的输入框',
        isHideOptions: true,
        defaultType: 'input'
      },
      {
        type: 'textarea',
        label: '多行输入框',
        isHideOptions: true,
        defaultType: 'input'
      },
      {
        type: 'password',
        label: '密码框',
        isHideOptions: true,
        defaultType: 'input'
      },
      {
        type: 'number',
        label: '数字',
        isHideOptions: true,
        isHideSlots: true,
        defaultType: 'number'
      },
      {
        type: 'checkbox',
        label: '复选',
        options: options,
        defaultType: 'json-editor'
      },
      {
        type: 'checkbox-button',
        label: '复选按钮',
        options: options,
        defaultType: 'json-editor'
      },
      {
        type: 'radio',
        label: '单选',
        options: options,
        defaultType: 'input'
      },
      {
        type: 'select',
        label: '选择器',
        options: options,
        defaultType: 'input'
      },
      {
        type: 'date',
        label: '日期',
        isHideOptions: true,
        defaultType: 'date'
      },
      {
        type: 'dates',
        label: '多日期',
        isHideOptions: true,
        defaultType: 'dates'
      },
      {
        type: 'week',
        label: '周',
        isHideOptions: true,
        defaultType: 'week'
      },
      {
        type: 'month',
        label: '月',
        isHideOptions: true,
        defaultType: 'month'
      },
      {
        type: 'year',
        label: '年',
        isHideOptions: true,
        defaultType: 'year'
      },
      {
        type: 'daterange',
        label: '日期范围',
        isHideOptions: true,
        defaultType: 'daterange'
      },
      {
        type: 'datetime',
        label: '时间和日期',
        isHideOptions: true,
        defaultType: 'datetime'
      },
      {
        type: 'datetimerange',
        label: '日期和时间范围',
        isHideOptions: true,
        defaultType: 'datetimerange'
      },
      {
        type: 'time',
        label: '时间',
        isHideOptions: true,
        defaultType: 'time'
      },
      {
        type: 'switch',
        label: '开关',
        isHideOptions: true,
        defaultType: 'switch'
      },
      {
        type: 'yesno',
        label: '是否',
        title: '是否选择',
        isHideOptions: true,
        defaultType: 'switch'
      },
      {
        type: 'slider',
        label: '滑块',
        isHideOptions: true,
        defaultType: 'slider'
      },
      {
        type: 'color',
        label: '颜色选择器',
        isHideOptions: true,
        defaultType: 'color'
      },
      {
        type: 'cascader',
        label: '级联选择器',
        defaultType: 'json-editor'
      },
      {
        type: 'transfer',
        label: '穿梭框',
        defaultType: 'json-editor'
      },
      {
        type: 'rate',
        label: '评分组件',
        isHideOptions: true,
        defaultType: 'input'
      },
      {
        type: 'tag',
        label: '标签',
        isHideOptions: true,
        defaultType: 'json-editor'
      },
      {
        type: 'gallery',
        label: '图片/视频预览',
        default:
          'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
        isHideOptions: true
      },
      {
        type: 'button',
        label: '按钮',
        title: '一个按钮',
        isHideOptions: true
      }
    ]
  },
  {
    title: '扩展组件',
    comps: [
      {
        type: 'image-uploader',
        label: '上传图片',
        isHideOptions: true,
        defaultType: 'input'
      },
      {
        type: 'upload-file',
        label: '文件上传',
        isHideOptions: true,
        defaultType: 'input'
      },
      {
        type: 'video-uploader',
        label: '上传视频',
        isHideOptions: true,
        defaultType: 'input'
      },
      {
        type: 'quill-editor',
        label: '富文本编辑器',
        isHideOptions: true,
        defaultType: 'input'
      },
      {
        type: 'codemirror',
        label: '代码编辑器',
        isHideOptions: true,
        defaultType: 'codemirror'
      },
      {
        type: 'json-editor',
        label: 'JSON编辑器',
        isHideOptions: true,
        defaultType: 'json-editor'
      },
      {
        type: 'markdown-editor',
        label: 'markdown编辑器',
        isHideOptions: true,
        defaultType: 'markdown-editor'
      },
      {
        type: 'bmap',
        label: '地图',
        isHideOptions: true,
        default: '',
        defaultType: 'codemirror'
      }
    ]
  }
]
