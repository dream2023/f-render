<template>
  <div>
    <div class="app-main-right-link">
      <el-link type="primary" target="_blank" :href="url"
        >点击查看{{ title }}</el-link
      >&nbsp;
      <span style="vertical-align: middle;">属性详细解释</span>
    </div>
    <div class="app-main-right-search">
      <el-input
        v-model.trim="keyword"
        clearable
        @input="$emit('input', $event)"
        placeholder="输入关键字搜索属性"
      ></el-input>
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent } from "@vue/composition-api";

export default createComponent({
  name: "attrs-header",
  props: {
    url: String,
    title: String
  },
  setup() {
    return {
      keyword: ""
    };
  }
});
</script>

<style scoped>
.app-main-right-link {
  color: #666;
  font-size: 14px;
  margin-left: 24px;
  padding-left: 10px;
  margin-bottom: 10px;
  border-left: 3px solid #eee;
}
.app-main-right-search {
  padding: 20px;
  box-sizing: border-box;
}
</style>
