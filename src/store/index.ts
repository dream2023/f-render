import Vue from "vue";
import Vuex from "vuex";
import _ from "lodash-es";
import { keyBy } from "@/helpers/utils";
import listDefault from "./listDefault";
import persistedstate from "./persistedstate";
import formAttrDefault from "./formAttrDefault";
import { FormDescList, FormDescListItem } from "@/types/formList";

Vue.use(Vuex);

interface StateData {
  [key: string]: any;
  formAttr: AnyObj;
  list: FormDescList;
  selectIndex: number | null;
}

// 状态
const state: StateData = {
  // 表单属性
  formAttr: formAttrDefault,
  // 表单项列表
  list: listDefault,
  // 当前表单项索引
  selectIndex: null
};

export default new Vuex.Store({
  state: state,
  getters: {
    // 当前表单项
    currentFormItem(state: StateData) {
      return state.selectIndex !== null ? state.list[state.selectIndex] : null;
    },
    // 过滤掉空值和默认值
    filterFormAttr(state: StateData) {
      // 判断是否为空或者是否和默认值相同
      const isEmptyOrDefaultValue = (val: any, key: string) =>
        _.isNil(val) || val === formAttrDefault[key];
      return _.omitBy(state.formAttr, isEmptyOrDefaultValue);
    },
    // 将数组转为对象
    formDesc(state: StateData) {
      return keyBy(state.list, "field");
    }
  },
  mutations: {
    // 更新表单项
    updateCurrentItem(state: StateData, item: FormDescListItem) {
      if (state.selectIndex !== null) {
        state.list.splice(state.selectIndex, 1, item);
      }
    },
    // 更新选中的索引
    updateSelectIndex(state: StateData, selectIndex: number) {
      state.selectIndex = selectIndex;
    },
    // 清空列表
    clearForm(state: StateData) {
      state.list = [];
      state.selectIndex = null;
      state.formAttr = formAttrDefault;
    },
    // 更新表单属性
    updateFormAttr(state: StateData, formAttr: AnyObj) {
      state.formAttr = formAttr;
    },
    // 删除列表项
    deleteItemByIndex(state: StateData, index: number) {
      state.list.splice(index, 1);
    },
    // 修改列表
    updateList(state: StateData, newList: FormDescList) {
      state.list = newList;
    }
  },
  plugins: [].concat(persistedstate())
});
