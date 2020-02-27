<template>
  <el-dialog
    :visible="visible"
    append-to-body
    title="预览"
    @update:visible="$emit('update:visible', $event)"
    v-if="visible"
    width="90%"
  >
    <ele-form
      :formDesc="computedFormDesc"
      :formData="{}"
      :request-fn="handleRequest"
      @request-success="handleRequestSuccess"
      v-bind="formAttr"
    ></ele-form>
  </el-dialog>
</template>

<script lang="ts">
import _ from "lodash-es";
import { createComponent, toRefs, computed } from "@vue/composition-api";

export default createComponent({
  name: "previewDialog",
  props: {
    formDesc: {
      type: Object,
      default: () => ({})
    },
    formAttr: {
      type: Object,
      default: () => ({})
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    const { formDesc } = toRefs(props);
    return {
      // 需要加一层 clone, 因为 ele-form会修改内部属性
      computedFormDesc: computed(() => _.cloneDeep(formDesc.value))
    };
  },
  methods: {
    handleRequest(data) {
      // eslint-disable-next-line no-console
      console.log(data);
      return Promise.resolve(data);
    },
    handleRequestSuccess() {
      this.$message.success("发送成功");
    }
  }
});
</script>
