<template>
  <multipane @paneResizeStop="handlePaneresize" class="app-main">
    <app-main-left :style="{ width: leftWidth }" />
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
import AppMainHeader from "./components/main-header.vue";
import AppMainLeft from "./components/main-left.vue";
import AppMainCenter from "./components/main-center.vue";
import AppMainRight from "./components/main-right/index.vue";
import { Multipane, MultipaneResizer } from "vue-multipane";
import { createComponent } from "@vue/composition-api";
import { isVscode } from "@/helpers/tool";

export default createComponent({
  name: "AppMain",
  components: {
    AppMainLeft,
    AppMainCenter,
    AppMainHeader,
    AppMainRight,
    Multipane,
    MultipaneResizer
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
    return {
      leftWidth,
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

  .app-main-content {
    height: calc(100% - 60px);
    overflow: scroll;
    padding-bottom: 20px;
    box-sizing: border-box;
  }

  .app-main-container {
    flex-grow: 1;
    flex: 1;
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
