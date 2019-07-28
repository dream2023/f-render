<template>
  <div class="app-main-header">
    <el-button
      icon="el-icon-upload2"
      type="text"
    >导出数据</el-button>
    <el-button
      icon="el-icon-tickets"
      type="text"
    >生成代码</el-button>
  </div>
</template>

<script>
export default {
  name: 'AppMainHeader',
  data () {
    return {}
  },
  methods: {},
  mounted () {}
}
</script>

<style>
.app-main-header {
  height: 60px;
  line-height: 60px;
  padding-right: 20px;
  border-bottom: 1px solid #ebeef5;
}
</style>
