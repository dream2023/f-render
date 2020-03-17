<template>
  <el-dialog
    append-to-body
    :visible="visible"
    @update:visible="$emit('update:visible', $event)"
    title="预览"
    width="90%"
  >
    <ele-form
      :formDesc="computedFormDesc"
      :formData="formData"
      :visible="visible"
      @update:visible="$emit('update:visible', $event)"
      :request-fn="handleRequest"
      @request-success="handleRequestSuccess"
      v-bind="formAttr"
    ></ele-form>
  </el-dialog>
</template>

<script lang="ts">
import _ from "lodash-es";
import { defineComponent, toRefs, computed, ref } from "@vue/composition-api";

export default defineComponent({
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
    const formData = ref({});
    const { formDesc } = toRefs(props);
    return {
      formData,
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
