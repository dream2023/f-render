<template>
  <div class="app-type-list">
    <el-card
      :body-style="{padding: '10px'}"
      header="内置组件"
      shadow="never"
      style="border: none;"
    >
      <draggable
        :clone="addFormItem"
        :group="{ name: 'form', pull: 'clone', put: false }"
        :list="BuiltInComponents"
        :sort="false"
      >
        <template v-for="item of BuiltInComponents">
          <div
            :key="item.type"
            class="type-item"
          >
            <div class="type-item-title">{{item.type}}</div>
            <div>{{item.label}}</div>
          </div>
        </template>
      </draggable>
    </el-card>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
const cloneDeep = require('lodash.clonedeep')

export default {
  name: 'AppTypeList',
  components: {
    draggable
  },
  data () {
    const options = [
      { text: '选项1', value: 1 },
      { text: '选项2', value: 2 },
      { text: '选项3', value: 3 }
    ]
    const formDesc = {
      type: {
        type: 'input',
        label: '表单项类型',
        attrs: {
          disabled: true
        }
      },
      field: {
        type: 'input',
        label: '字段'
      },
      label: {
        type: 'input',
        label: '标签'
      },
      layout: {
        type: 'slider',
        label: '宽度',
        default: 24,
        attrs: {
          min: 1,
          max: 24,
          'format-tooltip' (val) {
            return `${val} / 24`
          }
        }
      },
      tip: {
        type: 'input',
        label: '表单项提示'
      }
      // ,default: {
      //   type: 'code',
      //   label: '默认值'
      // },
      // options: {
      //   type: 'code',
      //   label: '表单项选项',
      //   tip: '支持字符串数组/对象数组/函数/Promise'
      // },
      // displayFormatter: {
      //   type: 'code',
      //   label: '对显示的值格式化',
      //   tip: '类型为函数'
      // },
      // valueFormatter: {
      //   type: 'code',
      //   label: '对最终提交的值格式化',
      //   tip: '类型为函数'
      // },
      // class: {
      //   type: 'code',
      //   label: '表单项组件的类',
      //   tip: '支持字符串/数组/对象'
      // },
      // on: {
      //   type: 'code',
      //   label: '表单项组件的事件'
      // },
      // slots: {
      //   type: 'code',
      //   label: '表单项组件的插槽'
      // }
    }
    this.formDesc = formDesc
    return {
      globalId: 0,
      BuiltInComponents: [
        {
          type: 'text',
          label: '静态文本',
          default: '我是一段静态文本',
          isHideSlots: true
        },
        {
          type: 'input',
          label: '单行输入框',
          isHideOptions: true
        },
        {
          type: 'autocomplete',
          label: '带建议的输入框',
          isHideOptions: true
        },
        {
          type: 'textarea',
          label: '多行输入框',
          isHideOptions: true
        },
        {
          type: 'password',
          label: '密码框',
          isHideOptions: true
        },
        {
          type: 'number',
          label: '数字',
          isHideOptions: true,
          isHideSlots: true
        },
        {
          type: 'checkbox',
          label: '复选',
          options: options,
          isHideSlots: true
        },
        {
          type: 'checkbox-button',
          label: '复选按钮',
          options: options,
          isHideSlots: true
        },
        {
          type: 'radio',
          label: '单选',
          options: options,
          isHideSlots: true
        },
        {
          type: 'select',
          label: '选择器',
          options: options
        },
        {
          type: 'date',
          label: '日期',
          isHideOptions: true,
          isHideSlots: true
        },
        {
          type: 'daterange',
          label: '日期范围',
          isHideOptions: true,
          isHideSlots: true
        },
        {
          type: 'datetime',
          label: '时间和日期',
          isHideOptions: true,
          isHideSlots: true
        },
        {
          type: 'datetimerange',
          label: '日期和时间范围',
          isHideOptions: true,
          isHideSlots: true
        },
        {
          type: 'time',
          label: '时间',
          isHideOptions: true,
          isHideSlots: true
        },
        {
          type: 'switch',
          label: '开关',
          isHideOptions: true,
          isHideSlots: true
        },
        {
          type: 'slider',
          label: '滑块',
          isHideOptions: true,
          isHideSlots: true
        },
        {
          type: 'color',
          label: '颜色选择器',
          isHideOptions: true,
          isHideSlots: true
        },
        {
          type: 'cascader',
          label: '级联选择器'
        },
        {
          type: 'transfer',
          label: '穿梭框'
        },
        {
          type: 'rate',
          label: '评分组件',
          isHideOptions: true,
          isHideSlots: true
        },
        {
          type: 'tag',
          label: '标签',
          isHideOptions: true,
          isHideSlots: true
        },
        {
          type: 'gallery',
          label: '图片/视频预览',
          default: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
          isHideOptions: true
        },
        {
          type: 'button',
          label: '按钮',
          title: '一个按钮',
          isHideOptions: true,
          isHideSlots: true
        }
      ],
      ExtensionComponent: [

      ]
    }
  },
  methods: {
    addFormItem (data) {
      data = cloneDeep(data)
      data.field = data.type + this.globalId++
      const formDesc = cloneDeep(this.formDesc)
      if (data.isHideSlots === true) {
        // formDesc.slots.type = 'hide'
      }
      if (data.isHideOptions === true) {
        // formDesc.options.type = 'hide'
      }
      // formDesc.default.default = data.default
      data.formDesc = formDesc
      data.formData = {
        field: data.field,
        type: data.type,
        label: data.label,
        default: data.default
      }
      return data
    }
  },
  mounted () {}
}
</script>

<style>
.iconfont {
  font-size: 22px;
  vertical-align: middle;
}

.app-type-list {
  line-height: 1.5em;
}

.type-item {
  width: 130px;
  color: #606266;
  cursor: move;
  border: 1px solid #ebeef5;
  overflow: hidden;
  white-space: nowrap;
  display: inline-block;
  text-overflow: ellipsis;
  border-radius: 3px;
  padding: 6px 8px;
  box-sizing: border-box;
  margin: 5px;
  font-size: 13px;
}

.type-item-title {
  font-weight: bold;
  color: #222;
}
</style>
