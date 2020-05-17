<template>
  <div>
    <template v-if="currentFormItem">
      <attrs-header
        url="https://www.yuque.com/chaojie-vjiel/vbwzgu/iw5dzf"
        title="通用配置"
        v-model="keyword"
      />
      <ele-form
        :formData="currentFormItem"
        @input="updateCurrentItem"
        :formDesc="filterFormDesc"
        :formAttrs="{ size: 'small' }"
        :isShowBackBtn="false"
        :isShowSubmitBtn="false"
        :rules="rules"
        :span="20"
        labelPosition="top"
      >
        <template v-slot:rules="{ data, desc, field, type }">
          <div style="margin-bottom: 20px">
            <el-button @click="isShowRuleDialog = true" type="danger"
              >新增校检规则</el-button
            >
          </div>
          <component
            :desc="desc"
            :is="type"
            :field="field"
            :value="currentFormItem[field]"
            @input="handleChangeRules"
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
import configList from "@/config";
import { changeFormLabel } from "@/helpers/tool";
import serialize from "serialize-javascript";
import searchMixin from "./components/searchMixin";
import AttrsHeader from "./components/attrs-header.vue";
import FormItemRules from "./components/form-item-rules.vue";
import { mapGetters } from "vuex";

export default {
  name: "AppFormItemConfig",
  mixins: [searchMixin],
  components: {
    AttrsHeader,
    FormItemRules
  },
  computed: {
    ...mapGetters(["currentFormItemList", "currentFormItem"]),
    countObj() {
      return _.countBy(this.currentFormItemList, o => o.field);
    },
    config() {
      return {
        field: {
          type: "input",
          label: "字段名",
          tip: "字段名不可重复",
          rules: {
            type: "string",
            validator: (rule, value, callback) => {
              if (this.countObj[value] > 1) {
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
            "format-tooltip"(val) {
              return `${val} / 24`;
            }
          },
          on: {
            input: val => {
              // slider组件, 如果传递的value为null或者undefined, 会赋值为 1, 无法利用到默认值, 所以去掉
              if (val !== 1) {
                this.updateCurrentItem({
                  ...this.currentFormItem,
                  layout: val
                });
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
          type: "textarea",
          label: "校检规则",
          title: "新增校检规则",
          displayFormatter: val => (val ? serialize(val, { space: 2 }) : ""),
          tip:
            '校检规则文档, 请<a target="_blank" href="https://www.yuque.com/chaojie-vjiel/vbwzgu/qzzkpd" class="el-link el-link--primary">点击查看</a>'
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
      };
    },
    formDesc() {
      const customConfig = configList[this.currentFormItem.type].common || {};
      const formDesc = Object.assign({}, this.config, customConfig);
      return changeFormLabel(formDesc);
    }
  },
  data() {
    return {
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
    updateCurrentItem(data) {
      this.$store.commit("updateCurrentItem", data);
    },
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
