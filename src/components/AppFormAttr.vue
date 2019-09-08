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
        inline: {
          type: 'radio',
          label: 'inline模式 / layout模式',
          options: [
            { text: 'layout模式', value: false },
            { text: 'inline模式', value: true }
          ],
          on: {
            change: (inline) => {
              if (inline === true) {
                this.formDesc.span.type = 'hide'
                this.formDesc.isResponsive.type = 'hide'
                this.formData.isResponsive = true
                this.formDesc.labelPosition.options.shift()
              } else {
                this.formDesc.span.type = 'select'
                this.formDesc.isResponsive.type = 'switch'
                this.formDesc.labelPosition.options.unshift({ text: '响应式', value: null })
              }
            }
          }
        },
        isResponsive: {
          type: 'switch',
          label: '是否响应式',
          options: [
            { text: '是', value: true },
            { text: '否', value: false }
          ],
          on: {
            change: (isResponsive) => {
              if (isResponsive === true) {
                this.formDesc.labelPosition.options.unshift({ text: '响应式', value: null })
                this.formDesc.span.options.unshift({ text: '响应式', value: null })
              } else {
                this.formDesc.labelPosition.options.shift()
                this.formDesc.span.options.shift()
              }
            }
          }
        },
        labelPosition: {
          type: 'select',
          label: '标签位置',
          options: [ { text: '响应式', value: null }, { text: 'left', value: 'left' }, { text: 'right', value: 'right' }, { text: 'top', value: 'top' } ]
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
        isShowResetBtn: {
          type: 'radio',
          label: '重置按钮',
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
        isResponsive: true,
        submitBtnText: '提交',
        backBtnText: '返回',
        resetBtnText: '重置',
        labelWidth: 0,
        labelPosition: null,
        span: null
      }
    }
  },
  watch: {
    // 检查变化, 同步到 app-form 组件
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
  created () {
    this.defaultData = cloneDeep(this.formData)
  }
}
</script>
