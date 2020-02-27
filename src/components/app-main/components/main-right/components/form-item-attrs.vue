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

<script lang="ts">
import store from "@/store";
import configList from "@/config";
import { changeFormLabel } from "@/helpers/tool";
import searchMixin from "./components/searchMixin";
import AttrsHeader from "./components/attrs-header.vue";
import { createComponent, computed, toRefs } from "@vue/composition-api";

export default createComponent({
  name: "AppFormItemAttrs",
  components: { AttrsHeader },
  setup() {
    const { currentFormItem } = toRefs(store.getters);
    const isShow = computed(
      () => currentFormItem.value && currentFormItem.value.attrs
    );
    const config = computed(() => configList[currentFormItem.value.type]);
    const formDesc = computed(() => {
      const formDesc = config.value.attrs || {};
      return changeFormLabel(formDesc, config.value.assistProperty);
    });

    return {
      currentFormItem,
      ...searchMixin(formDesc),
      isShow,
      attrLink: computed(() => config.value.url)
    };
  }
});
</script>
