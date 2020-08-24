<template>
  <ele-form-dialog
    v-model="formData"
    :formDesc="batchFormDesc"
    labelPosition="left"
    width="800px"
    :dialogAttrs="{
      'close-on-click-modal': false,
      'append-to-body': true
    }"
    :request-fn="handleAdd"
    :visible="visible"
    @update:visible="$emit('change', $event)"
    title="批量添加表单项"
  ></ele-form-dialog>
</template>

<script>
import _ from "lodash";
import { addFormItem } from "../../../utils";

export default {
  inject: ["frender"],
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    // 字段出现的次数
    fieldCountObj() {
      return _.countBy(this.frender.formItemList, o => o.field);
    },
    batchFormDesc() {
      return {
        type: {
          type: "radio",
          label: "添加方式",
          default: "dynamic",
          options: [
            { text: "逐个新增", value: "dynamic" },
            {
              text: "数据库导入(待开发)",
              value: "mysql",
              attrs: { disabled: true }
            }
          ]
        },
        formItems: {
          type: "dynamic",
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
                  default: h => {
                    return this.frender.sortedComps.map(item =>
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
          rules: {
            type: "array",
            validator: (rule, value, callback) => {
              let errorArr = [];
              if (Array.isArray(value) && value.length) {
                // 字段不可重复
                errorArr = value
                  .map((item, index) =>
                    this.frender.formDesc[item.field] ||
                    this.fieldCountObj[item.field] > 1
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
    }
  },
  data() {
    return {
      formData: {
        type: "dynamic",
        formItems: []
      }
    };
  },
  methods: {
    handleAdd({ formItems }) {
      try {
        const newFormItems = formItems.map(item =>
          addFormItem({
            ...item,
            config: this.frender.compsMap.get(item.type),
            commonData: this.frender.formItemCommon.data
          })
        );

        this.frender.updateFormItemList(
          this.frender.formItemList.concat(newFormItems)
        );

        // 回复数据
        this.$message.success("添加成功");
        this.formData = {
          type: "dynamic",
          data: []
        };

        this.$emit("change", false);
      } catch (err) {
        console.error(err);
      }
    }
  }
};
</script>
