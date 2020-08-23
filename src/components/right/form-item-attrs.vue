<template>
  <div>
    <template v-if="isShow">
      <attrs-header
        :url="attrLink"
        :title="currentFormItem.type + '组件'"
        v-model="keyword"
      />
      <ele-form
        v-model="currentFormItem.attrs"
        :formDesc="filteredFormDesc"
        :formAttrs="{ size: 'small' }"
        :isShowBackBtn="false"
        :isShowSubmitBtn="false"
        :span="20"
        labelPosition="top"
      />
    </template>
    <div class="form-item-placeholder" v-else>
      从左侧拖拽添加表单项并点选
    </div>
  </div>
</template>

<script>
import { changeFormDescLabel } from "../../utils";
import searchMixin from "./components/search-mixin";
import AttrsHeader from "./components/attrs-header.vue";

export default {
  inject: ["frender"],
  mixins: [searchMixin],
  components: { AttrsHeader },
  computed: {
    currentFormItem() {
      return this.frender.currentFormItem;
    },
    config() {
      return this.frender.compsMap.get(this.currentFormItem.type)?.config || {};
    },
    formDesc() {
      const formDesc = this.config?.attrs?.config;
      return changeFormDescLabel(formDesc);
    },
    isShow() {
      return this.currentFormItem && this.currentFormItem.attrs;
    },
    attrLink() {
      return this.config.url;
    }
  }
};
</script>
