<template>
  <el-dialog
    :visible="visible"
    append-to-body
    title="预览"
    @update:visible="$emit('update:visible', $event)"
    v-if="visible"
    width="90%"
  >
    <ele-form
      :formDesc="formDesc"
      v-model="formData"
      :request-fn="handleRequest"
      @request-success="handleRequestSuccess"
      v-bind="formAttr"
    ></ele-form>
  </el-dialog>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: 'previewDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    formDesc: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
      formData: {}
    }
  },
  computed: {
    ...mapState(['formAttr', 'list'])
  },
  methods: {
    handleRequest(data) {
      // eslint-disable-next-line no-console
      console.log(data)
      return Promise.resolve(data)
    },
    handleRequestSuccess(data) {
      this.$message.success('发送成功')
    }
  }
}
</script>
