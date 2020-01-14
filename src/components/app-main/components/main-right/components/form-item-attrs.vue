<template>
  <div>
    <ele-form
      :formData="currentFormItem.attrs"
      :formDesc="formDesc"
      :isShowBackBtn="false"
      :isShowSubmitBtn="false"
      :span="20"
      labelPosition="top"
      v-if="isShow"
    />
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
    formDesc() {
      const config = configList[this.currentFormItem.type]
      const formDesc = config.attrs || {}
      return changeFormLabel(formDesc, config.assistProperty)
    }
  }
}
</script>
