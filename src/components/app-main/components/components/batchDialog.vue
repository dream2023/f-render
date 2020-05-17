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
    @update:visible="$emit('update:visible', $event)"
    title="批量添加表单信息"
  ></ele-form-dialog>
</template>

<script>
import _ from "lodash";
import { addFormItem } from "@/helpers/tool";
import { mapGetters } from "vuex";

export default {
  name: "batchDialog",
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(["currentFormDesc", "currentFormItemList", "sortedComps"]),
    countObj() {
      return _.countBy(this.formData.data, o => o.field);
    },
    batchFormDesc() {
      return {
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
                  default: h => {
                    return this.sortedComps.map(item =>
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
            arr.map(item => _.pick(item, ["field", "label", "type"])),
          rules: {
            type: "array",
            validator: (rule, value, callback) => {
              let errorArr = [];
              if (Array.isArray(value) && value.length) {
                // 字段不可重复
                errorArr = value
                  .map((item, index) =>
                    this.currentFormDesc[item.field] ||
                    this.countObj[item.field] > 1
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
        data: []
      }
    };
  },
  methods: {
    updateList(data) {
      this.$store.commit("updateCurrentFormItemList", data);
    },

    handleAdd({ data }) {
      if (Array.isArray(data) && data.length) {
        const newFormItems = data.map(item =>
          addFormItem(item.type, { field: item.field, label: item.label })
        );
        this.updateList(this.currentFormItemList.concat(newFormItems));
        this.$message.success("添加成功");
        this.formData = {
          type: "dynamic",
          data: []
        };

        // 更新type使用次数
        newFormItems.forEach(item =>
          this.$store.commit("updateCompCount", item.type)
        );

        this.$emit("update:visible", false);
      }
    }
  }
};
</script>
