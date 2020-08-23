export default function(code) {
  return `<template>
  <f-render
    v-model="formData"
    :request-fn="handleSubmit"
    @request-success="handleSuccess"
    :config="formConfig"
    pure
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
