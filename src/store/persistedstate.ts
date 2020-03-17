import { isVscode } from "@/helpers/tool";
import createPersistedState from "vuex-persistedstate";

export default () => {
  if (isVscode) {
    // 在vscode插件下, 不支持localStorage
    return [];
  } else {
    return [createPersistedState({ key: "vue-ele-form-generator" })];
  }
};
