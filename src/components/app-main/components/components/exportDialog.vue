<template>
  <el-dialog
    :visible="visible"
    append-to-body
    title="数据"
    @update:visible="$emit('update:visible', $event)"
    v-if="visible"
    width="600px"
  >
    <ele-form :formData="{ code: codeData }" :formDesc="codeFormDesc">
      <template v-slot:form-btn>
        <div style="text-align: center;">
          <el-button @click="handleCopyData" type="primary">复制数据</el-button>
        </div>
      </template>
    </ele-form>
  </el-dialog>
</template>

<script>
import copy from "clipboard-copy";
import serialize from "serialize-javascript";

export default {
  name: "exportDialog",
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    formDesc: {
      type: Object,
      default: () => ({})
    },
    formAttr: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      codeFormData: {},
      codeFormDesc: {
        code: {
          type: "json-editor",
          attrs: {
            options: {
              mode: "preview"
            }
          }
        }
      }
    };
  },
  computed: {
    codeData() {
      return Object.assign({}, this.formAttr, {
        formDesc: this.formDesc
      });
    }
  },
  methods: {
    handleCopyData() {
      copy(serialize(this.codeData, { space: 2 }));
      this.$message.success("复制成功!");
    }
  }
};
</script>
