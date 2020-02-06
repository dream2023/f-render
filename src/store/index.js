import Vue from 'vue'
import Vuex from 'vuex'
import persistedstate from './persistedstate'
import formAttrDefault from './formAttrDefault'
import listDefault from './listDefault'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 表单属性
    formAttr: formAttrDefault,
    // 表单项列表
    list: listDefault,
    // 当前表单项索引
    selectIndex: null
  },
  getters: {
    // 当前表单项
    currentFormItem (state) {
      return state.selectIndex !== null ? state.list[state.selectIndex] : null
    }
  },
  mutations: {
    // 更新表单项
    updateCurrentItem (state, item) {
      state.list.splice(state.selectIndex, 1, item)
    },
    // 更新选中的索引
    updateSelectIndex (state, selectIndex) {
      state.selectIndex = selectIndex
    },
    // 清空列表
    clearForm (state) {
      state.list = []
      state.selectIndex = null
      state.formAttr = formAttrDefault
    },
    // 更新表单属性
    updateFormAttr (state, formAttr) {
      state.formAttr = formAttr
    },
    // 删除列表项
    deleteItemByIndex (state, index) {
      state.list.splice(index, 1)
    },
    // 修改列表
    updateList (state, newList) {
      state.list = newList
    }
  },
  plugins: persistedstate()
})
