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
      <!-- 下载 TODO 检测移入事件 -->
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

import _ from "lodash";
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
      code: "",
      fileURL: "",
      showType: "f-render"
    };
  },
  watch: {
    // 当 showType 变化
    showType() {
      this.setCode();
    },
    // 当 visible 变化时
    visible(val) {
      if (val) {
        this.setCode();
      }
    },
    // 检测 code 当代码变化时，重新生成 URL
    code() {
      // 防抖，最后一次起作用
      if (!this.codeToURL) {
        this.codeToURL = _.debounce(() => {
          // 将代码转为 URL
          const blob = new Blob([this.code]);
          this.fileURL = URL.createObjectURL(blob);
        }, 200);
      }

      this.codeToURL();
    }
  },
  methods: {
    // 设置代码
    setCode() {
      const tpl = this.showType === "f-render" ? FRenderTpl : EleFormTpl;
      this.code = tpl(
        indentString(reomveQuotes(this.frender.getFormConfigStr()), 6).trim()
      );
    },
    // 高亮代码
    highlighter(code) {
      return highlight(code, languages.js);
    },
    // 复制代码
    handleCopyCode() {
      copy(this.code);
      this.$message.success("复制成功!");
    }
  }
};
</script>
