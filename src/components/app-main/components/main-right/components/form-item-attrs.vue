<template>
  <div>
    <template v-if="isShow">
      <attrs-header
        :url="attrLink"
        :title="currentFormItem.type + '组件'"
        v-model="keyword"
      />
      <ele-form
        :formData="currentFormItem.attrs"
        :formDesc="filterFormDesc"
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
import SearchMixin from './components/searchMixin'
import AttrsHeader from './components/attrs-header'

export default {
  name: 'AppFormItemAttrs',
  mixins: [SearchMixin],
  components: { AttrsHeader },
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
