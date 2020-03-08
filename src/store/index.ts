import Vue from "vue";
import Vuex from "vuex";
import _ from "lodash-es";
import { keyBy } from "@/helpers/utils";
import listDefault from "./listDefault";
import persistedstate from "./persistedstate";
import formAttrsDefault from "./formAttrsDefault";
import { FormDescList, FormDescListItem } from "@/types/formList";
import { getRemoteConfig } from "@/helpers/remoteConfig";
import { Message } from "element-ui";

Vue.use(Vuex);

const remoteConfig = getRemoteConfig();

interface Form {
  id?: string | number;
  name: string;
  formAttrs: AnyObj;
  formDescArr: FormDescList;
  currentFormItemIndex: number | null;
}

interface Project {
  id?: string | number;
  name: string;
  formList: Form[];
}

interface StateData {
  [key: string]: any;
  ProjectList: Project[];
  currentProjectIndex: number;
  saveType: "local" | "remote";
}

// 状态
const state: StateData = {
  // 工程列表
  ProjectList: [
    {
      name: "默认工程",
      formList: [
        {
          name: "示例表单",
          formAttrs: formAttrsDefault,
          formDescArr: listDefault,
          currentFormItemIndex: null
        }
      ]
    }
  ],
  // 当前工程 index
  currentProjectIndex: 0,
  // 保存数据方式
  saveType: "local"
};
const store = new Vuex.Store({
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
    // 更新所有
    updateAll(state, data: StateData) {
      state = data;
    },
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
    },
    // 更新 saveType
    updateSaveType(state, type) {
      state.saveType = type;
    }
  },
  actions: {
    updateStateFromRemote({ commit }) {
      if (remoteConfig) {
        commit("updateSaveType", "remote");

        fetch(
          new Request(remoteConfig.getUrl, {
            method: remoteConfig.getMethod
          })
        )
          .then(res => res.text())
          .then(res => {
            try {
              return eval("(" + res + ")");
            } catch {
              throw new TypeError("返回数据格式不正确: " + res);
            }
          })
          .then((res: StateData) => {
            commit("updateAll", res);
            commit("updateSaveType", "remote");
          })
          .catch(error => {
            Message.error("从服务器获取数据失败: " + error.message);
          });
      }
    }
  },
  plugins: persistedstate()
});

if (remoteConfig) {
  store.dispatch("updateStateFromRemote");
}

export default store;
