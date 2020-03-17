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

<script lang="ts">
import copy from "clipboard-copy";
import { Message } from "element-ui";
import serialize from "serialize-javascript";
import { defineComponent, computed, toRefs } from "@vue/composition-api";

export default defineComponent({
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
  setup(props) {
    const { formAttr, formDesc } = toRefs(props);
    const codeData = computed(() => {
      return Object.assign({}, formAttr.value, {
        formDesc: formDesc.value
      });
    });
    const handleCopyData = () => {
      copy(serialize(codeData.value, { space: 2 }));
      Message.success("复制成功!");
    };
    return {
      codeData,
      handleCopyData
    };
  }
});
</script>
