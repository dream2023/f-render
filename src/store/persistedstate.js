import createPersistedState from 'vuex-persistedstate'

export default function () {
  const SecureLS = require('secure-ls')
  const ls = new SecureLS({ isCompression: false })

  return createPersistedState({
    storage: {
      getItem: key => ls.get(key),
      setItem: (key, value) => ls.set(key, value),
      removeItem: key => ls.remove(key)
    }
  })
}
