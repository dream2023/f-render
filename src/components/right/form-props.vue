<template>
  <div>
    <attrs-header
      url="https://www.yuque.com/chaojie-vjiel/vbwzgu/dyw8a7"
      title="表单配置"
      v-model="keyword"
    />
    <ele-form
      v-model="frender.formPropsData"
      :form-desc="filteredFormDesc"
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
  }
};
</script>
