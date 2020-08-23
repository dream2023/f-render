<template>
  <div>
    <attrs-header
      url="https://www.yuque.com/chaojie-vjiel/vbwzgu/dyw8a7"
      title="表单配置"
      v-model="keyword"
    />
    <ele-form
      v-model="frender.formConfig"
      :form-desc="filteredFormDesc"
      @input="handleChange"
      :formAttrs="{ size: 'small' }"
      :isShowBackBtn="false"
      :isShowSubmitBtn="false"
      :span="20"
      labelPosition="top"
    ></ele-form>
  </div>
</template>

<script>
import searchMixin from "./components/search-mixin";
import AttrsHeader from "./components/attrs-header.vue";
import { changeFormDescLabel } from "../../utils";
export default {
  inject: ["frender"],
  components: { AttrsHeader },
  mixins: [searchMixin],
  computed: {
    formDesc() {
      return changeFormDescLabel(this.frender.formProps.config);
    }
  },
  methods: {
    handleChange(data) {
      // 对 isReponise 的特殊处理
      // 当从 inline 模式切换到 layout 默认时，修改 isReponise 为 true
      // 但为了避免循环判断，使用了一个 this.inline 变量
      if (this.inline !== data.inline) {
        this.inline = data.inline;
        if (!data.inline) {
          this.$set(this.frender.formConfig, "isResponsive", true);
        }
      }
    }
  }
};
</script>
