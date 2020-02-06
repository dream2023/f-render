<template>
  <div class="app-main-header">
    <!-- 顶部按钮 -->
    <el-button @click="isPreview = true" icon="el-icon-view" type="text"
      >预览</el-button
    >
    <el-button
      @click="isShowExportData = true"
      icon="el-icon-upload2"
      type="text"
      >生成数据</el-button
    >
    <el-button @click="isShowHtmlCode = true" icon="el-icon-tickets" type="text"
      >生成代码</el-button
    >
    <el-button
      @click="isShowImportDialog = true"
      icon="el-icon-download"
      type="text"
      >导入数据</el-button
    >
    <el-button @click="isShowBatchDialog = true" icon="el-icon-plus" type="text"
      >批量添加</el-button
    >
    <el-button @click="clearForm" icon="el-icon-delete" type="text"
      >清空表单</el-button
    >
    <!-- 预览弹窗 -->
    <preview-dialog :formDesc="formDesc" :visible.sync="isPreview" />

    <!-- 导入数据弹框 -->
    <import-dialog :visible.sync="isShowImportDialog" />

    <!-- 导出数据弹框 -->
    <export-dialog
      :formDesc="formDesc"
      :formAttr="filterFormAttr"
      :visible.sync="isShowExportData"
    />

    <!-- 生成代码弹框 -->
    <html-dialog
      :formDesc="formDesc"
      :formAttr="filterFormAttr"
      :visible.sync="isShowHtmlCode"
    />

    <!-- 批量添加 -->
    <batch-dialog :visible.sync="isShowBatchDialog"></batch-dialog>
  </div>
</template>

<script>
import _ from 'lodash-es'
import configList from '@/config'
import { mapState, mapMutations } from 'vuex'
import formAttrDefault from '@/store/formAttrDefault'
import batchDialog from './components/batchDialog'
import importDialog from './components/importDialog'
import exportDialog from './components/exportDialog'
import previewDialog from './components/previewDialog'
import htmlDialog from './components/htmlDialog'

export default {
  name: 'AppMainHeader',
  components: {
    batchDialog,
    importDialog,
    previewDialog,
    exportDialog,
    htmlDialog
  },
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
    }
  },
  data() {
    return {
      isShowExportData: false,
      isShowHtmlCode: false,
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
