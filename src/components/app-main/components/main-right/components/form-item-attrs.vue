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
    ></ele-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import configList from '@/config'

export default {
  name: 'AppFormItemAttrs',
  computed: {
    ...mapGetters(['currentFormItem']),
    isShow() {
      return this.currentFormItem && this.currentFormItem.attrs
    },
    formDesc() {
      return configList[this.currentFormItem.type].attrs || {}
    }
  }
}
</script>
