export default function(code) {
  return `<template>
  <ele-form
    v-bind="formConfig"
    v-model="formData"
    :request-fn="handleRequest"
    @request-success="handleRequestSuccess"
  />
</template>

<script>
export default {
  data() {
    return {
      formData: {},
      formConfig: ${code}
    };
  },
  methods: {
    handleRequest(data) {
      console.log(data);
      return Promise.resolve();
    },
    handleRequestSuccess() {
      this.$message.success("发送成功");
    }
  }
};
</script>
`;
}
