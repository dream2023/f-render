<template>
  <div class="app-main-right">
    <el-tabs :stretch="true" v-model="activeTab">
      <el-tab-pane label="组件通用配置" name="item-config"></el-tab-pane>
      <el-tab-pane label="组件属性配置" name="item-attrs"></el-tab-pane>
      <el-tab-pane label="表单配置" name="form-config"> </el-tab-pane>
    </el-tabs>
    <div class="app-main-content">
      <app-form-item-config v-show="activeTab === 'item-config'" />
      <app-form-item-attrs v-show="activeTab === 'item-attrs'" />
      <app-form-config v-show="activeTab === 'form-config'" />
    </div>
  </div>
</template>

<script lang="ts">
import AppFormConfig from "./components/form-config.vue";
import AppFormItemAttrs from "./components/form-item-attrs.vue";
import AppFormItemConfig from "./components/form-item-config.vue";
import { createComponent } from "@vue/composition-api";
export default createComponent({
  name: "AppMainRight",
  components: {
    AppFormConfig,
    AppFormItemAttrs,
    AppFormItemConfig
  },
  setup() {
    return {
      activeTab: "item-config"
    };
  }
});
</script>

<style lang="scss">
.app-main-right {
  width: 315px;
  margin-top: 21px;
  height: 100%;

  .form-item-placeholder {
    height: 300px;
    line-height: 300px;
    color: #909399;
    text-align: center;
  }

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
  .jsoneditor-container.min-box {
    height: 200px !important;
  }
  div.jsoneditor-menu {
    display: none;
  }
  div.jsoneditor-outer.has-main-menu-bar {
    margin-top: 0 !important;
    padding-top: 0 !important;
  }
}
</style>
