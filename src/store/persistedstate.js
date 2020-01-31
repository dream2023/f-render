import createPersistedState from 'vuex-persistedstate'
import { isVscode } from '@/tool'

export default function () {
  if (isVscode()) {
    // 在vscode插件下, 不支持localStorage
    return []
  } else {
    const SecureLS = require('secure-ls')
    const ls = new SecureLS({ isCompression: false })

    return [createPersistedState({
      storage: {
        getItem: key => ls.get(key),
        setItem: (key, value) => ls.set(key, value),
        removeItem: key => ls.remove(key)
      }
    })]
  }
}
