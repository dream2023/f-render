<template>
  <div class="app-header">
    <el-link
      :underline="false"
      href="https://github.com/dream2023/vue-ele-form-generator"
      target="_blank"
      type="primary"
    >
      <h1 class="app-header-title">VUE-ELE-FORM 表单生成器</h1>
    </el-link>
    <div class="app-header-right">
      <el-link
        :href="item.url"
        target="_blank"
        type="primary"
        v-for="item of links"
        :key="item.title"
        >{{ item.title }}</el-link
      >
    </div>
  </div>
</template>

<script lang="ts">
import { createComponent } from "@vue/composition-api";

export default createComponent({
  name: "AppHeader",
  setup() {
    return {
      links: [
        {
          url: "https://github.com/dream2023/vue-ele-form",
          title: "vue-ele-form"
        },
        {
          url: "https://www.yuque.com/chaojie-vjiel/vbwzgu",
          title: "Docs"
        },
        {
          url: "https://github.com/dream2023/vue-ele-form-generator",
          title: "GitHub"
        }
      ]
    };
  }
});
</script>

<style lang="scss">
.app-header {
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  z-index: 1;
  width: 100%;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;

  .app-header-title {
    font-size: 24px;
    color: #409eff;
  }

  .app-header-right {
    display: flex;
    align-items: center;

    .el-link {
      margin-right: 20px;
    }
  }
}
</style>
