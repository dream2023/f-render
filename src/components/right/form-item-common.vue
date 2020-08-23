<template>
  <div>
    <template v-if="currentFormItem">
      <attrs-header
        url="https://www.yuque.com/chaojie-vjiel/vbwzgu/iw5dzf"
        title="通用配置"
        v-model="keyword"
      />
      <ele-form
        v-model="formItemList[currentIndex]"
        :formDesc="filteredFormDesc"
        :formAttrs="{ size: 'small' }"
        :isShowBackBtn="false"
        :isShowSubmitBtn="false"
        :rules="rules"
        :span="20"
        labelPosition="top"
      >
        <template v-slot:rules="{ desc, field, type }">
          <div style="margin-bottom: 20px">
            <el-button @click="isShowRuleDialog = true" type="danger"
              >新增校检规则</el-button
            >
          </div>
          <component
            :desc="desc"
            :is="type"
            :field="field"
            :value="currentFormItem[field] || []"
          />
          <form-item-rules :visible.sync="isShowRuleDialog" />
        </template>
      </ele-form>
    </template>
    <div class="form-item-placeholder" v-else>
      从左侧拖拽添加表单项并点选
    </div>
  </div>
</template>

<script>
import _ from "lodash";
import { changeFormDescLabel } from "../../utils";
import searchMixin from "./components/search-mixin";
import AttrsHeader from "./components/attrs-header.vue";
import FormItemRules from "./components/form-item-rules.vue";

export default {
  inject: ["frender"],
  mixins: [searchMixin],
  components: {
    AttrsHeader,
    FormItemRules
  },
  computed: {
    formItemList() {
      return this.frender.formItemList;
    },
    currentIndex() {
      return this.frender.currentIndex;
    },
    currentFormItem() {
      return this.frender.currentFormItem;
    },
    compsMap() {
      return this.frender.compsMap;
    },
    // 自定义的配置
    customConfig() {
      return this.currentFormItem
        ? this.compsMap.get(this.currentFormItem.type).config?.common?.config
        : {};
    },
    // 字段出现的次数
    fieldCountObj() {
      return _.countBy(this.formItemList, o => o.field);
    },
    formDesc() {
      // 合并固定配置和自定义配置
      const formDesc = Object.assign({}, this.config, this.customConfig);
      return changeFormDescLabel(formDesc);
    }
  },
  data() {
    return {
      config: {
        field: {
          type: "input",
          label: "字段名",
          tip: "字段名不可重复",
          rules: {
            type: "string",
            validator: (rule, value, callback) => {
              // 如果字段出现次数超过 1 次，则表示字段重复
              if (this.fieldCountObj[value] > 1) {
                callback("字段名重复");
              } else {
                callback();
              }
            }
          }
        },
        label: {
          type: "input",
          label: "标签"
        },
        layout: {
          type: "slider",
          label: "宽度",
          attrs: {
            min: 1,
            max: 24,
            formatTooltip(val) {
              return `${val} / 24`;
            }
          },
          on: {
            input: val => {
              // slider组件, 如果传递的value为null或者undefined, 会赋值为 1, 无法利用到默认值, 所以去掉
              if (val !== 1) {
                this.frender.updateCurrentFormItem({ layout: val });
              }
            }
          }
        },
        default: {
          type: "input",
          label: "默认值"
        },
        required: {
          type: "yesno",
          label: "校检",
          title: "是否必填"
        },
        rules: {
          type: "data-editor",
          label: "校检规则",
          title: "新增校检规则",
          default: [],
          attrs: {
            type: ["array", "object"]
          },
          tip:
            '校检规则文档, 请<a target="_blank" href="https://www.yuque.com/chaojie-vjiel/vbwzgu/qzzkpd" class="el-link el-link--primary">点击查看</a>'
        },
        vif: {
          type: "data-editor",
          label: "联动显示/隐藏",
          attrs: {
            types: ["function", "boolean"]
          },
          default: true,
          tip:
            '支持`布尔值`和`函数`，具体请查看：<a target="_blank" href="https://www.yuque.com/chaojie-vjiel/vbwzgu/loffm6#wOVyc" class="el-link el-link--primary">文档</a>'
        },
        disabled: {
          type: "data-editor",
          label: "联动启用/禁用",
          attrs: {
            types: ["function", "boolean", "string"]
          },
          default: false,
          tip:
            '支持`布尔值`和`函数`，具体请查看：<a target="_blank" href="https://www.yuque.com/chaojie-vjiel/vbwzgu/loffm6#zaIsz" class="el-link el-link--primary">文档</a>'
        },
        tip: {
          type: "input",
          label: "表单项提示"
        },
        isShowLabel: {
          label: "否显示标签",
          type: "switch",
          tip: "与全局isShowLabel作用相同"
        },
        labelWidth: {
          label: "标签宽度",
          type: "input",
          tip: "需要以`px`作为单位, 例如`100px`, 默认为全局设置的labelWidth值"
        }
      },
      rules: {
        field: {
          required: true,
          message: "字段必填"
        },
        label: {
          required: true,
          message: "标签不能为空"
        }
      },
      isShowRuleDialog: false
    };
  },
  methods: {
    handleChangeRules(rules) {
      try {
        if (rules) {
          rules = eval("(" + rules + ")");
          if (typeof rules !== "object") return;
        } else {
          rules = [];
        }
        const data = Object.assign({}, this.currentFormItem, { rules: rules });
        this.updateCurrentItem(data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }
  }
};
</script>
