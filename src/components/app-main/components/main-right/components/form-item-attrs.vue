<template>
  <div>
    <template v-if="isShow">
      <div v-if="attrLink" class="app-main-right-link">
        <el-link type="primary" target="_blank" :href="attrLink"
          >点击查看&nbsp;{{ currentFormItem.type }}组件</el-link
        >&nbsp;
        <span style="vertical-align: middle;">属性详细解释</span>
      </div>
      <ele-form
        :formData="currentFormItem.attrs"
        :formDesc="formDesc"
        :isShowBackBtn="false"
        :isShowSubmitBtn="false"
        :span="20"
        labelPosition="top"
      />
    </template>
    <div class="form-item-placeholder" v-else>
      从左侧拖拽添加表单项并点选
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import configList from '@/config'
import { changeFormLabel } from '@/tool.js'

export default {
  name: 'AppFormItemAttrs',
  computed: {
    ...mapGetters(['currentFormItem']),
    isShow() {
      return this.currentFormItem && this.currentFormItem.attrs
    },
    config() {
      return configList[this.currentFormItem.type]
    },
    attrLink() {
      return this.config.url
    },
    formDesc() {
      const formDesc = this.config.attrs || {}
      return changeFormLabel(formDesc, this.config.assistProperty)
    }
  }
}
</script>
