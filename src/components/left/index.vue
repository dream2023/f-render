<template>
  <div class="f-render-left">
    <!-- 搜索 -->
    <div class="f-render-header f-render-comp-searcher">
      <el-input
        clearable
        placeholder="请输入关键字查找组件"
        v-model.trim="keyword"
      ></el-input>
    </div>

    <!-- 组件列表 -->
    <perfect-scrollbar class="f-render-scrollarea">
      <vue-draggable
        :clone="handleAddFormItem"
        :group="{ name: 'form', pull: 'clone', put: false }"
        :list="filteredComps"
        class="f-render-comps"
        :sort="false"
        tag="ul"
      >
        <li
          v-for="item of filteredComps"
          :key="item.type"
          @click="handleDoubleClick(item)"
          class="f-render-comp"
        >
          <div class="f-render-comp-title">{{ item.type }}</div>
          <div>{{ item.label }}</div>
        </li>
      </vue-draggable>
    </perfect-scrollbar>
  </div>
</template>

<script>
const fuzzy = require("fuzzy");

export default {
  inject: ["frender"],
  computed: {
    // 支持模糊搜索
    filteredComps() {
      const results = fuzzy.filter(this.keyword, this.frender.sortedComps, {
        extract: comp => comp.label + comp.type
      });
      return results.map(el => el.original);
    }
  },
  data() {
    return {
      keyword: ""
    };
  },
  methods: {
    getFormItemByConfig({ type, label }) {
      const formItemData = this.frender.getFormItemByType(type);
      return {
        label,
        field: "key_" + Date.now(),
        ...formItemData
      };
    },
    // 双击添加表单
    handleDoubleClick(config) {
      const formItemData = this.getFormItemByConfig(config);
      this.frender.formItemList = [...this.frender.formItemList, formItemData];
    },
    // 拖拽后新增表单项
    handleAddFormItem(config) {
      return this.getFormItemByConfig(config);
    }
  }
};
</script>

<style lang="css">
/* 搜索框 */
.f-render-comp-searcher {
  padding: 0 10px;
}

/* 组件列表 */
.f-render-comps {
  padding: 0;
  margin-top: 10px;
}

/* 单个组件 */
.f-render-comps .f-render-comp {
  width: 115px;
  line-height: 1.5em;
  color: #606266;
  border: 1px solid #ebeef5;
  overflow: hidden;
  cursor: move;
  white-space: nowrap;
  display: inline-block;
  text-overflow: ellipsis;
  border-radius: 3px;
  padding: 6px 8px;
  box-sizing: border-box;
  margin: 5px;
  font-size: 12px;
}

/* 组件标题 */
.f-render-comps .f-render-comp-title {
  font-weight: bold;
  color: #222;
}
</style>
