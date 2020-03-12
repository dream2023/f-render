<template>
  <multipane @paneResizeStop="handlePaneresize" class="app-main">
    <el-menu @select="handleChangeMenu" default-active="components">
      <el-menu-item
        v-for="item of menus"
        :index="item.componentName"
        :key="item.componentName"
      >
        <i :class="item.icon"></i>
      </el-menu-item>
    </el-menu>
    <component
      :is="'app-main-left-' + activeComponent"
      :style="{ width: leftWidth }"
    />
    <multipane-resizer></multipane-resizer>
    <div class="app-main-container">
      <app-main-header />
      <app-main-center class="app-main-content" />
    </div>
    <multipane-resizer></multipane-resizer>
    <app-main-right />
  </multipane>
</template>

<script lang="ts">
import { isVscode } from "@/helpers/tool";
import AppMainHeader from "./components/main-header.vue";
import AppMainCenter from "./components/main-center.vue";
import { Multipane, MultipaneResizer } from "vue-multipane";
import { createComponent, ref } from "@vue/composition-api";
import AppMainRight from "./components/main-right/index.vue";
import AppMainLeftProjects from "./components/main-left-projects.vue";
import AppMainLeftComponents from "./components/main-left-components.vue";

export default createComponent({
  name: "AppMain",
  components: {
    AppMainCenter,
    AppMainHeader,
    AppMainRight,
    Multipane,
    MultipaneResizer,
    AppMainLeftComponents,
    AppMainLeftProjects
  },
  setup() {
    const defaultWidth = "260px";
    let leftWidth = defaultWidth;
    if (!isVscode) {
      leftWidth = localStorage.getItem("app-main-left") || defaultWidth;
    }

    // panel 拖拉变化
    function handlePaneresize(el: HTMLElement) {
      if (!isVscode && el.className === "app-main-left") {
        localStorage.setItem("app-main-left", el.style.width);
      }
    }

    // 改变菜单
    const activeComponent = ref("components");
    function handleChangeMenu(componentName: string) {
      activeComponent.value = componentName;
    }

    const menus = [
      {
        icon: "el-icon-document",
        componentName: "components"
      },
      {
        icon: "el-icon-menu",
        componentName: "projects"
      }
    ];
    return {
      leftWidth,
      menus,
      activeComponent,
      handleChangeMenu,
      handlePaneresize
    };
  }
});
</script>

<style lang="scss">
.app-main {
  height: calc(100vh - 60px);
  overflow: hidden;
  margin-top: 2px;
  .el-menu-item {
    padding: 0 15px;
  }
  .app-main-content {
    height: calc(100% - 60px);
    overflow: scroll;
    padding-bottom: 20px;
    box-sizing: border-box;
  }

  .app-main-container {
    flex-grow: 1;
    flex: 1;
    min-width: 730px;
  }

  & > .multipane-resizer {
    margin: 0;
    left: 0;
    position: relative;
    border-left: 1px solid #ebeef5;
    border-right: 1px solid #ebeef5;
    width: 7px;
    &::before {
      display: block;
      content: "";
      width: 1px;
      height: 40px;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -20px;
      margin-left: -1.5px;
      border-left: 1px solid #dcdfe6;
      border-right: 1px solid #dcdfe6;
      &::before {
        border-color: #999;
      }
    }
  }
}
</style>
