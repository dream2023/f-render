export default {
  config: {
    field: {
      type: "input",
      label: "字段名",
      tip: "字段名不可重复",
      rules: {
        type: "string"
      }
    },
    label: {
      type: "input",
      label: "标签"
    },
    layout: {
      type: "slider",
      label: "宽度",
      attrs: {
        min: 1,
        max: 24,
        formatTooltip(val) {
          return `${val} / 24`;
        }
      }
    },
    default: {
      type: "input",
      label: "默认值"
    },
    required: {
      type: "yesno",
      label: "校检",
      title: "是否必填"
    },
    rules: {
      type: "data-editor",
      label: "校检规则",
      title: "新增校检规则",
      default: [],
      attrs: {
        type: ["array", "object"]
      },
      tip:
        '校检规则文档, 请<a target="_blank" href="https://www.yuque.com/chaojie-vjiel/vbwzgu/qzzkpd" class="el-link el-link--primary">点击查看</a>'
    },
    vif: {
      type: "data-editor",
      label: "联动显示/隐藏",
      attrs: {
        types: ["function", "boolean"]
      },
      default: true,
      tip:
        '支持`布尔值`和`函数`，具体请查看：<a target="_blank" href="https://www.yuque.com/chaojie-vjiel/vbwzgu/loffm6#wOVyc" class="el-link el-link--primary">文档</a>'
    },
    disabled: {
      type: "data-editor",
      label: "联动启用/禁用",
      attrs: {
        types: ["function", "boolean", "string"]
      },
      default: false,
      tip:
        '支持`布尔值`和`函数`，具体请查看：<a target="_blank" href="https://www.yuque.com/chaojie-vjiel/vbwzgu/loffm6#zaIsz" class="el-link el-link--primary">文档</a>'
    },
    tip: {
      type: "input",
      label: "表单项提示"
    },
    isShowLabel: {
      label: "否显示标签",
      type: "switch",
      tip: "与全局isShowLabel作用相同"
    },
    labelWidth: {
      label: "标签宽度",
      type: "input",
      tip: "需要以`px`作为单位, 例如`100px`, 默认为全局设置的labelWidth值"
    }
  },
  data: {
    labelWidth: "auto",
    vif: true,
    disabled: false,
    rules: [],
    layout: 24
  }
};
