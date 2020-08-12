<template>
  <el-dialog
    append-to-body
    :visible="visible"
    @update:visible="$emit('update:visible', $event)"
    title="预览"
    width="90%"
    @open="isShowContent = true"
    @closed="isShowContent = false"
  >
    <ele-form
      :formDesc="computedFormDesc"
      v-model="formData"
      :visible="visible"
      v-if="isShowContent"
      @update:visible="$emit('update:visible', $event)"
      :request-fn="handleRequest"
      @request-success="handleRequestSuccess"
      v-bind="formAttr"
    ></ele-form>
  </el-dialog>
</template>

<script>
import _ from "lodash";

export default {
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
  data() {
    return {
      isShowContent: false,
      formData: {}
    };
  },
  watch: {
    visible(val) {
      if (!val) {
        this.formData = {};
      }
    }
  },
  computed: {
    // 需要加一层 clone, 因为 ele-form会修改内部属性
    computedFormDesc() {
      return _.cloneDeep(this.formDesc);
    }
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
};
</script>
