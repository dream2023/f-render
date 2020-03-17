<template>
  <ele-form-dialog
    v-model="formData"
    :formDesc="batchFormDesc"
    labelPosition="left"
    width="800px"
    :dialogAttrs="{
      'append-to-body': true
    }"
    :request-fn="handleAdd"
    :visible="visible"
    @update:visible="$emit('update:visible', $event)"
    title="批量添加表单信息"
  ></ele-form-dialog>
</template>

<script lang="ts">
import _ from "lodash-es";
import store from "@/store";
import comps from "@/helpers/comps";
import { Message } from "element-ui";
import { addFormItem } from "@/helpers/tool";
import {
  toRefs,
  ref,
  createElement,
  createComponent,
  computed
} from "@vue/composition-api";
import { FormItemList, FormDesc } from "@/types/project";

export default createComponent({
  name: "batchDialog",
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  setup(props, context) {
    const { currentFormDesc: allFormDesc, currentFormItemList: list } = toRefs(
      store.getters
    );
    const formData = ref({
      type: "dynamic",
      data: []
    });
    // 数量统计, 用于判断是否重复
    const countObj = computed(() =>
      _.countBy(formData.value.data, (o: any) => o.field)
    );
    const batchFormDesc: FormDesc = {
      type: {
        type: "radio",
        label: "添加方式",
        default: "dynamic",
        options: [
          { text: "逐个新增", value: "dynamic" },
          { text: "编辑对象", value: "json-editor" },
          {
            text: "数据库导入(待开发)",
            value: "mysql",
            attrs: { disabled: true }
          }
        ]
      },
      data: {
        type: data => data.type,
        label: "表单项",
        isTypeChangeReloadValue: false,
        attrs: {
          columns: [
            {
              type: "el-input",
              valueKey: "field",
              attrs: {
                placeholder: "请输入 field"
              }
            },
            {
              type: "el-input",
              valueKey: "label",
              attrs: {
                placeholder: "请输入 label"
              }
            },
            {
              type: "el-select",
              valueKey: "type",
              slots: {
                default(h: typeof createElement) {
                  return comps.map(item =>
                    h("el-option", {
                      attrs: {
                        label: `${item.type} - ${item.label}`,
                        value: item.type
                      }
                    })
                  );
                }
              },
              attrs: {
                filterable: true,
                placeholder: "请输入选择 type"
              }
            }
          ]
        },
        valueFormatter: arr =>
          arr.map((item: AnyObj) => _.pick(item, ["field", "label", "type"])),
        rules: {
          type: "array",
          validator: (rule: any, value: any, callback: AnyFunction) => {
            let errorArr: any[] = [];
            if (Array.isArray(value) && value.length) {
              // 字段不可重复
              errorArr = value
                .map((item, index) =>
                  allFormDesc.value[item.field] ||
                  countObj.value[item.field] > 1
                    ? `第${index + 1}行的 field 重复`
                    : null
                )
                .filter(Boolean);

              // 字段不可为空
              errorArr = errorArr.concat(
                value
                  .map((item, index) => {
                    const errMsg = [];
                    if (!item.field) errMsg.push("field");
                    if (!item.label) errMsg.push("label");
                    if (!item.type) errMsg.push("type");

                    return errMsg.length
                      ? `第${index + 1}行的 ${errMsg.join("、")} 未填写`
                      : null;
                  })
                  .filter(Boolean)
              );
            }
            errorArr.length
              ? callback(new Error(errorArr.join(" & ")))
              : callback();
          }
        }
      }
    };
    const updateList = (data: FormItemList) =>
      store.commit("updateCurrentFormItemList", data);

    function handleAdd({ data }: { data: AnyObj }) {
      if (Array.isArray(data) && data.length) {
        const newFormItems = data.map(item =>
          addFormItem(item.type, { field: item.field, label: item.label })
        );
        updateList(list.value.concat(newFormItems));
        Message.success("添加成功");
        formData.value = {
          type: "dynamic",
          data: []
        };

        context.emit("update:visible", false);
      }
    }
    return {
      handleAdd,
      batchFormDesc,
      formData
    };
  }
});
</script>
