import Vue from "vue";
import Vuex from "vuex";
import _ from "lodash-es";
import { Message } from "element-ui";
import { keyBy } from "@/helpers/utils";
import listDefault from "./listDefault";
import { Project } from "@/types/project";
import persistedstate from "./persistedstate";
import formAttrDefault from "./formAttrDefault";
import { getRemoteConfig } from "@/helpers/remoteConfig";

Vue.use(Vuex);

const remoteConfig = getRemoteConfig();

interface StateData {
  [key: string]: any;
  projectList: Project[];
  saveType: "local" | "remote";
  currentProjectIndex: number;
  currentFormIndex: number;
  currentFormItemIndex: number | null; // 因为有可能当前未选中任何表单, 所以有可能为 null
}

const store = new Vuex.Store<StateData>({
  state: {
    // 工程列表
    projectList: [
      {
        // 工程名称
        name: "默认工程",
        // 表单列表
        formList: [
          {
            // 表单名称
            name: "示例表单",
            // 表单属性
            formAttr: formAttrDefault,
            // 表单项列表
            formItemList: listDefault
          }
        ]
      }
    ],
    // 当前工程索引
    currentProjectIndex: 0,
    // 当前表单索引
    currentFormIndex: 0,
    // 当前表单项索引
    currentFormItemIndex: null,
    // 保存数据方式
    saveType: "local"
  },
  getters: {
    // 当前 project
    currentProject(state) {
      return state.projectList[state.currentProjectIndex];
    },
    // 当前表单
    currentForm(state, getters) {
      return getters.currentProject.formList[state.currentFormIndex];
    },
    // 当前表单项
    currentFormItem(state, getters) {
      return state.currentFormItemIndex !== null
        ? getters.currentForm.formItemList[state.currentFormItemIndex]
        : null;
    },
    // 过滤掉空值和默认值后的 formAttr
    currentFormAttr(state, getters) {
      // 判断是否为空或者是否和默认值相同
      const isEmptyOrDefaultValue = (val: any, key: string) =>
        _.isNil(val) || val === formAttrDefault[key];
      return _.omitBy(getters.currentForm.formAttr, isEmptyOrDefaultValue);
    },
    // 当前 formItemList
    currentFormItemList(state, getters) {
      return getters.currentForm.formItemList;
    },
    // 将数组转为对象
    currentFormDesc(state, getters) {
      return keyBy(getters.currentFormItemList, "field");
    }
  },
  mutations: {
    // 更新所有
    updateAll(state, data) {
      Object.assign(state, data);
    },
    // 更新 project 索引
    updateProjectIndex(state, index) {
      state.currentProjectIndex = index;
    },
    // 更新 form 索引
    updateFormIndex(state, index) {
      state.currentFormItemIndex = index;
    },
    // 更新 formItem 索引
    updateFormItemIndex(state, index) {
      state.currentFormItemIndex = index;
    },
    // 新增 project
    createProject(state, project) {
      state.projectList.push(project);
    },
    // 新增 form
    createForm(state, { projectIndex, form }) {
      projectIndex = projectIndex || state.currentProjectIndex;
      state.projectList[projectIndex].formList.push(form);
    },
    // 新增 formItem
    createFormItem(state, formItem) {
      const formItemList = _.cloneDeep(store.getters.formItemList);
      formItemList.push(formItem);
      store.commit("updateCurrentForm", { formItemList });
    },
    // 通过索引删除 project
    deleteProjectByIndex(state, index) {
      state.projectList.splice(index, 1);
    },
    // 通过索引删除 form
    deleteFormByIndex(state, { projectIndex, formIndex }) {
      state.projectList[projectIndex].formList.splice(formIndex, 1);
    },
    // 通过索引删除 formItem
    deleteFormItemByIndex(state, index) {
      const formItemList = _.cloneDeep(store.getters.currentFormItemList);
      formItemList.splice(index, 1);
      store.commit("updateCurrentForm", { formItemList });
    },
    // 更新 project
    updateProject(state, { projectIndex, project }) {
      Object.assign(state.projectList[projectIndex], project);
    },
    // 更新 form
    updateForm(state, { projectIndex, formIndex, form }) {
      Object.assign(state.projectList[projectIndex].formList[formIndex], form);
    },
    // 更新表单项
    updateCurrentItem(state, item) {
      const { currentFormItemIndex } = state;
      if (currentFormItemIndex !== null) {
        const formItemList = _.cloneDeep(store.getters.currentFormItemList);
        formItemList.splice(currentFormItemIndex, 1, item);
        store.commit("updateCurrentForm", { formItemList });
      }
    },
    // 更新当前表单
    updateCurrentForm(state, form) {
      Object.assign(
        state.projectList[state.currentProjectIndex].formList[
          state.currentFormIndex
        ],
        form
      );
    },
    // 清空列表
    clearCurrentForm(state) {
      store.commit("updateCurrentForm", {
        formItemList: [],
        formAttr: formAttrDefault
      });
      state.currentFormItemIndex = null;
    },
    // 更新表单属性
    updateCurrentFormAttr(state, formAttr) {
      store.commit("updateCurrentForm", { formAttr });
    },
    // 修改列表
    updateCurrentFormItemList(state, formItemList) {
      store.commit("updateCurrentForm", { formItemList });
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
