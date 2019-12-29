<template>
  <div class="app-main-left">
    <el-card
      :body-style="{ padding: '10px' }"
      :header="comp.title"
      :key="comp.title"
      shadow="never"
      style="border: none;"
      v-for="comp of comps"
    >
      <draggable
        :clone="addFormItem"
        :group="{ name: 'form', pull: 'clone', put: false }"
        :list="comp.comps"
        :sort="false"
      >
        <template v-for="item of comp.comps">
          <div :key="item.type" class="type-item">
            <div class="type-item-title">{{ item.type }}</div>
            <div>{{ item.label }}</div>
          </div>
        </template>
      </draggable>
    </el-card>
  </div>
</template>

<script>
import draggable from 'vuedraggable'
import comps from '@/comps'
const cloneDeep = require('lodash.clonedeep')

export default {
  name: 'AppType',
  components: {
    draggable
  },
  data() {
    const formDesc = {
      field: {
        type: 'input',
        label: '数据字段'
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
          'format-tooltip'(val) {
            return `${val} / 24`
          }
        }
      },
      default: {
        type: 'codemirror',
        label: '默认值'
      },
      required: {
        type: 'yesno',
        label: '校检',
        title: '是否必填'
      },
      tip: {
        type: 'input',
        label: '表单项提示'
      }
    }
    this.formDesc = formDesc
    return {
      globalId: 0,
      comps: comps
    }
  },
  methods: {
    // 拖拽后的数据
    addFormItem(data) {
      data = cloneDeep(data)
      data.field = 'key_' + Date.now()
      const formDesc = cloneDeep(this.formDesc)
      if (data.defaultType) {
        formDesc.default.type = data.defaultType
        if (formDesc.default.type === 'json-editor') {
          formDesc.default.default = []
          formDesc.default.attrs = {
            height: '200px'
          }
        }
      }
      if (data.isHideOptions !== false && data.options) {
        formDesc.options = {
          label: '选项',
          type: 'json-editor',
          attrs: {
            height: '200px'
          }
        }
      }
      data.formDesc = formDesc
      data.formData = {
        field: data.field,
        type: data.type,
        label: data.label,
        layout: 24,
        default: data.default
      }
      if (data.isHideOptions !== false && data.options) {
        data.formData.options = data.options
      }
      return data
    }
  }
}
</script>

<style>
.app-main-left {
  line-height: 1.5em;
  height: 100%;
}
.type-item {
  width: 120px;
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
  font-size: 12px;
}

.type-item-title {
  font-weight: bold;
  color: #222;
}
</style>
