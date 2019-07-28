<template>
  <ele-form
    :form-data="value"
    :form-desc="formDesc"
    :isShowBackBtn="false"
    :isShowSubmitBtn="false"
    :span="20"
    labelPosition="top"
    v-if="value"
  ></ele-form>
</template>

<script>
export default {
  name: 'AppFormAttr',
  props: {
    value: Object
  },
  data () {
    return {
      formDesc: {
        type: {
          type: 'select',
          label: '类型',
          attrs: {
            disabled: true
          }
        },
        label: {
          type: 'input',
          label: '标签'
        },
        layout: {
          type: 'slider',
          label: '布局',
          default: 24,
          attrs: {
            min: 1,
            max: 24
          }
        },
        tip: {
          type: 'input',
          label: '提示信息'
        }
        // ,'class': {
        //   type: ''
        // }
      }
    }
  },
  watch: {
    formData: {
      handler (data) {
        this.$emit('change', data)
      },
      deep: true
    }
  },
  methods: {},
  mounted () {}
}
</script>
