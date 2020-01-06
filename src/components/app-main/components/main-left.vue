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
import configList from '@/config'
import cloneDeep from 'lodash.clonedeep'

export default {
  name: 'AppType',
  components: {
    draggable
  },
  data() {
    return {
      comps: comps,
      // 默认值
      commonData: {
        layout: 24
      }
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
        this.commonData,
        cloneDeep(commonDefaultData),
        cloneDeep(commonData),
        {
          field: 'key_' + Date.now(),
          label,
          type,
          // 组件属性
          attrs: {
            ...cloneDeep(attrsDefaultData),
            ...cloneDeep(attrsData)
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
