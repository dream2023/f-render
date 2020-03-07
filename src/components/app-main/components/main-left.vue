<template>
  <div class="app-main-left">
    <div class="search-comps">
      <el-input
        clearable
        placeholder="请输入关键字查找组件"
        v-model.trim="searchValue"
      ></el-input>
    </div>
    <div class="app-main-content" style="padding-top: 10px;">
      <draggable
        :clone="handleAddFormItem"
        :group="{ name: 'form', pull: 'clone', put: false }"
        :list="filteredComps"
        :sort="false"
      >
        <template v-for="item of filteredComps">
          <div :key="item.type" class="comp-item">
            <div class="comp-item-title">{{ item.type }}</div>
            <div>{{ item.label }}</div>
          </div>
        </template>
      </draggable>
    </div>
  </div>
</template>

<script lang="ts">
import comps from "@/helpers/comps";
import draggable from "vuedraggable";
import { addFormItem } from "@/helpers/tool";
import { createComponent, ref, computed } from "@vue/composition-api";
import { Comp } from "@/types/comp";
import { fuzzySearch } from "../../../helpers/utils";

export default createComponent({
  name: "AppMainLeft",
  components: {
    draggable
  },
  setup() {
    // 搜索
    const search = () => {
      const searchValue = ref("");
      const filteredComps = computed(() => {
        const keyword = searchValue.value.toLowerCase();
        if (!keyword) {
          return comps;
        } else {
          return comps.filter(
            item =>
              fuzzySearch(item.type, keyword) ||
              fuzzySearch(item.label, keyword)
          );
        }
      });
      return {
        searchValue,
        filteredComps
      };
    };

    const { searchValue, filteredComps } = search();
    return {
      searchValue,
      filteredComps
    };
  },
  methods: {
    handleAddFormItem({ label, type }: Comp) {
      return addFormItem(type, { label });
    }
  }
});
</script>

<style lang="scss">
.app-main-left {
  line-height: 1.5em;
  height: 100%;

  .search-comps {
    padding: 10px;
    border-bottom: 1px solid #eee;
  }

  .comp-item {
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

    .comp-item-title {
      font-weight: bold;
      color: #222;
    }
  }
}
</style>
