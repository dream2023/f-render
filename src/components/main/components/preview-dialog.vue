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
      v-bind="formConfig"
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
import _ from "lodash";

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
      formData: {},
      formConfig: {
        formDesc: {}
      }
    };
  },
  watch: {
    visible(val) {
      if (val) {
        // 因为 ele-form 会自动添加一些隐藏属性，所以，这里复制一份，避免修改原数据
        this.formConfig = _.cloneDeep(this.frender.changedFormConfig);
        this.formData = {};
      }
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
