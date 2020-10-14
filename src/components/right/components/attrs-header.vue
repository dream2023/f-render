<template>
  <div>
    <div class="f-render-right-link">
      <el-link type="primary" target="_blank" :href="url"
        >点击查看 {{ title }}</el-link
      >&nbsp;
      <span style="vertical-align: middle;">属性详细解释</span>
    </div>
    <div class="f-render-right-search">
      <el-input
        v-model.trim="keyword"
        clearable
        @input="$emit('input', $event)"
        placeholder="输入关键字搜索属性"
      ></el-input>
    </div>
  </div>
</template>

<script>
export default {
  name: "attrs-header",
  props: {
    url: String,
    title: String
  },
  data() {
    return {
      keyword: ""
    };
  }
};
</script>

<style>
.f-render-right-link {
  color: #666;
  font-size: 14px;
  margin-left: 24px;
  padding-left: 10px;
  margin-bottom: 10px;
  border-left: 3px solid #eee;
}
.f-render-right-search {
  padding: 20px;
  box-sizing: border-box;
}
</style>
