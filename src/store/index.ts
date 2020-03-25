import Vue from "vue";
import Vuex from "vuex";
import _ from "lodash-es";
import comps from "@/helpers/comps";
import { Message } from "element-ui";
import { keyBy } from "@/helpers/utils";
import listDefault from "./listDefault";
import { Project } from "@/types/project";
import persistedstate from "./persistedstate";
import formAttrDefault from "./formAttrDefault";
import { getFormFromServer } from "@/helpers/api";
import { getRemoteConfig } from "@/helpers/remoteConfig";
import { Comp } from "@/types/comp";

Vue.use(Vuex);

const remoteConfig = getRemoteConfig();

interface StateData {
  [key: string]: any;
  projectList: Project[];
  saveType: "local" | "remote";
  currentProjectIndex: number | null;
  currentFormIndex: number | null;
  currentFormItemIndex: number | null;
  comps: Comp[];
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
    saveType: "local",
    // 右侧组件列表
    comps: comps
  },
  getters: {
    // 根据使用的次数排序
    sortedComps(state) {
      return _.cloneDeep(_.sortBy(state.comps, "count")).reverse();
    },
    // 当前 project
    currentProject(state) {
      return state.currentProjectIndex !== null
        ? state.projectList[state.currentProjectIndex]
        : null;
    },
    // 当前表单
    currentForm(state, getters) {
      return getters.currentProject && state.currentFormIndex !== null
        ? getters.currentProject.formList[state.currentFormIndex]
        : null;
    },
    // 当前表单项
    currentFormItem(state, getters) {
      return getters.currentForm && state.currentFormItemIndex !== null
        ? getters.currentForm.formItemList[state.currentFormItemIndex]
        : null;
    },
    // 过滤掉空值和默认值后的 formAttr
    currentFormAttr(state, getters) {
      if (getters.currentForm) {
        // 判断是否为空或者是否和默认值相同
        const isEmptyOrDefaultValue = (val: any, key: string) =>
          _.isNil(val) || val === formAttrDefault[key];
        return _.omitBy(getters.currentForm.formAttr, isEmptyOrDefaultValue);
      } else {
        return null;
      }
    },
    // 当前 formItemList
    currentFormItemList(state, getters) {
      return getters.currentForm ? getters.currentForm.formItemList : null;
    },
    // 将数组转为对象
    currentFormDesc(state, getters) {
      return getters.currentFormItemList
        ? keyBy(getters.currentFormItemList, "field")
        : null;
    }
  },
  mutations: {
    // 更新组件使用次数
    updateCompCount(state, compType) {
      const compIndex = state.comps.findIndex(item => item.type === compType);
      if (compIndex > -1) {
        Vue.set(
          state.comps[compIndex],
          "count",
          state.comps[compIndex].count + 1
        );
      }
    },
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
      state.currentFormIndex = index;
    },
    // 更新 formItem 索引
    updateFormItemIndex(state, index) {
      state.currentFormItemIndex = index;
    },
    // 新增 project
    createProject(state, project) {
      project.formList = [];
      state.projectList.push(project);
    },
    // 新增 form
    createForm(state, { projectIndex, form }) {
      form.formItemList = [];
      form.formAttr = formAttrDefault;
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
      // 置空索引
      if (state.currentProjectIndex === index) {
        state.currentProjectIndex = null;
        state.currentFormIndex = null;
        state.currentFormItemIndex = null;
      }

      // 删除
      state.projectList.splice(index, 1);
    },
    // 通过索引删除 form
    deleteFormByIndex(state, { projectIndex, formIndex }) {
      // 置空索引
      if (state.currentFormIndex == formIndex) {
        state.currentFormIndex = null;
        state.currentFormItemIndex = null;
      }

      // 删除
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
    // 更新表单项数据
    updateCurrentItemAttrs(state, attrs) {
      const {
        currentFormIndex,
        currentFormItemIndex,
        currentProjectIndex
      } = state;
      if (
        currentFormIndex !== null &&
        currentFormItemIndex !== null &&
        currentProjectIndex !== null
      ) {
        state.projectList[currentProjectIndex].formList[
          currentFormIndex
        ].formItemList[currentFormItemIndex].attrs = attrs;
      }
    },
    // 更新当前表单
    updateCurrentForm(state, form) {
      if (
        state.currentProjectIndex !== null &&
        state.currentFormIndex !== null
      ) {
        Object.assign(
          state.projectList[state.currentProjectIndex].formList[
            state.currentFormIndex
          ],
          form
        );
      }
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
    async updateStateFromRemote({ commit }) {
      const res = await getFormFromServer();
      if (res) {
        if (res.code === 0) {
          commit("updateAll", res.data);
        } else {
          Message.error("获取数据失败, 失败原因: " + res.msg);
        }
      }
    }
  },
  plugins: persistedstate()
});

if (remoteConfig) {
  store.dispatch("updateStateFromRemote");
}

export default store;
