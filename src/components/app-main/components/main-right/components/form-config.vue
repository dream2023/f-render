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
import { mapMutations } from 'vuex'
const cloneDeep = require('lodash.clonedeep')

export default {
  name: 'AppFormConfig',
  data() {
    return {
      formDesc: {
        inline: {
          type: 'radio',
          label: 'inline模式 / layout模式',
          options: [
            { text: 'layout模式', value: false },
            { text: 'inline模式', value: true }
          ]
        },
        isResponsive: {
          type: 'switch',
          label: '是否响应式',
          vif(data) {
            return !data.inline
          },
          options: [
            { text: '是', value: true },
            { text: '否', value: false }
          ]
        },
        labelPosition: {
          type: 'select',
          label: '标签位置',
          options(data) {
            const options = ['left', 'right', 'top']
            if (data.isResponsive && !data.inline) {
              options.unshift({ text: '响应式', value: null })
            }
            return options
          }
        },
        span: {
          type: 'select',
          label: '表单宽度',
          vif(data) {
            return !data.inline
          },
          options(data) {
            const options = Array.from({ length: 24 }, (v, i) => {
              return { text: `${24 - i} / 24`, value: 24 - i }
            })
            if (data.isResponsive) {
              options.unshift({ text: '响应式', value: null })
            }
            return options
          },
          style: {
            width: '100%'
          }
        },
        labelWidth: {
          type: 'number',
          label: '标签宽度',
          attrs: {
            step: 10
          },
          tip: '默认值为auto'
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
        isShowCancelBtn: {
          type: 'radio',
          label: '取消按钮',
          options: [
            { text: '显示', value: true },
            { text: '隐藏', value: false }
          ]
        },
        isShowResetBtn: {
          type: 'radio',
          label: '重置按钮',
          options: [
            { text: '显示', value: true },
            { text: '隐藏', value: false }
          ]
        },
        formBtnSize: {
          type: 'select',
          label: '表单按钮大小',
          options: [{ text: '默认', value: null }, 'medium', 'small', 'mini']
        },
        submitBtnText: {
          type: 'input',
          label: '提交按钮文字'
        },
        backBtnText: {
          type: 'input',
          label: '返回按钮文字'
        },
        cancelBtnText: {
          type: 'input',
          label: '取消按钮文字'
        },
        resetBtnText: {
          type: 'input',
          label: '返回按钮文字'
        }
      },
      formData: {
        inline: false,
        isShowSubmitBtn: null,
        isShowBackBtn: null,
        isShowResetBtn: null,
        isShowCancelBtn: null,
        isResponsive: true,
        submitBtnText: '提交',
        cancelBtnText: '取消',
        backBtnText: '返回',
        resetBtnText: '重置',
        labelWidth: 0,
        labelPosition: null,
        span: null,
        formBtnSize: null
      }
    }
  },
  watch: {
    // 检查变化
    formData: {
      handler(data) {
        data = cloneDeep(data)
        // 删除默认值属性(默认属性无需展示)
        const defaultData = this.defaultData
        for (const i in defaultData) {
          if (data[i] === defaultData[i]) {
            delete data[i]
          }
        }

        this.updateFormAttr(data)
      },
      deep: true
    }
  },
  methods: {
    ...mapMutations(['updateFormAttr'])
  },
  created() {
    this.defaultData = cloneDeep(this.formData)
  }
}
</script>
