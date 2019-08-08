<template>
  <div class="app-main-header-container">
    <!-- 顶部按钮 -->
    <el-button
      @click="isShowData = true"
      icon="el-icon-upload2"
      type="text"
    >生成数据</el-button>
    <el-button
      @click="isShowCode = true"
      icon="el-icon-tickets"
      type="text"
    >生成代码</el-button>

    <!-- 导出数据弹框 -->
    <el-dialog
      :visible.sync="isShowData"
      append-to-body
      title="数据"
      v-if="isShowData"
      width="600px"
    >
      <json-editor :value="codeData"></json-editor>
      <div style="text-align: center;margin-top: 20px">
        <el-button
          @click="handleCopyData"
          type="primary"
        >复制数据</el-button>
      </div>
    </el-dialog>

    <!-- 生成代码弹框 -->
    <el-dialog
      :visible.sync="isShowCode"
      append-to-body
      title="代码"
      v-if="isShowCode"
      width="600px"
    >
      <codemirror :value="codeHtml"></codemirror>
      <div style="text-align: center;margin-top: 20px">
        <el-button
          @click="handleCopyHtml"
          type="primary"
        >复制代码</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tpl from './tpl'
const copy = require('clipboard-copy')
const cloneDeep = require('lodash.clonedeep')

export default {
  name: 'AppMainHeader',
  props: {
    formDesc: Object,
    formAttr: Object
  },
  computed: {
    codeHtml () {
      let htmlFormAttr = ''
      const formAttrEntries = Object.entries(this.formAttr)
      // 拼接ele-form属性
      if (formAttrEntries.length) {
        htmlFormAttr = formAttrEntries.reduce((acc, val) => {
          acc.push(`:${val[0]}="${val[1]}"`)
          return acc
        }, [])
        htmlFormAttr = htmlFormAttr.join('\n    ') + '\n    '
      }
      return this.tpl.replace('%1', htmlFormAttr).replace('%2', JSON.stringify(this.computedDesc)).replace('%3', JSON.stringify(this.computedRules))
    },

    // 数据
    codeData () {
      return Object.assign({}, this.formAttr, {
        formDesc: this.computedDesc,
        rules: this.computedRules
      })
    },

    // 获取校检规则
    computedRules () {
      const formDesc = cloneDeep(this.formDesc)
      const rules = Object.keys(formDesc).reduce((rules, key) => {
        if (formDesc[key].required) {
          rules[key] = [
            { required: true, message: '请输入' + formDesc[key].label }
          ]
        }
        return rules
      }, {})

      return rules
    },
    // 将 desc 去除校检
    computedDesc () {
      const formDesc = cloneDeep(this.formDesc)
      for (let key in formDesc) {
        if (formDesc[key].required) {
          delete formDesc[key].required
        }
      }
      return formDesc
    }
  },
  data () {
    return {
      tpl: tpl,
      formData: {},
      isShowData: false,
      isShowCode: false
    }
  },
  methods: {
    handleCopyData () {
      copy(JSON.stringify(this.codeData))
      this.$message.success('复制成功!')
    },
    handleCopyHtml () {
      copy(this.codeHtml)
      this.$message.success('复制成功!')
    }
  }
}
</script>

<style>
.app-main-header-container {
  height: 60px;
  line-height: 60px;
  padding-left: 20px;
  border-bottom: 1px solid #ebeef5;
}
</style>
