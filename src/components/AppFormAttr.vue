<template>
  <ele-form
    :form-data="formData"
    :form-desc="formDesc"
    :isShowBackBtn="false"
    :isShowSubmitBtn="false"
    :span="20"
    labelPosition="top"
  ></ele-form>
</template>

<script>
const cloneDeep = require('lodash.clonedeep')

export default {
  name: 'AppFormAttr',
  data () {
    return {
      formDesc: {
        labelPosition: {
          type: 'select',
          label: '标签位置',
          options: [ { text: '响应式', value: null }, 'left', 'right', 'top' ]
        },
        span: {
          type: 'select',
          label: '表单宽度',
          options () {
            const options = Array.from({ length: 24 }, (v, i) => { return { text: `${24 - i} / 24`, value: 24 - i } })
            options.unshift({ text: '响应式', value: null })
            return options
          },
          style: {
            width: '100%'
          }
        },
        isShowSubmitBtn: {
          type: 'radio',
          label: '提交按钮',
          options: [
            { text: '显示', value: true },
            { text: '隐藏', value: false }
          ]
        },
        isShowBackBtn: {
          type: 'radio',
          label: '返回按钮',
          options: [
            { text: '显示', value: true },
            { text: '隐藏', value: false }
          ]
        },
        submitBtnText: {
          type: 'input',
          label: '提交按钮文字'
        },
        backBtnText: {
          type: 'input',
          label: '返回按钮文字'
        }
      },
      defaultData: {
        isShowSubmitBtn: true,
        isShowBackBtn: true,
        submitBtnText: '提交',
        backBtnText: '返回',
        labelWidth: 100,
        labelPosition: null,
        span: null
      },
      formData: {
        isShowSubmitBtn: true,
        isShowBackBtn: true,
        submitBtnText: '提交',
        backBtnText: '返回',
        labelWidth: 100,
        labelPosition: null,
        span: null
      }
    }
  },
  watch: {
    formData: {
      handler (data) {
        data = cloneDeep(data)
        // 删除默认值属性
        const defaultData = this.defaultData
        for (const i in defaultData) {
          if (data[i] === defaultData[i]) {
            delete data[i]
          }
        }

        this.$emit('change', data)
      },
      deep: true
    }
  },
  methods: {},
  mounted () {}
}
</script>
