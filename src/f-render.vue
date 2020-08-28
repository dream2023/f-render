<template>
  <!-- 1.设计阶段 -->
  <multipane v-if="!pure" :style="{ height }" class="f-render">
    <!-- 左侧 -->
    <f-render-left class="f-render-left" />
    <multipane-resizer></multipane-resizer>
    <!-- 中间 -->
    <f-render-main
      :loading="loading"
      @save="handleSave"
      class="f-render-main"
    />
    <multipane-resizer></multipane-resizer>
    <!-- 右侧 -->
    <f-render-right class="f-render-right" />
  </multipane>

  <!-- 2.使用 -->
  <ele-form
    v-bind="formBindConfig"
    :formData="value"
    v-on="$listeners"
    @input="$emit('input', value)"
    v-else-if="isShowPure"
  ></ele-form>
</template>

<script>
// 全局组件
import "./global-components";

import FRenderLeft from "./components/left/index";
import FRenderMain from "./components/main/index";
import FRenderRight from "./components/right/index";
import { Multipane, MultipaneResizer } from "vue-multipane";

import _ from "lodash";
const cloneDeep = require("clone");
import serialize from "serialize-javascript";
import { objectToArr, arrToObject, removeUselessAttrs } from "./utils";

import compsDefault from "./fixtures/comps";
import formPropsDefault from "./fixtures/form-props";
import formItemCommonDefault from "./fixtures/form-item-common";

// 组件的数据，通过 provide / inject 的形式传递给子组件
// 主要原因是因为组件嵌套过深，相当于一个状态管理
// 在业务代码中不推荐使用，provide / inject，会使数据流混乱
export default {
  name: "f-render",
  inheritAttrs: false,
  components: {
    Multipane,
    MultipaneResizer,
    FRenderLeft,
    FRenderRight,
    FRenderMain
  },
  provide() {
    return {
      frender: this
    };
  },
  props: {
    // 表单内容
    config: {
      type: [Object, String],
      required: true
    },
    // 设计器整体高度
    height: {
      type: [String, Number],
      default: "400px"
    },
    // 保存格式
    saveFormat: {
      type: String,
      default: "string",
      validator(val) {
        return ["object", "string"].includes(val);
      }
    },
    // 是否纯净
    pure: Boolean,
    // 表单配置
    formProps: {
      type: Object,
      default: () => formPropsDefault
    },
    // 表单项通用配置
    formItemCommon: {
      type: Object,
      default: () => formItemCommonDefault
    },
    // 组件列表
    comps: {
      type: Array,
      default: () => compsDefault
    },
    // 操作配置
    operations: {
      type: Array,
      default: () => ["preview", "data", "code", "batch", "clear"]
    },
    // 是否在加载
    loading: Boolean,

    // 表单相关（pure 为 true 时）, 同 vue-ele-form
    // https://www.yuque.com/chaojie-vjiel/vbwzgu/zbu9mn
    value: Object
  },
  watch: {
    config: {
      handler(config) {
        if (_.isNil(config)) {
          config = {};
        }
        try {
          if (typeof config === "string") {
            config = config ? eval(`(${config})`) : {};
          }
        } catch (err) {
          this.$message.error("数据解释失败");
          console.error(err);
        }
        const formConfig = cloneDeep({
          ...this.formProps.data,
          ...config
        });
        // 判断外部传入的是否有 formDesc 字段，如果没有则赋值为空对象
        if (!formConfig.formDesc) {
          formConfig.formDesc = {};
        }
        this.formConfig = formConfig;
        this.formItemList = objectToArr(formConfig.formDesc, "field");

        // 当有数据时，选中第一个
        if (this.formItemList.length) {
          this.currentIndex = 0;
        }
      },
      immediate: true
    }
  },
  computed: {
    // 表单绑定的配置
    // 融合了 $attrs
    formBindConfig() {
      return { ...this.changedFormConfig, ...this.$attrs };
    },
    // 最终的返回结果
    changedFormConfig() {
      return {
        ...removeUselessAttrs(this.formConfig, this.formProps.data),
        formDesc: _.mapValues(this.formDesc, formItem => {
          return {
            ...removeUselessAttrs(
              cloneDeep(formItem),
              this.getCommonDefaultData(formItem.type)
            ),
            attrs: removeUselessAttrs(
              formItem.attrs,
              this.getAttrsDefaultData(formItem.type)
            )
          };
        })
      };
    },
    // 当前的表单项（provide）
    formDesc() {
      return arrToObject(this.formItemList, "field");
    },
    // 当前的表单项（provide）
    currentFormItem() {
      return this.formItemList[this.currentIndex];
    },
    // 排序后的组件
    sortedComps() {
      return cloneDeep(this.comps)
        .map(item => {
          item.sort = item.sort || 6;
          return item;
        })
        .sort((a, b) => a.sort - b.sort);
    },
    // comps map，方便查找和获取（provide）
    compsMap() {
      return new Map(this.comps.map(item => [item.type, item]));
    },
    // 是否显示 pure
    isShowPure() {
      return this.pure && Object.keys(this.formConfig.formDesc).length;
    }
  },
  data() {
    return {
      formConfig: {},
      // 保存
      formData: {},
      // formDesc 的数组形态（provide）
      formItemList: [],
      // 当前 formItem的 index 值（provide）
      currentIndex: null
    };
  },
  methods: {
    // 更新当前 formItem 的属性（provide）
    updateCurrentFormItem(obj) {
      this.$set(
        this.formItemList,
        this.currentIndex,
        Object.assign({}, this.currentFormItem, obj)
      );
    },
    // 更新 formConfig（provide）
    updateFormConfig(formConfig) {
      const { formDesc = {} } = formConfig;
      Object.assign(this.formConfig, formConfig);
      this.formItemList = objectToArr(formDesc, "field");
    },
    // 更新 formItemList（provide）
    updateFormItemList(formItemList) {
      this.formItemList = formItemList;
    },
    // 保存数据
    handleSave() {
      const res =
        this.saveFormat === "string"
          ? serialize(this.changedFormConfig)
          : this.changedFormConfig;

      this.$emit("save", res);
    },
    getCommonDefaultData(type) {
      const data = this.compsMap.get(type)?.config?.common?.defaultData || {};
      return {
        ...data,
        // 通用默认值
        ...this.formItemCommon.data
      };
    },
    getAttrsDefaultData(type) {
      return this.compsMap.get(type)?.config?.attrs?.defaultData || {};
    }
  }
};
</script>

<style lang="scss">
.f-render {
  border: 1px solid #ebeef5;
  overflow: hidden;
  &-left {
    width: 260px;
    min-width: 130px;
  }
  &-main {
    flex-grow: 1;
    width: 750px;
  }
  &-right {
    width: 315px;
  }

  & > .multipane-resizer {
    margin: 0;
    left: 0;
    position: relative;
    border-left: 1px solid #ebeef5;
    border-right: 1px solid #ebeef5;
    width: 7px;
    &::before {
      display: block;
      content: "";
      width: 1px;
      height: 40px;
      position: absolute;
      top: 50%;
      left: 50%;
      margin-top: -20px;
      margin-left: -1.5px;
      border-left: 1px solid #dcdfe6;
      border-right: 1px solid #dcdfe6;
      &::before {
        border-color: #999;
      }
    }
  }

  .scroll-area {
    /* 减去头部的高度 */
    height: calc(100% - 60px);
  }
}
</style>
