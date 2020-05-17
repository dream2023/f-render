<template>
  <div>
    <template v-if="isShow">
      <attrs-header
        :url="attrLink"
        :title="currentFormItem.type + '组件'"
        v-model="keyword"
      />
      <ele-form
        :formData="currentFormItem.attrs"
        :formDesc="filterFormDesc"
        @input="updateFormAttrs"
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
import configList from "@/config";
import { changeFormLabel } from "@/helpers/tool";
import searchMixin from "./components/searchMixin";
import AttrsHeader from "./components/attrs-header.vue";
import { mapGetters } from "vuex";

export default {
  name: "AppFormItemAttrs",
  mixins: [searchMixin],
  components: { AttrsHeader },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["currentFormItem"]),
    formDesc() {
      const formDesc = this.config.attrs || {};
      return changeFormLabel(formDesc, this.config.assistProperty);
    },
    isShow() {
      return this.currentFormItem && this.currentFormItem.attrs;
    },
    config() {
      return configList[this.currentFormItem.type];
    },
    attrLink() {
      return this.config.url;
    }
  },
  methods: {
    updateFormAttrs(data) {
      this.$store.commit("updateCurrentItemAttrs", data);
    }
  }
};
</script>
