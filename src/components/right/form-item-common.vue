<template>
  <div>
    <template v-if="frender.formItemList[frender.currentIndex]">
      <attrs-header
        url="https://www.yuque.com/chaojie-vjiel/vbwzgu/iw5dzf"
        title="表单项配置"
        v-model="keyword"
      />
      <ele-form
        v-model="frender.formItemList[frender.currentIndex]"
        :formDesc="filteredFormDesc"
        :formAttrs="{ size: 'small' }"
        :isShowBackBtn="false"
        :isShowSubmitBtn="false"
        :rules="rules"
        :options-fn="
          frender.formBindProps['options-fn'] ||
            frender.formBindProps['optionsFn']
        "
        :span="20"
        labelPosition="top"
      >
        <template v-slot:rules="{ desc, formData, field, type }">
          <div style="margin-bottom: 20px">
            <el-button @click="isShowRuleDialog = true" type="danger"
              >新增校检规则</el-button
            >
          </div>
          <component
            :desc="desc"
            :is="type"
            :field="field"
            v-model="formData[field]"
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
    // 自定义的配置
    customConfig() {
      const currentCompConfig = this.frender.currentCompConfig;
      return currentCompConfig?.config?.common?.config || {};
    },
    // 字段出现的次数
    fieldCountObj() {
      return _.countBy(this.frender.formItemList, o => o.field);
    }
  },
  watch: {
    // 检测当前表单项类型变化
    "frender.currentFormItemType": {
      handler(currentFormItemType) {
        // 如果并没有选择表单项类型，则为空
        if (!currentFormItemType) {
          this.formDesc = {};
          return;
        }

        // 当前组件信息
        this.formDesc = changeFormDescLabel({
          ...this.frender.formItemCommon.config,
          ...this.customConfig
        });
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
  }
};
</script>
