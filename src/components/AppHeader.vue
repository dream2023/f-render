<template>
  <div class="app-header-box">
    <h1 class="app-header-title">VUE-ELE-FORM 表单生成器</h1>
    <el-link
      href="https://github.com/dream2023/vue-ele-form"
      target="_blank"
      type="primary"
    >GitHub</el-link>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
  data () {
    return {}
  },
  methods: {},
  mounted () {}
}
</script>

<style>
.app-header-box {
  display: flex;
  justify-content: space-between;
  box-sizing: border-box;
}

.app-header-title {
  font-size: 24px;
  color: #409eff;
}
</style>
