<template>
  <div class="f-render-right">
    <el-tabs :stretch="true" v-model="activeTab">
      <el-tab-pane
        v-for="tab of tabs"
        :key="tab.name"
        :label="tab.label"
        :name="tab.name"
      ></el-tab-pane>
    </el-tabs>
    <perfect-scrollbar ref="scroll" class="scroll-area">
      <component
        v-show="activeTab === tab.name"
        :is="tab.name"
        v-for="tab of tabs"
        :key="tab.name"
      />
    </perfect-scrollbar>
  </div>
</template>

<script>
import FormProps from "./form-props.vue";
import FormItemAttrs from "./form-item-attrs.vue";
import FormItemCommon from "./form-item-common.vue";
import { PerfectScrollbar } from "vue2-perfect-scrollbar";

export default {
  components: {
    FormProps,
    FormItemAttrs,
    FormItemCommon,
    PerfectScrollbar
  },
  data() {
    return {
      activeTab: "form-item-common",
      tabs: [
        {
          label: "组件通用配置",
          name: "form-item-common"
        },
        {
          label: "组件属性配置",
          name: "form-item-attrs"
        },
        {
          label: "表单配置",
          name: "form-props"
        }
      ]
    };
  },
  watch: {
    // 切换Tab滚动到顶部
    activeTab() {
      this.$refs.scroll.$el.scrollTop = 0;
    }
  }
};
</script>

<style lang="scss">
.f-render-right {
  width: 310px;
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
}
</style>
