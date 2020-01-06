<template>
  <el-tabs :stretch="true" v-model="activeTab">
    <el-tab-pane label="组件通用配置" name="0">
      <app-form-item-config />
    </el-tab-pane>
    <el-tab-pane label="组件属性配置" name="1">
      <app-form-item-attrs />
    </el-tab-pane>
    <el-tab-pane label="表单配置" name="2">
      <app-form-config />
    </el-tab-pane>
  </el-tabs>
</template>

<script>
import AppFormConfig from './components/form-config'
import AppFormItemAttrs from './components/form-item-attrs'
import AppFormItemConfig from './components/form-item-config'
export default {
  name: 'app-main-right',
  components: {
    AppFormConfig,
    AppFormItemAttrs,
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
.el-tabs__nav-wrap {
  padding: 0 15px;
}
.el-tabs__item {
  padding: 0 10px;
}
.el-tabs__nav-wrap::after {
  height: 1px !important;
}

.el-tabs__active-bar {
  height: 1px !important;
}
</style>
