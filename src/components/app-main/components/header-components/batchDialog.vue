<template>
  <ele-form-dialog
    v-model="formData"
    :formDesc="formDesc"
    labelPosition="left"
    width="800px"
    :dialogAttrs="{
      'append-to-body': true
    }"
    :request-fn="handleAdd"
    :visible="visible"
    @update:visible="$emit('update:visible', $event)"
    title="批量添加表单信息"
  ></ele-form-dialog>
</template>

<script>
import _ from 'lodash-es'
import comps from '@/comps.js'
import { addFormItem } from '@/tool.js'
import { mapState, mapMutations } from 'vuex'
import EleFormDialog from 'vue-ele-form/lib/EleFormDialog'

export default {
  name: 'batchDialog',
  components: { EleFormDialog },
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapState(['list'])
  },
  data() {
    return {
      formData: {
        type: 'dynamic',
        data: []
      },
      formDesc: {
        type: {
          type: 'radio',
          label: '添加方式',
          default: 'dynamic',
          options: [
            { text: '逐个新增', value: 'dynamic' },
            { text: '编辑对象', value: 'json-editor' },
            {
              text: '数据库导入(待开发)',
              value: 'mysql',
              attrs: { disabled: true }
            }
          ]
        },
        data: {
          type: data => data.type,
          label: '表单项',
          isTypeChangeReloadValue: false,
          attrs: {
            columns: [
              {
                type: 'el-input',
                valueKey: 'field',
                attrs: {
                  placeholder: '请输入 field'
                }
              },
              {
                type: 'el-input',
                valueKey: 'label',
                attrs: {
                  placeholder: '请输入 label'
                }
              },
              {
                type: 'el-select',
                valueKey: 'type',
                slots: {
                  default(h) {
                    return comps
                      .map(item => item.comps)
                      .flat()
                      .map(item =>
                        h('el-option', {
                          attrs: {
                            label: `${item.type} - ${item.label}`,
                            value: item.type
                          }
                        })
                      )
                  }
                },
                attrs: {
                  filterable: true,
                  placeholder: '请输入选择 type'
                }
              }
            ]
          },
          valueFormatter: arr =>
            arr.map(item => _.pick(item, ['field', 'label', 'type'])),
          rules: {
            type: 'array',
            validator: (rule, value, callback) => {
              let errorArr = []
              if (Array.isArray(value) && value.length) {
                // 字段不可重复
                errorArr = value
                  .map((item, index) =>
                    this.formDesc[item.field]
                      ? `第${index + 1}行的 field 重复`
                      : null
                  )
                  .filter(Boolean)

                // 字段不可为空
                errorArr = errorArr.concat(
                  value
                    .map((item, index) => {
                      const errMsg = []
                      if (!item.field) errMsg.push('field')
                      if (!item.label) errMsg.push('label')
                      if (!item.type) errMsg.push('type')

                      return errMsg.length
                        ? `第${index + 1}行的 ${errMsg.join('、')} 未填写`
                        : null
                    })
                    .filter(Boolean)
                )
              }
              errorArr.length
                ? callback(new Error(errorArr.join(' & ')))
                : callback()
            }
          }
        }
      }
    }
  },
  methods: {
    ...mapMutations(['updateList']),
    handleAdd({ data }) {
      if (Array.isArray(data) && data.length) {
        const newFormItems = data.map(item => addFormItem(item))
        this.updateList(this.list.concat(newFormItems))
        this.$message.success('添加成功')
        this.formData = {
          type: 'dynamic',
          data: []
        }
        this.$emit('update:visible', false)
      }
    }
  }
}
</script>
