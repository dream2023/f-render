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
      // 增加 key
      const field = 'key_' + Date.now()

      // 获取配置
      try {
        const config = configList[type].common || {}
        const configData = Object.keys(config).reduce((acc, key) => {
          acc[key] = config[key]['default'] || null
          return acc
        }, {})
        return Object.assign(
          {},
          this.commonData,
          { label, type, field },
          configData
        )
      } catch {
        this.$message.error('请到config目录下添加相关配置')
      }
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
