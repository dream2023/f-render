const tpl = `<template>
  <ele-form
    %1:form-desc="formDesc"
    v-model="formData"
    :request-fn="handleRequest"
    @request-success="handleRequestSuccess"
  ></ele-form>
</template>

<script>
export default {
  data () {
    return {
      formData: {},
      formDesc: %2
    }
  },
  methods: {
    handleRequest (data) {
      console.log(data)
      return Promise.resolve()
    },
    handleRequestSuccess () {
      this.$message.success('发送成功')
    }
  }
}
</script>
`
export default tpl
