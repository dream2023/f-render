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
    return {
      globalId: 0,
      BuiltInComponents: [
        {
          type: 'text',
          label: '静态文本',
          default: '我是一段静态文本'
        },
        {
          type: 'input',
          label: '单行输入框'
        },
        {
          type: 'autocomplete',
          label: '带建议的输入框'
        },
        {
          type: 'textarea',
          label: '多行输入框'
        },
        {
          type: 'password',
          label: '密码框'
        },
        {
          type: 'number',
          label: '数字'
        },
        {
          type: 'checkbox',
          label: '复选',
          options: options
        },
        {
          type: 'checkbox-button',
          label: '复选按钮',
          options: options
        },
        {
          type: 'radio',
          label: '单选',
          options: options
        },
        {
          type: 'select',
          label: '选择器',
          options: options
        },
        {
          type: 'date',
          label: '日期'
        },
        {
          type: 'daterange',
          label: '日期范围'
        },
        {
          type: 'datetime',
          label: '时间和日期'
        },
        {
          type: 'datetimerange',
          label: '日期和时间范围'
        },
        {
          type: 'time',
          label: '时间'
        },
        {
          type: 'switch',
          label: '开关'
        },
        {
          type: 'slider',
          label: '滑块'
        },
        {
          type: 'color',
          label: '颜色选择器'
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
          label: '评分组件'
        },
        {
          type: 'tag',
          label: '标签'
        },
        {
          type: 'gallery',
          label: '图片/视频预览',
          default: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg'
        },
        {
          type: 'button',
          label: '按钮',
          title: '一个按钮'
        }
      ],
      ExtensionComponent: [

      ]
    }
  },
  methods: {
    addFormItem (data) {
      return Object.assign({}, data, {
        field: data.type + this.globalId++
      })
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
