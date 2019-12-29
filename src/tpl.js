const tpl = `<template>
  <ele-form
    %1:rules="rules"
    :form-desc="formDesc"
    :form-data="formData"
    :request-fn="handleRequest"
    @request-success="handleRequestSuccess"
  ></ele-form>
</template>

<script>
export default {
  data () {
    return {
      formData: {},
      formDesc: %2,
      rules: %3
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
