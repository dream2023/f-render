<template>
  <div class="app">
    <app-header />
    <app-main />
  </div>
</template>

<script>
import AppHeader from "./components/app-header.vue";
import AppMain from "./components/app-main/index.vue";
import { mapGetters } from "vuex";
import BlockRefresh from "@/mixins/block-refresh";

export default {
  name: "App",
  mixins: [BlockRefresh],
  components: {
    AppHeader,
    AppMain
  },
  data() {
    return {
      appName: "表单生成器"
    };
  },
  computed: {
    ...mapGetters(["currentForm"])
  },
  watch: {
    currentForm(currentForm) {
      const appName = "表单生成器";
      if (currentForm && currentForm.name) {
        document.title = currentForm.name + " | " + appName;
      } else {
        document.title = appName;
      }
    }
  }
};
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
