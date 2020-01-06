<template>
  <ele-form
    :formData="currentFormItem"
    :formDesc="formDesc"
    :isShowBackBtn="false"
    :isShowSubmitBtn="false"
    :rules="rules"
    :span="20"
    labelPosition="top"
    v-if="currentFormItem"
  />
</template>

<script>
import { mapGetters } from 'vuex'
import { changeFormLabel } from '@/tool.js'
import configList from '@/config'

export default {
  name: 'AppFormItemConfig',
  computed: {
    ...mapGetters(['currentFormItem']),
    formDesc() {
      const customConfig = configList[this.currentFormItem.type].common || {}
      const formDesc = Object.assign({}, this.commonConfig, customConfig)
      return changeFormLabel(formDesc)
    }
  },
  data() {
    return {
      // 通用配置
      commonConfig: {
        field: {
          type: 'input',
          label: '字段名'
        },
        label: {
          type: 'input',
          label: '标签'
        },
        default: {
          type: 'input',
          label: '默认值'
        },
        layout: {
          type: 'slider',
          label: '宽度',
          attrs: {
            min: 1,
            max: 24,
            'format-tooltip'(val) {
              return `${val} / 24`
            }
          }
        },
        required: {
          type: 'yesno',
          label: '校检',
          title: '是否必填'
        },
        tip: {
          type: 'input',
          label: '表单项提示'
        }
      },
      rules: {
        field: {
          required: true,
          message: '字段必填'
        },
        label: {
          required: true,
          message: '标签不能为空'
        }
      }
    }
  }
}
</script>
