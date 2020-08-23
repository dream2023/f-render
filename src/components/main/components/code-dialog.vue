<template>
  <el-dialog
    :visible="visible"
    append-to-body
    title="代码"
    @update:visible="$emit('change', $event)"
  >
    <el-radio-group v-model="showType">
      <el-radio label="f-render">f-render方式</el-radio>
      <el-radio label="vue-ele-form">vue-ele-form方式</el-radio>
    </el-radio-group>
    <prism-editor
      class="f-render-code"
      :value="code"
      :highlight="highlighter"
      line-numbers
      readonly
    ></prism-editor>
    <div style="text-align: center;margin-top: 20px">
      <el-button @click="handleCopyCode" type="primary">复制代码</el-button>
      <el-button type="primary"
        ><el-link
          :href="fileURL"
          style="color: white;"
          :underline="false"
          :download="`${Date.now()}.vue`"
          >下载文件</el-link
        ></el-button
      >
      <el-button @click="$emit('change', false)">关闭弹窗</el-button>
    </div>
  </el-dialog>
</template>

<script>
import copy from "clipboard-copy";

import { PrismEditor } from "vue-prism-editor";
import { highlight, languages } from "prismjs/components/prism-core";

import FRenderTpl from "./tpl/f-render";
import EleFormTpl from "./tpl/vue-ele-form";
import serialize from "serialize-javascript";
const indentString = require("indent-string");
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
      showType: "f-render"
    };
  },
  computed: {
    code() {
      // serialize 将对象转为字符串，
      // reomveQuotes 去除 key 的双引号，
      // indentString 增加缩进
      // trim 去除第一行的缩进（第一行不需要）

      const config = this.frender.changedFormConfig;
      const code = indentString(
        reomveQuotes(serialize(config, { space: 2 })),
        6
      ).trim();

      const tpl = this.showType === "f-render" ? FRenderTpl : EleFormTpl;
      return tpl(code);
    },
    fileURL() {
      const blob = new Blob([this.code]);
      return URL.createObjectURL(blob);
    }
  },
  methods: {
    highlighter(code) {
      return highlight(code, languages.js);
    },
    handleCopyCode() {
      copy(this.code);
      this.$message.success("复制成功!");
    }
  }
};
</script>
<style lang="scss">
.f-render-code {
  margin-top: 20px;
  background: #2d2d2d;
  color: #ccc;
  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 5px;
  height: 350px;

  .prism-editor__textarea:focus {
    outline: none;
  }
}
</style>
