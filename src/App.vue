<template>
  <div class="app">
    <app-header />
    <app-main />
  </div>
</template>

<script lang="ts">
import store from "@/store";
import AppHeader from "./components/app-header.vue";
import AppMain from "./components/app-main/index.vue";
import { defineComponent, toRefs, watch } from "@vue/composition-api";
import { preventReloadWindow } from "@/helpers/utils";

export default defineComponent({
  name: "App",
  components: {
    AppHeader,
    AppMain
  },
  setup() {
    // 阻止页面刷新
    preventReloadWindow();

    // 设置 title
    const appName = "表单生成器";
    const { currentForm } = toRefs(store.getters);
    watch(currentForm, () => {
      if (currentForm.value) {
        document.title = currentForm.value.name + " | " + appName;
      } else {
        document.title = appName;
      }
    });
  }
});
</script>

<style>
/* vscode 需要重置背景和样式 */
body {
  background: white;
  padding: 0;
}

.app {
  min-width: 1350px;
}
</style>
