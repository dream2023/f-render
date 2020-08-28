<template>
  <div>
    <template v-if="currentFormItem && currentIndex !== null">
      <attrs-header
        url="https://www.yuque.com/chaojie-vjiel/vbwzgu/iw5dzf"
        title="通用配置"
        v-model="keyword"
      />
      <!-- 这里不能用 v-model 会产生循环引用 -->
      <ele-form
        :formData="formItemList[currentIndex]"
        :formDesc="filteredFormDesc"
        :formAttrs="{ size: 'small' }"
        :isShowBackBtn="false"
        :isShowSubmitBtn="false"
        :rules="rules"
        :options-fn="
          frender.formBindConfig['options-fn'] ||
            frender.formBindConfig['optionsFn']
        "
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
        ? this.compsMap.get(this.currentFormItem.type)?.config?.common?.config
        : {};
    },
    // 字段出现的次数
    fieldCountObj() {
      return _.countBy(this.formItemList, o => o.field);
    }
  },
  watch: {
    customConfig() {
      const formDesc = Object.assign(
        {},
        this.frender.formItemCommon.config,
        this.customConfig
      );
      this.formDesc = changeFormDescLabel(formDesc);
    },
    currentIndex: {
      // 默认值在保存后会被删除
      // 所以在回显的时候就会有问题，这里需要重新赋值
      handler(currentIndex) {
        if (currentIndex === null) return;
        const currentFormItem = Object.assign(
          {},
          this.frender.formItemCommon.data,
          this.currentFormItem
        );

        this.frender.updateCurrentFormItem(currentFormItem);
      },
      immediate: true
    }
  },
  data() {
    return {
      formDesc: {},
      rules: {
        field: [
          {
            required: true,
            message: "字段必填"
          },
          {
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
        ]
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
        this.frender.updateCurrentFormItem(data);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }
  }
};
</script>
