<template>
  <div>
    <template v-if="frender.formItemList[frender.currentIndex]">
      <attrs-header
        :url="attrLink"
        :title="frender.currentFormItemType + ' 组件'"
        v-model="keyword"
      />
      <ele-form
        v-model="frender.formItemList[frender.currentIndex].attrs"
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
    formDesc() {
      return changeFormDescLabel(
        this.frender.currentCompConfig?.config?.attrs?.config || {}
      );
    },
    // 文档链接
    attrLink() {
      return this.frender.currentCompConfig?.url;
    }
  }
};
</script>
