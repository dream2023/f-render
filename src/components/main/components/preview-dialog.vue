<template>
  <el-dialog
    append-to-body
    :visible="visible"
    @update:visible="$emit('change', $event)"
    title="预览"
    width="90%"
    @open="isShowContent = true"
    @closed="isShowContent = false"
  >
    <ele-form
      v-bind="frender.formBindProps"
      :formDesc="frender.formDesc"
      v-model="formData"
      :visible="visible"
      v-if="isShowContent"
      @update:visible="$emit('change', $event)"
      :request-fn="handleRequest"
      @request-success="handleRequestSuccess"
    ></ele-form>
  </el-dialog>
</template>

<script>
export default {
  inject: ["frender"],
  props: {
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
      if (val) {
        // 重置数据
        this.formData = {};
      }
    }
  },
  methods: {
    handleRequest(data) {
      // eslint-disable-next-line
      console.log(data);
      return Promise.resolve(data);
    },
    handleRequestSuccess() {
      this.$message.success("发送成功");
    }
  }
};
</script>
