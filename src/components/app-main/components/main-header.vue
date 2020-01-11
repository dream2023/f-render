<template>
  <div class="app-main-header">
    <!-- 顶部按钮 -->
    <el-button @click="isPreview = true" icon="el-icon-view" type="text"
      >预览</el-button
    >
    <el-button @click="isShowData = true" icon="el-icon-upload2" type="text"
      >生成数据</el-button
    >
    <el-button @click="isShowCode = true" icon="el-icon-tickets" type="text"
      >生成代码</el-button
    >
    <el-button @click="clearList" icon="el-icon-delete" type="text"
      >清空列表</el-button
    >
    <el-dialog
      :visible.sync="isPreview"
      append-to-body
      title="预览"
      v-if="isPreview"
      width="90%"
    >
      <ele-form
        :form-desc="formDesc"
        :formData="formData"
        :request-fn="handleRequest"
        @request-success="handleRequestSuccess"
        v-bind="formAttr"
      ></ele-form>
    </el-dialog>
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
        <el-button @click="handleCopyData" type="primary">复制数据</el-button>
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
        <el-button @click="handleCopyHtml" type="primary">复制代码</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import tpl from '@/tpl'
import configList from '@/config'
import { mapState, mapMutations } from 'vuex'
const serialize = require('serialize-javascript')
const copy = require('clipboard-copy')
const cloneDeep = require('lodash.clonedeep')
const isEqual = require('lodash.isequal')

export default {
  name: 'AppMainHeader',
  computed: {
    ...mapState(['formAttr', 'list']),
    formDesc() {
      const list = cloneDeep(this.list)
      // 将数组转为对象, 并删除无用的属性
      return list.reduce((acc, formDesc) => {
        // 判断默认值, 如果默认值不存在, 则删除此属性(无需展示)
        const {
          commonDefaultData = {},
          attrsDefaultData = {},
          assistProperty = [],
          attrs = {}
        } = configList[formDesc.type] || {}

        formDesc = this.processData(formDesc, {
          ...commonDefaultData,
          ...this.commonData
        })

        // 组件自身属性
        formDesc.attrs = this.processData(
          formDesc.attrs,
          attrsDefaultData,
          assistProperty,
          attrs
        )
        if (Object.keys(formDesc.attrs).length === 0) {
          delete formDesc.attrs
        }

        // 删除字段属性
        const field = formDesc['field']
        delete formDesc['field']

        acc[field] = formDesc
        return acc
      }, {})
    },
    codeHtml() {
      let htmlFormAttr = ''
      const formAttrEntries = Object.entries(this.formAttr)
      // 拼接ele-form属性
      if (formAttrEntries.length) {
        htmlFormAttr = formAttrEntries.reduce((acc, val) => {
          // 如果是字符串则不加:, 其它类型则加 :
          acc.push(
            (typeof val[1] === 'string' ? '' : ':') + `${val[0]}="${val[1]}"`
          )
          return acc
        }, [])
        htmlFormAttr = htmlFormAttr.join('\n    ') + '\n    '
      }

      return this.tpl
        .replace('%1', htmlFormAttr)
        .replace('%2', this.serializeObj(this.formDesc))
    },
    // 数据
    codeData() {
      return Object.assign({}, this.formAttr, {
        formDesc: this.formDesc
      })
    }
  },
  data() {
    return {
      tpl: tpl,
      formData: {},
      commonData: {
        layout: 24
      },
      isShowData: false,
      isShowCode: false,
      isPreview: false
    }
  },
  methods: {
    processData(obj, defaultObj = {}, assistProperty = [], formatterObj = {}) {
      obj = cloneDeep(obj)
      for (let key in obj) {
        // 删除默认值
        if (isEqual(obj[key], defaultObj[key])) {
          delete obj[key]
        }

        // 删除无值的
        if (obj[key] === undefined || obj[key] === null) {
          delete obj[key]
        }

        // 删除辅助列
        if (assistProperty.includes(key)) {
          delete obj[key]
        }

        // 删除私有属性
        if (key.startsWith('_')) {
          delete obj[key]
        }

        // 对数据格式化
        if (formatterObj[key] && formatterObj[key].valueFormatter) {
          obj[key] = formatterObj[key].valueFormatter(obj[key])
        }
      }

      // 有点时候_options会删不到
      if (obj._options) {
        delete obj._options
      }
      return obj
    },
    ...mapMutations(['clearList']),
    handleCopyData() {
      copy(JSON.stringify(this.codeData))
      this.$message.success('复制成功!')
    },
    handleCopyHtml() {
      copy(this.codeHtml)
      this.$message.success('复制成功!')
    },
    handleRequest(data) {
      // eslint-disable-next-line no-console
      console.log(data)
      return Promise.resolve()
    },
    handleRequestSuccess() {
      this.$message.success('发送成功')
    },
    // 序列表对象为字符串
    serializeObj(obj) {
      if (!obj || Object.keys(obj).length === 0) return '{}'
      return serialize(obj, { space: 2 })
        .replace(/"(\w+)":/g, '$1:')
        .replace(/(\s\s)(\S)/g, '      $1$2')
        .replace(/}$/, '      }')
    }
  }
}
</script>

<style>
.app-main-header {
  height: 60px;
  line-height: 60px;
  padding-left: 20px;
  border-bottom: 1px solid #ebeef5;
}
</style>
