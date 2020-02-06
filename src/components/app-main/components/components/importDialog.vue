<template>
  <el-dialog
    :visible="visible"
    @update:visible="$emit('update:visible', $event)"
    append-to-body
    title="导入数据"
    v-if="visible"
    width="600px"
  >
    <!-- 预览弹窗 -->
    <el-dialog width="90%" :visible.sync="isShowPreview" append-to-body>
      <el-card header="表单预览" shadow="hover" class="box-card">
        <ele-form
          :form-desc="formDesc"
          :formData="{}"
          :request-fn="handleRequest"
          @request-success="handleRequestSuccess"
          v-bind="formAttr"
        ></ele-form>
      </el-card>
      <div slot="footer">
        <el-button @click="isShowPreview = false">返回编辑</el-button>
        <el-button type="primary" @click="confirmGen">生成表单</el-button>
      </div>
    </el-dialog>

    <el-alert
      title="必须是JSON对象"
      style="margin-bottom: 20px"
      type="warning"
      show-icon
    >
    </el-alert>

    <!-- 编辑器 -->
    <codemirror @input="handleChange" v-model="jsonStr"></codemirror>
    <!-- 按钮操作 -->
    <div style="text-align: center;margin-top: 20px">
      <el-button @click="handleImport" :disabled="importDisabled" type="primary"
        >导入数据</el-button
      >
    </div>
  </el-dialog>
</template>

<script>
import _ from 'lodash-es'
import formAttrDefault from '@/store/formAttrDefault'
import { mapMutations } from 'vuex'

export default {
  name: 'importDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isShowPreview: false,
      formDesc: {},
      formAttr: {},
      jsonData: {},
      jsonStr: '{\n  formDesc: {\n   \n  }\n}',
      isError: false
    }
  },
  computed: {
    importDisabled() {
      return !this.jsonData || Object.keys(this.jsonData).length === 0
    }
  },
  watch: {
    visible() {
      this.isShowPreview = false
      this.jsonData = {}
      this.formDesc = {}
    }
  },
  methods: {
    ...mapMutations([
      'clearForm',
      'updateList',
      'updateFormAttr',
      'updateSelectIndex'
    ]),
    // 处理数据
    handleChange(json) {
      if (this.handleChangeFn) {
        this.handleChangeFn(json)
      } else {
        this.handleChangeFn = _.debounce(json => {
          try {
            json = eval('(' + json + ')')
            if (typeof json === 'object') {
              this.jsonData = _.cloneDeep(json)
              this.formDesc = this.jsonData.formDesc
              this.isError = false
            } else {
              this.isError = true
            }
          } catch (err) {
            this.isError = true
          }
        }, 200)
      }
    },
    // 处理粘贴的json
    handleImport() {
      if (typeof this.jsonData !== 'object' || this.isError) {
        this.$message.error('请输入正确的 JSON 格式！')
        return false
      }

      if (this.jsonData && this.jsonData.formDesc) {
        let keys = Object.keys(formAttrDefault)
        this.formAttr = Object.assign(
          formAttrDefault,
          _.pick(this.jsonData, keys)
        )

        // 临时预览的 formAttr
        this.isShowPreview = true
      } else {
        this.$message.error('数据必须有 "formDesc" 属性！')
        return false
      }
    },
    // 确认生成表单
    confirmGen() {
      this.json2Form()
      this.$emit('update:visible', false)
    },
    // 处理json数据，将json 映射到操作面板 （list)
    json2Form() {
      // 清空原有list （待优化）
      this.clearForm()
      // 1.分离 formAttr （表单配置数据）
      this.updateFormAttr(this.formAttr)
      // 2.更新 formDesc（组件通用配置数据）
      // 3.处理 formDesc.attr（组件属性配置数据）
      let list = Object.entries(this.formDesc).map(([key, val]) => ({
        attrs: val.attrs || {},
        field: key,
        ...val
      }))
      // 更新 list
      this.updateList(list)
      // 更新 selectIndex
      this.updateSelectIndex(0)
    },
    handleRequest(data) {
      return Promise.resolve()
    },
    handleRequestSuccess(data) {
      console.log('data')
      this.$message.success('发送成功')
    }
  }
}
</script>
