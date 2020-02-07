<template>
  <div>
    <el-card
      id="comps-search-card"
      :body-style="{ padding: '10px' }"
    >
      <el-input placeholder="请输入关键字查找组件" v-model.trim="searchValue"></el-input>
    </el-card>
    <div v-if="comps.length === 0">
      <p class="no-comps-text">未找到相关组件~</p>
    </div>
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
      searchValue: '',
      tempVal: ''
    }
  },
  watch: {
    searchValue(val) {
      if (this.debouncedSearch) {
        this.debouncedSearch(val)
      } else {
        this.debouncedSearch = _.debounce(val => {
          this.tempVal = val
        }, 200)
      }
    }
  },
  computed: {
    comps() {
      return this.tempVal === '' ? comps : this.filteredComps
    },
    filteredComps () {
      const value = _.toLower(this.tempVal)
      let newComps = comps.map(x => {
        // 匹配 type 或者 label，匹配上就返回该项
        let newInnerComps = _.filter(x.comps, x => (x.type.indexOf(value) !== -1 || x.label.indexOf(value) !== -1))
        return { ...x, comps: newInnerComps }
      })
      return newComps.filter(x => x.comps.length > 0)
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
          field: 'key_' + Date.now(),
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
.no-comps-text {
  text-align: center;
  color: #409eff;
  padding-top: 50px;
  font-size: 14px;
}
#comps-search-card {
  border-top: none;
  border-left: none;
  border-right: none;
  border-radius: 0;
}
</style>
