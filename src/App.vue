<template>
  <div class="app">
    <app-header />
    <app-main />
  </div>
</template>

<script lang="ts">
import AppHeader from "./components/app-header.vue";
import AppMain from "./components/app-main/index.vue";
import { createComponent } from "@vue/composition-api";

export default createComponent({
  name: "App",
  components: {
    AppHeader,
    AppMain
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
