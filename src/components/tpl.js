const tpl = `<template>
  <ele-form
    %1:form-data="formData"
    :form-desc="formDesc"
  ></ele-form>
</template>

<script>
export default {
  data () {
    return {
      formData: {},
      formDesc: %2
    }
  }
}
</script>
`
export default tpl
