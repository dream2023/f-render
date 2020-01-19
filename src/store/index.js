import Vue from 'vue'
import Vuex from 'vuex'
import persistedstate from './persistedstate'
import { isWeb } from '../tool'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 表单属性
    formAttr: {},
    // 表单项列表
    list: [
      {
        field: 'name',
        type: 'input',
        label: '姓名(示例)',
        layout: 12,
        required: true,
        attrs: {}
      },
      {
        field: 'age',
        type: 'input',
        label: '年龄(示例)',
        layout: 12,
        required: true,
        attrs: {
          type: 'number',
          min: 10
        }
      },
      {
        field: 'description',
        type: 'quill-editor',
        label: '介绍',
        layout: 24,
        attrs: {}
      }
    ],
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
    // 更新选中的索引
    updateSelectIndex (state, selectIndex) {
      state.selectIndex = selectIndex
    },
    // 清空列表
    clearList (state) {
      state.list = []
      state.selectIndex = null
    },
    // 更新表单属性
    updateFormAttr (state, formAttr) {
      state.formAttr = formAttr
    },
    // 删除列表项
    deleteItemByIndex (state, index) {
      state.list.splice(index, 1)
    }
  },
  plugins: isWeb ? [persistedstate()] : []
})
