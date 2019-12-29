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
    <el-link
      href="https://github.com/dream2023/vue-ele-form-generator"
      target="_blank"
      type="primary"
      >GitHub</el-link
    >
  </div>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style>
.app-header {
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);
  z-index: 1;
  width: 100%;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
}

.app-header-title {
  font-size: 24px;
  color: #409eff;
}
</style>
