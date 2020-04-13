<template>
  <el-dialog
    :visible="visible"
    append-to-body
    title="代码"
    v-if="visible"
    @update:visible="$emit('update:visible', $event)"
    width="600px"
  >
    <codemirror :value="codeHtml"></codemirror>
    <div style="text-align: center;margin-top: 20px">
      <el-button @click="handleCopyHtml" type="primary">复制代码</el-button>
      <el-button type="primary"
        ><el-link
          :href="fileURL"
          style="color: white;"
          :underline="false"
          :download="fileName + '.vue'"
          >下载文件</el-link
        ></el-button
      >
    </div>
  </el-dialog>
</template>

<script lang="ts">
import tpl from "./tpl.ejs";
import copy from "clipboard-copy";
import ejs from "ejs";
import { Message } from "element-ui";
import _ from "lodash-es";
import serialize from "serialize-javascript";
import { defineComponent, computed, toRefs } from "@vue/composition-api";
import store from "../../../../store";

export default defineComponent({
  name: "htmlDialog",
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
    const { formDesc, formAttr } = toRefs(props);
    const { currentForm } = toRefs(store.getters);

    // 渲染模板
    const codeHtml = computed(() => {
      // 将  formDesc 转为 字符串
      const getFormDescStr = (formDesc: any) => {
        if (_.isEmpty(formDesc)) return "{}";

        return (
          serialize(formDesc, { space: 2 })
            // 增加空格, {\n   'name': 'zhang'} -> {\n\t  'name': 'zhang'} 保持缩进好看
            .replace(/\n/g, "\n\t  ")
            // 将 key 的引号去掉: '{"name": "zhang"}' -> '{name: "zhang"}'
            .replace(/"(\w+)":/g, "$1:")
        );
      };

      const getFormAttrObj = (formAttr: any) => {
        return Object.entries(formAttr).map(([key, value]) => {
          // 将 [['name', 'zhang'], ['age', 10]] => [{name: 'zhang', ':age': 10}]
          // 因为 vue 模板 非字符串前需要加 : 表示变量
          key = typeof value === "string" ? key : `:${key}`;
          return {
            key,
            value
          };
        });
      };

      return ejs.render(tpl, {
        formAttr: getFormAttrObj(formAttr.value),
        formDesc: getFormDescStr(formDesc.value)
      });
    });

    const fileURL = computed(() => {
      const blob = new Blob([codeHtml.value]);
      return URL.createObjectURL(blob);
    });
    const handleCopyHtml = () => {
      copy(codeHtml.value);
      Message.success("复制成功!");
    };

    return {
      fileName: currentForm.value.name,
      fileURL,
      codeHtml,
      handleCopyHtml
    };
  }
});
</script>
