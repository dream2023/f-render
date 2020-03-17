<template>
  <!-- 新增校检 -->
  <ele-form-dialog
    v-model="formData"
    :formDesc="computedFormDesc"
    :request-fn="handleAddRule"
    @request-success="handleSuccess"
    :visible="visible"
    :dialogAttrs="{
      'append-to-body': true
    }"
    :formBtns="formBtns"
    @update:visible="toggleDialog"
    title="新增校检规则"
  />
</template>

<script lang="ts">
import _ from "lodash-es";
import store from "@/store";
import { changeFormLabel } from "@/helpers/tool";
import { Message } from "element-ui";
import {
  createComponent,
  computed,
  toRefs,
  ref,
  watch
} from "@vue/composition-api";
import { FormItemList, FormDesc } from "@/types/project";
import { CreateElement } from "vue";

export default createComponent({
  name: "FormItemRules",
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const rangeLinkageFn = (data: AnyObj) =>
      ["any", "string", "number", "array", "float", "integer", "hex"].includes(
        data.type
      );
    const formDesc: FormDesc = {
      type: {
        type: "select",
        label: "类型",
        default: null,
        layout: 12,
        attrs: {
          clearable: true
        },
        options: [
          { value: "string", desc: "必须是 string" },
          { value: "number", desc: "必须是 number" },
          { value: "boolean", desc: "必须是 boolean" },
          {
            value: "regexp",
            desc: "必须是正则或者是在调用 new RegExp 时不报错的字符串"
          },
          { value: "integer", desc: "整数" },
          { value: "float", desc: "浮点数" },
          { value: "enum", desc: "值必须出现在 enmu 枚举值中" },
          { value: "date", desc: "合法的日期，使用 Date 判断" },
          { value: "url", desc: "URL" },
          { value: "email", desc: "邮箱地址" },
          { value: "array", desc: "必须是数组，通过 Array.isArray 判断" },
          { value: "object", desc: "是对象且不为数组" },
          { value: "method", desc: "必须是 function" },
          { value: "hex", desc: "16进制" }
        ],
        slots: {
          default(h: CreateElement, { options }: AnyObj) {
            const res = options.map((option: AnyObj) =>
              h("el-option", { attrs: { value: option.value } }, [
                h("span", { style: { float: "left" } }, option.value),
                h(
                  "span",
                  {
                    style: {
                      float: "right",
                      color: "#8492a6",
                      fontSize: "13px"
                    }
                  },
                  option.desc
                )
              ])
            );
            return res;
          }
        }
      },
      trigger: {
        type: "select",
        label: "触发方式",
        layout: 12,
        attrs: {
          clearable: true
        },
        options: ["change", "blur"]
      },
      pattern: {
        type: "input",
        layout: 12,
        label: "正则表达式文本",
        slots: {
          prepend: (h: CreateElement) => h("span", "/"),
          append: (h: CreateElement) => h("span", "/")
        },
        valueFormatter(val: any) {
          return val ? new RegExp(val) : val;
        },
        vif: (data: AnyObj) =>
          ["any", "regexp", "string", "url"].includes(data.type)
      },
      min: {
        type: "number",
        label: "范围最小值",
        vif: rangeLinkageFn,
        layout: 12
      },
      max: {
        type: "number",
        label: "范围最大值",
        layout: 12,
        vif: rangeLinkageFn
      },
      len: {
        type: "number",
        label: "val.length(字符串 OR 数组) / 数值)",
        layout: 12,
        vif: rangeLinkageFn
      },
      enum: {
        type: "dynamic",
        label: "枚举值",
        default: [],
        layout: 12,
        vif: (data: AnyObj) => data.type === "enum"
      },
      message: {
        type: "input",
        label: "提示信息",
        layout: 12,
        attrs: {
          clearable: true
        }
      }
    };
    const { currentFormItem } = toRefs(store.getters);
    const updateCurrentItem = (data: FormItemList) =>
      store.commit("updateCurrentItem", data);
    const formData = ref({});
    const computedFormDesc = computed(() => changeFormLabel(formDesc));

    function handleAddRule(data: AnyObj) {
      // 过滤掉空值
      const filteredData = _.cloneDeep(data);
      for (const key in filteredData) {
        if (!data[key]) {
          delete filteredData[key];
        }
      }
      return filteredData;
    }

    function toggleDialog(visible = false) {
      context.emit("update:visible", visible);
    }
    function handleSuccess(data: AnyObj, isClose = true) {
      if (Object.keys(data).length === 0) return;

      const formItem = currentFormItem.value;
      if (!formItem.rules) formItem.rules = [];
      formItem.rules.push(data);
      updateCurrentItem(formItem);
      formData.value = {};
      Message.success("创建成功");

      if (isClose) {
        toggleDialog();
      }
    }
    const formBtns = [
      {
        text: "提交并新增",
        type: "primary",
        click: () => {
          const data = handleAddRule(formData.value);
          handleSuccess(data, false);
        }
      }
    ];
    const { visible } = toRefs(props);
    watch(visible, value => {
      if (!value) {
        formData.value = {};
      }
    });
    return {
      handleAddRule,
      formBtns,
      handleSuccess,
      toggleDialog,
      computedFormDesc,
      formData
    };
  }
});
</script>
