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
import { highlight, languages } from "prismjs/components/prism-core";
import "prismjs/components/prism-clike";
import "prismjs/components/prism-javascript";

import _ from "lodash";
import copy from "clipboard-copy";
import { reomveQuotes, objectToArr } from "../../../utils";

export default {
  inject: ["frender"],
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      code: "",
      fileURL: ""
    };
  },
  watch: {
    visible(val) {
      if (val) {
        this.code = reomveQuotes(this.frender.getFormConfigStr());
      }
    },
    code: {
      handler() {
        // 防抖，最后一次起作用
        if (!this.codeToURL) {
          this.codeToURL = _.debounce(() => {
            // 将代码转为 URL
            const blob = new Blob([this.code]);
            this.fileURL = URL.createObjectURL(blob);
          }, 300);
        }
        this.codeToURL();
      },
      immediate: true
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
        // 将字符串转为对象
        const res = eval("(" + this.code + ")");
        // 判断是否为对象
        if (_.isPlainObject(res)) {
          // 1. 通过解构符合的方式分离出 formDesc 和 formPropsData
          const { formDesc = {}, order = [], ...formPropsData } = res;
          // 2. 赋值 frender.formPropsData
          this.frender.formPropsData = Object.assign(formPropsData, {
            order: order || Object.keys(formDesc)
          });
          // 3. 将 formDesc 转为数组，并赋值给 frender.formItemList
          this.frender.formItemList = objectToArr(formDesc, "field").map(item =>
            Object.assign({ attrs: {} }, item)
          );

          // 关闭弹窗
          this.$emit("change");
        } else {
          // 抛出解析异常
          throw new TypeError(res + ", 类型错误，非对象");
        }
      } catch (err) {
        // 错误提示
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
