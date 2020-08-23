<template>
  <el-dialog
    :visible="visible"
    append-to-body
    title="数据编辑"
    :close-on-click-modal="false"
    @update:visible="$emit('change', $event)"
  >
    <el-alert
      title="数据必须为对象"
      type="warning"
      show-icon
      style="margin-bottom: 20px"
    ></el-alert>
    <prism-editor
      class="f-render-code"
      v-model="code"
      :highlight="highlighter"
      line-numbers
    ></prism-editor>
    <div style="text-align: center;margin-top: 20px">
      <el-button @click="handleChangeCode" type="primary">更改数据</el-button>
      <el-button @click="handleCopyData" type="primary">复制数据</el-button>
      <el-button type="primary"
        ><el-link
          :href="fileURL"
          style="color: white;"
          :underline="false"
          :download="`${Date.now()}.js`"
          >下载数据</el-link
        ></el-button
      >
      <el-button @click="$emit('change', false)">关闭弹窗</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { PrismEditor } from "vue-prism-editor";
import { highlight, languages } from "prismjs/components/prism-core";

import _ from "lodash";
import copy from "clipboard-copy";
import serialize from "serialize-javascript";
import { reomveQuotes } from "../../../utils";

export default {
  inject: ["frender"],
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  components: {
    PrismEditor
  },
  data() {
    return {
      code: ""
    };
  },
  watch: {
    visible(val) {
      if (val) {
        this.code = reomveQuotes(
          serialize(this.frender.changedFormConfig, { space: 2 })
        );
      }
    }
  },
  computed: {
    fileURL() {
      const blob = new Blob([this.code]);
      return URL.createObjectURL(blob);
    }
  },
  methods: {
    // 高亮配置
    highlighter(code) {
      return highlight(code, languages.js);
    },
    // 保存数据
    handleChangeCode() {
      try {
        const res = eval("(" + this.code + ")");
        if (_.isPlainObject(res)) {
          this.frender.updateFormConfig(res);
          this.$emit("change", false);
        } else {
          throw new TypeError(res + ", 类型错误，非对象");
        }
      } catch (err) {
        this.$message.error("解析失败，非 JS 对象，请检查");
        console.error(err);
      }
    },
    // 复制数据
    handleCopyData() {
      copy(this.code);
      this.$message.success("复制成功!");
    }
  }
};
</script>
