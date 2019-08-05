<template>
  <div class="app-header-container">
    <el-link
      :underline="false"
      href="https://github.com/dream2023/vue-ele-form"
      target="_blank"
      type="primary"
    >
      <h1 class="app-header-title">VUE-ELE-FORM 表单生成器</h1>
    </el-link>
    <el-link
      href="https://github.com/dream2023/vue-ele-form"
      target="_blank"
      type="primary"
    >GitHub</el-link>
  </div>
</template>

<script>
export default {
  name: 'AppHeader'
}
</script>

<style>
.app-header-container {
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
}

.app-header-title {
  font-size: 24px;
  color: #409eff;
}
</style>
