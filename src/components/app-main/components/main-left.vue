<template>
  <div>
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
import comps from '@/comps'
import { addFormItem } from '@/tool.js'
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
      return addFormItem({ label, type, field: 'key_' + Date.now() })
    }
  }
}
</script>

<style>
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
