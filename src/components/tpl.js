const tpl = `<template>
  <ele-form
    %1:form-data="formData"
    :rules="rules"
    :form-desc="formDesc"
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
  }
}
</script>
`
export default tpl
