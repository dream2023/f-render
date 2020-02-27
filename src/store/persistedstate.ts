import SecureLS from "secure-ls";
import { isVscode } from "@/helpers/tool";
import createPersistedState from "vuex-persistedstate";

export default () => {
  if (isVscode) {
    // 在vscode插件下, 不支持localStorage
    return [];
  } else {
    const ls = new SecureLS({ isCompression: false });

    return createPersistedState({
      storage: {
        getItem: key => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: key => ls.remove(key)
      }
    });
  }
};
