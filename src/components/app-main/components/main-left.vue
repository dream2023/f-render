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
import _ from 'lodash-es'
import comps from '@/comps'
import configList from '@/config'
import draggable from 'vuedraggable'

export default {
  name: 'AppMainLeft',
  components: {
    draggable
  },
  data() {
    return {
      comps: comps
    }
  },
  methods: {
    // 拖拽后的数据
    addFormItem({ label, type }) {
      // 获取配置
      // 关于 `attrsData` 和 `attrsDefaultData`, 及 `commonData` 和 `commonDefaultData` 的解释请看 src/config/README.md
      const {
        attrsData = {},
        attrsDefaultData = {},
        commonData = {},
        commonDefaultData = {}
      } = configList[type] || {}

      return Object.assign(
        {},
        _.cloneDeep(commonDefaultData),
        _.cloneDeep(commonData),
        {
          field: _.uniqueId('key_'),
          label,
          type,
          // 组件属性
          attrs: {
            ..._.cloneDeep(attrsDefaultData),
            ..._.cloneDeep(attrsData)
          }
        }
      )
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
