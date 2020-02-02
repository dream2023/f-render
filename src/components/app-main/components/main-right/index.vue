<template>
  <el-tabs class="app-main-right-container" :stretch="true" v-model="activeTab">
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
  name: 'AppMainRight',
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
.form-item-placeholder {
  height: 300px;
  line-height: 300px;
  color: #909399;
  text-align: center;
}

.app-main-right-container .el-tabs__nav-wrap {
  padding: 0 15px;
}
.app-main-right-container .el-tabs__item {
  padding: 0 10px;
}
.app-main-right-container .el-tabs__nav-wrap::after {
  height: 1px !important;
}

.app-main-right-container .el-tabs__active-bar {
  height: 1px !important;
}
.app-main-right-container .jsoneditor-container.min-box {
  height: 200px !important;
}
.app-main-right-container div.jsoneditor-menu {
  display: none;
}
.app-main-right-container div.jsoneditor-outer.has-main-menu-bar {
  margin-top: 0 !important;
  padding-top: 0 !important;
}

.app-main-right-link {
  color: #666;
  font-size: 14px;
  margin-left: 24px;
  padding-left: 10px;
  margin-bottom: 10px;
  border-left: 3px solid #eee;
}
</style>
