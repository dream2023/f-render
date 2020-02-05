<template>
  <div class="app-main-header">
    <!-- 顶部按钮 -->
    <el-button @click="isPreview = true" icon="el-icon-view" type="text"
      >预览</el-button
    >
    <el-button @click="isShowData = true" icon="el-icon-upload2" type="text"
      >生成数据</el-button
    >
    <el-button @click="isShowCodePen = true" icon="el-icon-download" type="text"
      >导入代码</el-button
    >
    <el-button @click="isShowCode = true" icon="el-icon-tickets" type="text"
      >生成代码</el-button
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
    <el-dialog
      :visible.sync="isShowCodePen"
      append-to-body
      title="导入数据"
      v-if="isShowCodePen"
      width="600px"
    >
      <el-dialog
        width="90%"
        title="预览表单"
        :visible.sync="innerDialogShow"
        append-to-body>
        <ele-form
          style="background: #f8f8f8"
          v-if="innerDialogShow"
          :form-desc="jsonFormDesc"
          :formData="{}"
          :request-fn="handleRequest"
          @request-success="handleRequestSuccess"
          v-bind="jsonTempFormAttr"
        ></ele-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="confirmGen">生成表单</el-button>
        </div>
      </el-dialog>
      <json-editor @input="jsonInput" :value="jsonPenData"></json-editor>
      <div style="text-align: center;margin-top: 20px">
        <el-button @click="handleJson" type="primary">导入数据</el-button>
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
import _ from 'lodash-es'
import configList from '@/config'
import { mapState, mapMutations } from 'vuex'
import formAttrDefault from '@/store/formAttrDefault'
const serialize = require('serialize-javascript')
const copy = require('clipboard-copy')

export default {
  name: 'AppMainHeader',
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
    // jsonFormDesc() {
    //   console.log({ formDesc: this.jsonPenData.formDesc })
    //   return { formDesc: this.jsonPenData.formDesc }
    // },
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
      isShowCodePen: false,
      innerDialogShow: false,
      jsonPenData: {},
      jsonFormDesc: {},
      jsonTempFormAttr: {}
    }
  },
  methods: {
    ...mapMutations(['clearList', 'updateFormAttr', 'updateList']),
    // 处理数据
    jsonInput(json) {
      this.jsonData = _.cloneDeep(json)
      this.jsonFormDesc = _.cloneDeep(json).formDesc
    },
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
    // 清空表单
    clearForm() {
      this.clearList()
      this.updateFormAttr(formAttrDefault)
    },
    // 处理粘贴的json
    handleJson() {
      this.jsonTempFormAttr = Object.assign(formAttrDefault, this.jsonData) // 临时预览的 formAttr
      this.innerDialogShow = true
    },
    // 确认生成表单
    confirmGen() {
      this.json2Form()
      this.isShowCodePen = false
      this.innerDialogShow = false
    },
    // 处理json数据，将json 映射到操作面板 （list)
    json2Form() {
      // 清空原有list （待优化）
      this.clearForm()
      // 1.分离 formAttr （表单配置数据）
      let formAttr = Object.assign(formAttrDefault, this.jsonData) // 覆盖原有数据
      this.updateFormAttr(formAttr)
      // 2.更新 formDesc（组件通用配置数据）
      let list = Object.entries(this.jsonFormDesc).map(([key, val]) => {
        // 3.处理 formDesc.attr（组件属性配置数据）
        if (val.attrs === undefined) {
          return {
            attrs: {},
            field: key,
            ...val
          }
        } else {
          return {
            field: key,
            ...val
          }
        }
      })
      // 更新 list
      this.updateList(list)
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
      // eslint-disable-next-line no-console
      console.log(data)
      return Promise.resolve()
    },
    handleRequestSuccess() {
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
