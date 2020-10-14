<template>
  <!-- 新增校检 -->
  <ele-form-dialog
    v-model="formData"
    :formDesc="formDesc"
    @request="handleAddRule"
    :visible="visible"
    :dialogAttrs="{
      'append-to-body': true
    }"
    :formBtns="formBtns"
    @update:visible="toggleDialog"
    title="新增校检规则"
  />
</template>

<script>
const cloneDeep = require("clone");
import { changeFormDescLabel } from "../../../utils";

export default {
  inject: ["frender"],
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    visible(value) {
      if (value) {
        this.formData = {};
      }
    }
  },
  data() {
    const rangeLinkageFn = data =>
      ["any", "string", "number", "array", "float", "integer", "hex"].includes(
        data.type
      );
    return {
      formData: {},
      formDesc: changeFormDescLabel({
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
            default(h, { options }) {
              const res = options.map(option =>
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
            prepend: h => h("span", "/"),
            append: h => h("span", "/")
          },
          valueFormatter(val) {
            return val ? eval("(/" + val + "/)") : val;
          },
          vif: data => ["any", "regexp", "string", "url"].includes(data.type)
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
          vif: data => data.type === "enum"
        },
        message: {
          type: "input",
          label: "提示信息",
          layout: 12,
          attrs: {
            clearable: true
          }
        }
      }),
      formBtns: [
        {
          text: "提交并新增",
          type: "primary",
          click: () => {
            this.handleAddRule(this.formData, false);
          }
        }
      ]
    };
  },
  methods: {
    handleAddRule(data, isClose = true) {
      // 过滤掉空值
      const filteredData = cloneDeep(data);
      for (const key in filteredData) {
        if (!data[key]) {
          delete filteredData[key];
        }
      }
      if (filteredData.enum && filteredData.enum.length == 0) {
        delete filteredData.enum;
      }

      if (Object.keys(filteredData).length === 0) return;

      // 更改 formItemList 中当前正在编辑的表单项的 rules
      const currentItem = this.frender.formItemList[this.frender.currentIndex];
      this.$set(
        this.frender.formItemList[this.frender.currentIndex],
        "rules",
        (currentItem.rules || []).concat(filteredData)
      );

      // 关闭弹窗
      if (isClose) {
        this.toggleDialog();
      } else {
        // 回复默认值
        this.formData = {};
      }

      this.$message.success("创建成功");
    },

    toggleDialog(visible = false) {
      this.$emit("update:visible", visible);
    }
  }
};
</script>
