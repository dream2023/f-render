<template>
  <div class="app-main-header">
    <!-- 顶部按钮 -->
    <el-button @click="isPreview = true" icon="el-icon-view" type="text"
      >预览</el-button
    >
    <el-button @click="isShowData = true" icon="el-icon-upload2" type="text"
      >生成数据</el-button
    >
    <el-button
      @click="isShowImportDialog = true"
      icon="el-icon-download"
      type="text"
      >导入数据</el-button
    >
    <el-button @click="isShowCode = true" icon="el-icon-tickets" type="text"
      >生成代码</el-button
    >
    <el-button @click="isShowBatchDialog = true" icon="el-icon-plus" type="text"
      >批量添加</el-button
    >
    <el-button @click="clearForm" icon="el-icon-delete" type="text"
      >清空表单</el-button
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

    <!-- 导入数据弹框 -->
    <import-dialog :visible.sync="isShowImportDialog" />

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

    <!-- 批量添加 -->
    <batch-dialog :visible.sync="isShowBatchDialog"></batch-dialog>
  </div>
</template>

<script>
import tpl from '@/tpl'
import _ from 'lodash-es'
import configList from '@/config'
import { mapState, mapMutations } from 'vuex'
import formAttrDefault from '@/store/formAttrDefault'
import batchDialog from './components/batchDialog'
import importDialog from './components/importDialog'
const serialize = require('serialize-javascript')
const copy = require('clipboard-copy')

export default {
  name: 'AppMainHeader',
  components: { batchDialog, importDialog },
  computed: {
    ...mapState(['formAttr', 'list']),
    filterFormAttr() {
      const formAttr = _.cloneDeep(this.formAttr)
      for (let key in formAttr) {
        const val = formAttr[key]
        // 删除默认值 & 空值, 不需要展示
        if (_.isNil(val) || val === formAttrDefault[key]) {
          delete formAttr[key]
        }
      }
      return formAttr
    },
    formDesc() {
      // 以 field 为 key, 转为对象
      const formDesc = _.keyBy(_.cloneDeep(this.list), 'field')
      // 将数组转为对象, 并删除无用的属性
      for (let key in formDesc) {
        let formItem = formDesc[key]
        // 判断默认值, 如果默认值不存在, 则删除此属性(无需展示)
        const {
          commonDefaultData = {},
          attrsDefaultData = {},
          assistProperty = [],
          attrs = {}
        } = configList[formItem.type] || {}

        formItem = this.processData(formItem, commonDefaultData)

        // 组件自身属性
        formItem.attrs = this.processData(
          formItem.attrs,
          attrsDefaultData,
          assistProperty,
          attrs
        )
        if (_.isEmpty(formItem.attrs)) {
          delete formItem.attrs
        }

        // 删除多余字段
        delete formItem['field']
        formDesc[key] = formItem
      }
      return formDesc
    },
    codeHtml() {
      // 如果是字符串属性值和其它属性值, 一个有 : , 一个没有
      // 例如 {name: 'jack', age: 10} => ['name="jack"', ':age="10"']
      let htmlFormAttr = Object.entries(this.filterFormAttr)
        .map(
          ([key, val]) =>
            (typeof val === 'string' ? '' : ':') + `${key}="${val}"`
        )
        .join('\n    ')

      if (htmlFormAttr.length) {
        htmlFormAttr = htmlFormAttr + '\n    '
      }

      return this.tpl
        .replace('%1', htmlFormAttr)
        .replace('%2', this.serializeObj(this.formDesc))
    },
    // 数据
    codeData() {
      return Object.assign({}, this.filterFormAttr, {
        formDesc: this.formDesc
      })
    }
  },
  data() {
    return {
      tpl: tpl,
      formData: {},
      isShowData: false,
      isShowCode: false,
      isPreview: false,
      isShowBatchDialog: false,
      isShowImportDialog: false
    }
  },
  methods: {
    ...mapMutations(['clearForm', 'updateFormAttr', 'updateList']),
    processData(obj, defaultObj = {}, assistProperty = [], formatterObj = {}) {
      obj = _.cloneDeep(obj)
      for (let key of Reflect.ownKeys(obj)) {
        // 对数据格式化
        if (formatterObj[key] && formatterObj[key].valueFormatter) {
          obj[key] = formatterObj[key].valueFormatter(obj[key])
        }

        // 删除默认值 & 无值的 & 辅助属性 & 私有属性
        const deleteValidator = [
          _.isEqual(obj[key], defaultObj[key]),
          _.isNil(obj[key]),
          assistProperty.includes(key),
          key.startsWith('_')
        ]

        if (deleteValidator.some(Boolean)) {
          delete obj[key]
        }
      }
      return obj
    },
    // 复制数据
    handleCopyData() {
      copy(serialize(this.codeData, { space: 2 }))
      this.$message.success('复制成功!')
    },
    // 复制 html
    handleCopyHtml() {
      copy(this.codeHtml)
      this.$message.success('复制成功!')
    },
    handleRequest(data) {
      return Promise.resolve()
    },
    handleRequestSuccess(data) {
      console.log('data')
      this.$message.success('发送成功')
    },
    // 序列表对象为字符串
    serializeObj(obj) {
      if (_.isEmpty(obj)) return '{}'
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
