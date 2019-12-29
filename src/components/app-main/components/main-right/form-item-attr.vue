<template>
  <ele-form
    :formData="currentFormItem.formData"
    :formDesc="currentFormItem.formDesc"
    :isShowBackBtn="false"
    :isShowSubmitBtn="false"
    :rules="rules"
    :span="20"
    class="app-item-attr"
    labelPosition="top"
    v-if="currentFormItem && currentFormItem.formDesc"
  ></ele-form>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'AppItemAttr',
  computed: {
    ...mapGetters(['currentFormItem'])
  },
  data() {
    return {
      isShow: false,
      rules: {
        field: {
          required: true,
          message: '字段必填'
        },
        label: {
          required: true,
          message: '标签不能为空'
        }
      }
    }
  },
  watch: {
    // 重新渲染
    'currentFormItem.formDesc'(val) {
      this.isShow = false
      if (val) {
        this.$nextTick(() => {
          this.isShow = true
        })
      }
    }
  }
}
</script>
