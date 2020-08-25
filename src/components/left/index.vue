<template>
  <div class="f-render-left">
    <!-- 搜索 -->
    <div class="f-render-comp-searcher">
      <el-input
        clearable
        placeholder="请输入关键字查找组件"
        v-model.trim="keyword"
      ></el-input>
    </div>

    <!-- 组件列表 -->
    <perfect-scrollbar class="scroll-area">
      <draggable
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
          class="f-render-comp"
        >
          <div class="f-render-comp-title">{{ item.type }}</div>
          <div>{{ item.label }}</div>
        </li>
      </draggable>
    </perfect-scrollbar>
  </div>
</template>

<script>
const fuzzy = require("fuzzy");
import draggable from "vuedraggable/src/vuedraggable";
import { PerfectScrollbar } from "vue2-perfect-scrollbar";
import { addFormItem } from "../../utils";

export default {
  inject: ["frender"],
  components: {
    PerfectScrollbar,
    draggable
  },
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
    // 拖拽后新增表单项
    handleAddFormItem(config) {
      return addFormItem({
        config,
        commonData: this.frender.formItemCommon.data
      });
    }
  }
};
</script>

<style lang="scss">
// 搜索框
.f-render-comp-searcher {
  padding: 10px;
  border-bottom: 1px solid #eee;
}

// 组件列表
.f-render-comps {
  padding: 0;
  margin-top: 10px;

  .f-render-comp {
    width: 115px;
    line-height: 1.5em;
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

    &-title {
      font-weight: bold;
      color: #222;
    }
  }
}
</style>
