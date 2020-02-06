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

<script>
import tpl from '@/tpl'
import _ from 'lodash-es'
const copy = require('clipboard-copy')
const serialize = require('serialize-javascript')

export default {
  name: 'htmlDialog',
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
    codeHtml() {
      // 如果是字符串属性值和其它属性值, 一个有 : , 一个没有
      // 例如 {name: 'jack', age: 10} => ['name="jack"', ':age="10"']
      let htmlFormAttr = Object.entries(this.formAttr)
        .map(
          ([key, val]) =>
            (typeof val === 'string' ? '' : ':') + `${key}="${val}"`
        )
        .join('\n    ')

      if (htmlFormAttr.length) {
        htmlFormAttr = htmlFormAttr + '\n    '
      }

      return tpl
        .replace('%1', htmlFormAttr)
        .replace('%2', this.serializeObj(this.formDesc))
    }
  },
  methods: {
    // 复制 html
    handleCopyHtml() {
      copy(this.codeHtml)
      this.$message.success('复制成功!')
    },
    // 序列表对象为字符串
    serializeObj(obj) {
      if (_.isEmpty(obj)) return '{}'
      return serialize(obj, { space: 2 })
        .replace(/"(\w+)":/g, '$1:')
        .replace(/(\s\s)(\S)/g, '      $1$2')
        .replace(/}$/, '      }')
    }
  }
}
</script>
