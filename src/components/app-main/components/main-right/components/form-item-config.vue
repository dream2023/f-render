<template>
  <div>
    <template v-if="currentFormItem">
      <ele-form
        :formData="currentFormItem"
        :formDesc="formDesc"
        :isShowBackBtn="false"
        :isShowSubmitBtn="false"
        :rules="rules"
        :span="20"
        labelPosition="top"
      >
        <template v-slot:rules="{ data, desc, field, type }">
          <div style="margin-bottom: 20px">
            <el-button @click="isShowRuleDialog = true" type="danger"
              >新增校检规则</el-button
            >
          </div>
          <component
            :desc="desc"
            :is="type"
            :field="field"
            :value="currentFormItem[field]"
            @input="handleChangeRules"
          />
          <form-item-rules :visible.sync="isShowRuleDialog" />
        </template>
      </ele-form>
    </template>
    <div class="form-item-placeholder" v-else>
      从左侧拖拽添加表单项并点选
    </div>
  </div>
</template>

<script>
import configList from '@/config'
import { changeFormLabel } from '@/tool.js'
import { mapGetters, mapMutations } from 'vuex'
import FormItemRules from './components/form-item-rules'
const serialize = require('serialize-javascript')

export default {
  name: 'AppFormItemConfig',
  components: {
    FormItemRules
  },
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
      isShowRuleDialog: false,
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
        layout: {
          type: 'slider',
          label: '宽度',
          attrs: {
            min: 1,
            max: 24,
            'format-tooltip'(val) {
              return `${val} / 24`
            }
          },
          on: {
            input: val => {
              // slider组件, 如果传递的value为null或者undefined, 会赋值为 1, 无法利用到默认值, 所以去掉
              if (val !== 1) {
                this.$set(this.currentFormItem, 'layout', val)
              }
            }
          }
        },
        default: {
          type: 'input',
          label: '默认值'
        },
        required: {
          type: 'yesno',
          label: '校检',
          title: '是否必填'
        },
        rules: {
          type: 'textarea',
          label: '校检规则',
          title: '新增校检规则',
          displayFormatter: val => (val ? serialize(val, { space: 2 }) : '')
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
  },
  methods: {
    ...mapMutations(['updateCurrentItem']),
    // 编辑rules对象
    handleChangeRules(rules) {
      try {
        if (rules) {
          rules = eval('(' + rules + ')')
          if (typeof rules !== 'object') return
        } else {
          rules = []
        }
        const data = Object.assign({}, this.currentFormItem, { rules: rules })
        this.updateCurrentItem(data)
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error)
      }
    }
  }
}
</script>
