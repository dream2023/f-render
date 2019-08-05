<template>
  <div class="app-type-container">
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
import comps from './comps'
const cloneDeep = require('lodash.clonedeep')

export default {
  name: 'AppType',
  components: {
    draggable
  },
  data () {
    const formDesc = {
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
      default: {
        type: 'codemirror',
        label: '默认值'
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
    addFormItem (data) {
      data = cloneDeep(data)
      data.field = data.type + this.globalId++
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
      data.formDesc = formDesc
      data.formData = {
        field: data.field,
        type: data.type,
        label: data.label,
        default: data.default
      }
      return data
    }
  }
}
</script>

<style>
.app-type-container {
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
  font-size: 13px;
}

.type-item-title {
  font-weight: bold;
  color: #222;
}
</style>
