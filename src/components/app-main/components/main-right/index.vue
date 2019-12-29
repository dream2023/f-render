<template>
  <el-tabs :stretch="true" v-model="activeTab">
    <el-tab-pane label="表单项属性" name="0">
      <app-form-item-config />
    </el-tab-pane>
    <el-tab-pane label="表单属性" name="1">
      <app-form-config />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import AppFormConfig from './components/form-config'
import AppFormItemConfig from './components/form-item-config'
export default {
  name: 'app-main-right',
  components: {
    AppFormConfig,
    AppFormItemConfig
  },
  data() {
    return {
      activeTab: '0'
    }
  }
}
</script>

<style>
.el-tabs__nav-wrap::after {
  height: 1px !important;
}

.el-tabs__active-bar {
  height: 1px !important;
}
</style>
