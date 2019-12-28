import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 表单属性
    formAttr: {},
    // 表单项列表
    list: [],
    // 当前表单项索引
    selectIndex: null
  },
  getters: {
    // 当前表单项
    currentFormItem (state) {
      return state.selectIndex !== null ? state.list[state.selectIndex] : {}
    }
  },
  mutations: {
    // 更新选中的索引
    updateSelectIndex (state, selectIndex) {
      state.selectIndex = selectIndex
    },
    // 更新表单属性
    updateFormAttr (state, formAttr) {
      state.formAttr = formAttr
    },
    // 删除列表项
    deleteItemByIndex (state, index) {
      state.list.splice(index, 1)
    }
  }
})
