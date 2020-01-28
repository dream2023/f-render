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
          <!-- <el-input type="textarea" :value="data"></el-input> -->
        </template>
      </ele-form>

      <!-- 新增校检 -->
      <ele-form-dialog
        :formData="ruleData"
        :formDesc="rulesDesc"
        :request-fn="handleAddRule"
        @request-success="handleSuccess"
        :visible.sync="isShowRuleDialog"
        title="新增校检规则"
      >
      </ele-form-dialog>
    </template>
    <div class="form-item-placeholder" v-else>
      从左侧拖拽添加表单项并点选
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from 'vuex'
import { changeFormLabel } from '@/tool.js'
import configList from '@/config'
const serialize = require('serialize-javascript')

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
      isShowRuleDialog: false,
      ruleData: {},
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
      },
      rulesDesc: {
        type: {
          type: 'select',
          label: '类型',
          default: null,
          layout: 12,
          attrs: {
            clearable: true
          },
          options: [
            { value: 'any', desc: '任意类型' },
            { value: 'string', desc: '必须是 string' },
            { value: 'number', desc: '必须是 number' },
            { value: 'boolean', desc: '必须是 boolean' },
            {
              value: 'regexp',
              desc: '必须是正则或者是在调用 new RegExp 时不报错的字符串'
            },
            { value: 'integer', desc: '整数' },
            { value: 'float', desc: '浮点数' },
            { value: 'enum', desc: '值必须出现在 enmu 枚举值中' },
            { value: 'date', desc: '合法的日期，使用 Date 判断' },
            { value: 'url', desc: 'URL' },
            { value: 'email', desc: '邮箱地址' },
            { value: 'array', desc: '必须是数组，通过 Array.isArray 判断' },
            { value: 'object', desc: '是对象且不为数组' },
            { value: 'method', desc: '必须是 function' },
            { value: 'hex', desc: '16进制' }
          ],
          slots: {
            default(h, { options }) {
              const res = options.map(option =>
                h('el-option', { attrs: { value: option.value } }, [
                  h('span', { style: { float: 'left' } }, option.value),
                  h(
                    'span',
                    {
                      style: {
                        float: 'right',
                        color: '#8492a6',
                        fontSize: '13px'
                      }
                    },
                    option.desc
                  )
                ])
              )
              return res
            }
          }
        },
        trigger: {
          type: 'select',
          label: '触发方式',
          layout: 12,
          attrs: {
            clearable: true
          },
          options: ['change', 'blur']
        },
        pattern: {
          type: 'input',
          layout: 12,
          label: '正则表达式文本',
          slots: {
            prepend: h => h('span', '/'),
            append: h => h('span', '/')
          },
          tip: '不需要带`/`',
          valueFormatter(val) {
            return val ? new RegExp(val) : val
          },
          vif: data => ['any', 'regexp', 'string', 'url'].includes(data.type)
        },
        required: {
          type: 'switch',
          label: '是否必填',
          layout: 12,
          tip: '通用配置的`required`和这里的`必填`有一个即可'
        },
        min: {
          type: 'input',
          label: '范围最小值',
          attrs: {
            type: 'number'
          },
          valueFormatter: val => (val ? Number(val) : val),
          vif: data =>
            [
              'any',
              'string',
              'number',
              'array',
              'float',
              'integer',
              'hex'
            ].includes(data.type),
          layout: 12,
          tip:
            '当是`字符串或数组`时, 为`value.length`的最小值, 当是`number`时, 为`最小值`'
        },
        max: {
          type: 'input',
          label: '范围最大值',
          layout: 12,
          attrs: {
            type: 'number'
          },
          valueFormatter: val => (val ? Number(val) : val),
          vif: data =>
            [
              'any',
              'string',
              'number',
              'array',
              'float',
              'integer',
              'hex'
            ].includes(data.type),
          tip:
            '当是`字符串或数组`时, 为`value.length`的最大值, 当是`number`时, 为`最大值`'
        },
        len: {
          type: 'input',
          label: 'Length 长度',
          layout: 12,
          attrs: {
            type: 'number'
          },
          valueFormatter: val => (val ? Number(val) : val),
          vif: data =>
            [
              'any',
              'string',
              'number',
              'array',
              'float',
              'integer',
              'hex'
            ].includes(data.type),
          tip: '如果 len 与 min 和 max 同时使用，`len 优先`'
        },
        enum: {
          type: 'dynamic',
          label: '枚举值',
          default: [],
          layout: 12,
          vif: data => data.type === 'enum'
        },
        whitespace: {
          type: 'switch',
          label: '空格字符串',
          layout: 12,
          tip: '仅包含空格的字段视为错误'
        },
        message: {
          type: 'input',
          label: '提示信息',
          attrs: {
            clearable: true
          }
        }
      }
    }
  },
  methods: {
    ...mapMutations(['updateCurrentItem']),
    handleAddRule(data) {
      // 过滤掉空值
      const filteredData = this.$lodash
        .chain(data)
        .toPairs()
        .filter(item => Boolean(item[1]))
        .fromPairs()
        .value()

      return Promise.resolve(filteredData)
    },
    handleChangeRules(rules) {
      try {
        if (rules) {
          // eslint-disable-next-line no-eval
          rules = eval('(' + rules + ')')
        }
        const data = Object.assign({}, this.currentFormItem, { rules: rules })
        console.log(data)
        this.updateCurrentItem(data)
      } catch (error) {
        console.error(error)
      }
    },
    handleSuccess(data) {
      const currentFormItem = this.currentFormItem
      if (!currentFormItem.rules) currentFormItem.rules = []
      this.currentFormItem.rules.push(data)
      this.updateCurrentItem(currentFormItem)
      this.isShowRuleDialog = false
      this.ruleData = {}
      this.$message.success('创建成功')
    }
  }
}
</script>
