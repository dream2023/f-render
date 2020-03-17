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
    </div>
  </el-dialog>
</template>

<script lang="ts">
import tpl from "@/helpers/tpl";
import _ from "lodash-es";
import copy from "clipboard-copy";
import { Message } from "element-ui";
import serialize from "serialize-javascript";
import { createComponent, computed, toRefs } from "@vue/composition-api";
import { FormDesc } from "@/types/project";

export default createComponent({
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
    const codeHtml = computed(() => {
      // 获取 FormAttr 的字符串
      const getFormAttrStr = (formAttr: AnyObj) => {
        // 如果是字符串属性值和其它属性值, 一个有 : , 一个没有
        // 例如 {name: 'jack', age: 10} => ['name="jack"', ':age="10"']
        let htmlFormAttr = Object.entries(formAttr)
          .map(
            ([key, val]) =>
              (typeof val === "string" ? "" : ":") + `${key}="${val}"`
          )
          .join("\n    ");

        if (htmlFormAttr.length) {
          htmlFormAttr = htmlFormAttr + "\n    ";
        }
        return htmlFormAttr;
      };

      // 获取 formDesc 的字符串
      const getFormDescStr = (formDesc: FormDesc) => {
        if (_.isEmpty(formDesc)) return "{}";
        return serialize(formDesc, { space: 2 })
          .replace(/"(\w+)":/g, "$1:")
          .replace(/(\s\s)(\S)/g, "      $1$2")
          .replace(/}$/, "      }");
      };

      return tpl
        .replace("%1", getFormAttrStr(formAttr.value))
        .replace("%2", getFormDescStr(formDesc.value));
    });

    const handleCopyHtml = () => {
      copy(codeHtml.value);
      Message.success("复制成功!");
    };

    return {
      codeHtml,
      handleCopyHtml
    };
  }
});
</script>
