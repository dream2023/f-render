export default {
  config: {
    inline: {
      type: "radio",
      default: false,
      label: "inline模式 / layout模式",
      options: [
        { text: "layout模式", value: false },
        { text: "inline模式", value: true }
      ]
    },
    isResponsive: {
      type: "switch",
      label: "是否响应式",
      vif: data => !data.inline,
      options: [
        { text: "是", value: true },
        { text: "否", value: false }
      ]
    },
    labelPosition: {
      type: "select",
      label: "标签位置",
      options(data) {
        const options = ["left", "right", "top"];
        if (data.isResponsive && !data.inline) {
          options.unshift({ text: "响应式", value: null });
        }
        return options;
      }
    },
    span: {
      type: "select",
      label: "表单宽度",
      vif: data => !data.inline,
      options(data) {
        const options = Array.from({ length: 24 }, (v, i) => {
          return { text: `${24 - i} / 24`, value: 24 - i };
        });
        if (data.isResponsive) {
          options.unshift({ text: "响应式", value: null });
        }
        return options;
      },
      style: {
        width: "100%"
      }
    },
    isDialog: {
      type: "switch",
      label: "是否为弹窗"
    },
    isShowLabel: {
      type: "switch",
      label: "是否显示标签"
    },
    labelWidth: {
      type: "input",
      label: "标签宽度",
      attrs: {
        type: "number",
        min: 0,
        step: 10
      },
      tip: "默认值为auto"
    },
    disabled: {
      type: "switch",
      label: "全局禁用表单"
    },
    readonly: {
      type: "switch",
      label: "全局只读表单"
    },
    isShowErrorNotify: {
      type: "switch",
      label: "是否在校检错误后显示右上角提示"
    },
    isShowSubmitBtn: {
      type: "radio",
      label: "提交按钮",
      options: [
        { text: "显示", value: true },
        { text: "隐藏", value: false }
      ]
    },
    isShowResetBtn: {
      type: "radio",
      label: "重置按钮",
      options: [
        { text: "显示", value: true },
        { text: "隐藏", value: false }
      ]
    },
    isShowBackBtn: {
      type: "radio",
      label: "返回按钮",
      options: [
        { text: "默认", value: null },
        { text: "显示", value: true },
        { text: "隐藏", value: false }
      ]
    },
    isShowCancelBtn: {
      type: "radio",
      label: "取消按钮",
      options: [
        { text: "默认", value: null },
        { text: "显示", value: true },
        { text: "隐藏", value: false }
      ]
    },
    formBtnSize: {
      type: "select",
      label: "表单按钮大小",
      options: [{ text: "默认", value: null }, "medium", "small", "mini"]
    },
    submitBtnText: {
      type: "input",
      label: "提交按钮文字"
    },
    backBtnText: {
      type: "input",
      label: "返回按钮文字"
    },
    cancelBtnText: {
      type: "input",
      label: "取消按钮文字"
    },
    resetBtnText: {
      type: "input",
      label: "返回按钮文字"
    }
  },
  data: {
    inline: false,
    disabled: false,
    readonly: false,
    isShowLabel: true,
    isDialog: false,
    isShowSubmitBtn: true,
    isShowBackBtn: null,
    isShowResetBtn: false,
    isShowCancelBtn: null,
    isResponsive: true,
    isShowErrorNotify: true,
    submitBtnText: "提交",
    cancelBtnText: "取消",
    backBtnText: "返回",
    resetBtnText: "重置",
    labelWidth: null,
    labelPosition: null,
    span: null,
    formBtnSize: null
  }
};
