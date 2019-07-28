<template>
  <ele-form
    :formData="formItem.formData"
    :formDesc="formItem.formDesc"
    :isShowBackBtn="false"
    :isShowSubmitBtn="false"
    :rules="rules"
    :span="20"
    labelPosition="top"
    v-if="isShow"
  ></ele-form>
</template>

<script>
export default {
  name: 'AppFormAttr',
  props: {
    formItem: Object
  },
  data () {
    return {
      isShow: false,
      rules: {
        field: {
          required: true, message: '字段必填'
        },
        label: {
          required: true, message: '标签不能为空'
        }
      }
    }
  },
  watch: {
    // 重新渲染
    'formItem.formDesc': {
      handler () {
        this.isShow = false
        this.$nextTick(() => {
          this.isShow = true
        })
      },
      deep: false
    }
  },
  methods: {
  },
  mounted () {}
}
</script>
