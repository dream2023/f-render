<template>
  <ele-form
    v-model="formAttr"
    :form-desc="computedFormDesc"
    :isShowBackBtn="false"
    :isShowSubmitBtn="false"
    :span="20"
    ref="ele-form"
    labelPosition="top"
  ></ele-form>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { changeFormLabel } from '@/tool.js'

export default {
  name: 'AppFormConfig',
  data() {
    return {
      formDesc: {
        inline: {
          type: 'radio',
          default: false,
          label: 'inline模式 / layout模式',
          options: [
            { text: 'layout模式', value: false },
            { text: 'inline模式', value: true }
          ],
          on: {
            change: val => {
              if (!val) {
                this.formAttr.isResponsive = true
              }
            }
          }
        },
        isResponsive: {
          type: 'switch',
          label: '是否响应式',
          vif: data => !data.inline,
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
          vif: data => !data.inline,
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
        isDialog: {
          type: 'switch',
          label: '是否为弹窗'
        },
        isShowLabel: {
          type: 'switch',
          label: '是否显示标签'
        },
        labelWidth: {
          type: 'input',
          label: '标签宽度',
          attrs: {
            type: 'number'
          },
          tip: '默认值为auto'
        },
        disabled: {
          type: 'switch',
          label: '全局禁用表单'
        },
        isShowSubmitBtn: {
          type: 'radio',
          label: '提交按钮',
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
        isShowBackBtn: {
          type: 'radio',
          label: '返回按钮',
          options: [
            { text: '默认', value: null },
            { text: '显示', value: true },
            { text: '隐藏', value: false }
          ]
        },
        isShowCancelBtn: {
          type: 'radio',
          label: '取消按钮',
          options: [
            { text: '默认', value: null },
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
      }
    }
  },
  computed: {
    ...mapState(['formAttr']),
    computedFormDesc() {
      return changeFormLabel(this.formDesc)
    }
  },
  methods: {
    ...mapMutations(['updateFormAttr'])
  }
}
</script>
