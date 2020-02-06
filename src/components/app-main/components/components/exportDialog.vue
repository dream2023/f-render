<template>
  <el-dialog
    :visible="visible"
    append-to-body
    title="数据"
    @update:visible="$emit('update:visible', $event)"
    v-if="visible"
    width="600px"
  >
    <json-editor :value="codeData"></json-editor>
    <div style="text-align: center;margin-top: 20px">
      <el-button @click="handleCopyData" type="primary">复制数据</el-button>
    </div>
  </el-dialog>
</template>

<script>
const serialize = require('serialize-javascript')
const copy = require('clipboard-copy')

export default {
  name: 'exportDialog',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    formDesc: {
      type: Object,
      default: () => {}
    },
    formAttr: {
      type: Object,
      default: () => {}
    }
  },
  computed: {
    // 数据
    codeData() {
      return Object.assign({}, this.formAttr, {
        formDesc: this.formDesc
      })
    }
  },
  methods: {
    // 复制数据
    handleCopyData() {
      copy(serialize(this.codeData, { space: 2 }))
      this.$message.success('复制成功!')
    }
  }
}
</script>
