export default [
  {
    type: "input",
    label: "单行输入框",
    sort: 1,
    config: {
      url: "https://element.eleme.cn/#/zh-CN/component/input",
      attrs: {
        config: {
          type: {
            type: "input",
            label: "类型",
            attrs: {
              clearable: true
            }
          },
          placeholder: {
            type: "input",
            label: "输入框占位文本",
            attrs: {
              clearable: true
            }
          },
          prefixIcon: {
            type: "input",
            label: "输入框头部图标",
            attrs: {
              clearable: true
            }
          },
          suffixIcon: {
            type: "input",
            label: "输入框尾部图标",
            attrs: {
              clearable: true
            }
          },
          clearable: {
            type: "switch",
            label: "是否可清空"
          },
          minlength: {
            type: "number",
            label: "最小输入长度",
            attrs: {
              min: 0
            }
          },
          maxlength: {
            type: "number",
            label: "最大输入长度",
            attrs: {
              min: 0
            }
          },
          showWordLimit: {
            type: "switch",
            vif: data => data.minlength || data.maxlength,
            label: "是否显示输入字数统计"
          },
          size: {
            type: "select",
            label: "输入框尺寸",
            options: [{ text: "默认", value: null }, "medium", "small", "mini"]
          },
          max: {
            type: "input",
            label: "原生属性，设置最大值",
            attrs: {
              min: 0,
              type: "number",
              clearable: true
            }
          },
          min: {
            type: "input",
            label: "原生属性，设置最小值",
            attrs: {
              min: 0,
              type: "number",
              clearable: true
            }
          },
          resize: {
            type: "select",
            label: "控制是否能被用户缩放",
            options: ["both", "horizontal", "vertical"],
            attrs: {
              clearable: true
            }
          },
          autofocus: {
            type: "switch",
            label: "原生属性，自动获取焦点"
          },
          tabindex: {
            type: "input",
            label: "输入框的tabindex",
            attrs: {
              clearable: true
            }
          },
          validateEvent: {
            type: "switch",
            label: "输入时是否触发表单的校验"
          }
        },
        data: {}
      }
    }
  },
  {
    type: "textarea",
    label: "多行输入框",
    sort: 2,
    config: {
      url: "https://element.eleme.cn/#/zh-CN/component/input#wen-ben-yu",
      attrs: {
        config: {
          placeholder: {
            type: "input",
            label: "输入框占位文本",
            attrs: {
              clearable: true
            }
          },
          rows: {
            type: "input",
            label: "输入框行",
            attrs: {
              type: "number"
            }
          },
          autosizeType: {
            type: "radio",
            label: "自适应内容高度值类型",
            default: "switch",
            options: [
              { text: "自适应", value: "switch" },
              { text: "最大最小值", value: "data-editor" }
            ]
          },
          autosize: {
            type: data => data.autosizeType,
            default: data => {
              if (data.autosizeType === "switch") {
                return false;
              } else {
                return { minRows: 2, maxRows: 6 };
              }
            },
            label: "自适应内容高度配置",
            attrs(data) {
              if (data.autosizeType === "data-editor") {
                return {
                  types: ["object"],
                  rows: 4
                };
              }
            },
            rules: [
              {
                trigger: "blur",
                validator: function(rule, value, callback) {
                  if (typeof value === "object") {
                    if (!value.minRows || !value.maxRows) {
                      callback("对象必须包含 minRows 和 maxRows");
                    }
                  } else if (typeof value !== "boolean") {
                    callback("数据类型不正确");
                  }
                }
              }
            ]
          },
          resize: {
            type: "select",
            label: "控制是否能被用户缩放",
            options: ["both", "horizontal", "vertical"],
            attrs: {
              clearable: true
            }
          },
          showWordLimit: {
            type: "switch",
            label: "是否显示输入字数统计",
            vif: data => data.minlength || data.maxlength
          },
          clearable: {
            type: "switch",
            label: "是否可清空"
          },
          autofocus: {
            type: "switch",
            label: "原生属性，自动获取焦点"
          },
          tabindex: {
            type: "input",
            label: "输入框的tabindex",
            attrs: {
              clearable: true
            }
          },
          validateEvent: {
            type: "switch",
            label: "输入时是否触发表单的校验"
          }
        },
        data: {}
      }
    }
  },
  {
    type: "select",
    label: "选择器",
    sort: 3,
    config: {
      url: "https://element.eleme.cn/#/zh-CN/component/select",
      attrs: {
        config: {
          placeholder: {
            type: "input",
            label: "占位符"
          },
          popperAppendToBody: {
            type: "switch",
            label:
              "是否将弹出框插入至 body 元素。在弹出框的定位出现问题时，可将该属性设置为 false"
          },
          multiple: {
            type: "switch",
            label: "是否多选"
          },
          valueKey: {
            type: "input",
            label: "作为 value 唯一标识的键名，绑定值为对象类型时必填"
          },
          size: {
            type: "select",
            label: "输入框尺寸",
            options: [{ text: "默认", value: null }, "medium", "small", "mini"]
          },
          clearable: {
            type: "switch",
            label: "是否可以清空选项"
          },
          collapseTags: {
            type: "switch",
            label: "多选时是否将选中值按文字的形式展示"
          },
          multipleLimit: {
            type: "number",
            label: "多选时用户最多可以选择的项目数，为 0 则不限制",
            attrs: {
              min: 0
            }
          },
          autocomplete: {
            type: "input",
            label: "select input 的 autocomplete 属性"
          },
          filterable: {
            type: "switch",
            label: "是否可搜索"
          },
          allowCreate: {
            type: "switch",
            label: "是否允许用户创建新条目，需配合 filterable 使用"
          },
          remote: {
            type: "switch",
            label: "是否为远程搜索"
          },
          remoteMethod: {
            type: "data-editor",
            label: "远程搜索方法",
            attrs: {
              types: ["function", "asyncfunction"]
            },
            tip:
              '具体可查看文档：<a target="_blank" href="https://www.yuque.com/chaojie-vjiel/vbwzgu/rgenav#0GZqL" class="el-link el-link--primary">点击查看</a>'
          },
          loadingText: {
            type: "input",
            label: "远程加载时显示的文字"
          },
          noMatchText: {
            type: "input",
            label: '搜索条件无匹配时显示的文字，也可以使用slot="empty"设置'
          },
          noDataText: {
            type: "input",
            label: '选项为空时显示的文字，也可以使用slot="empty"设置'
          },
          popperClass: {
            type: "input",
            label: "Select 下拉框的类名"
          },
          reserveKeyword: {
            type: "switch",
            label: "多选且可搜索时，是否在选中一个选项后保留当前的搜索关键词"
          },
          defaultFirstOption: {
            type: "switch",
            label:
              "在输入框按下回车，选择第一个匹配项。需配合 filterable 或 remote 使用"
          },
          automaticDropdown: {
            type: "switch",
            label:
              "对于不可搜索的 Select，是否在输入框获得焦点后自动弹出选项菜单"
          }
        },
        data: {}
      },
      common: {
        config: {
          default: {
            type: "select",
            label: "默认值",
            prop: data => data.prop,
            optionsLinkageFields: data => data.optionsLinkageFields,
            options: data => data.options
          }
        },
        data: {
          isOptions: true,
          options: [
            { text: "选项1", value: 1 },
            { text: "选项2", value: 2 },
            { text: "选项3", value: 3 }
          ]
        }
      }
    }
  },
  {
    type: "number",
    label: "数字",
    sort: 4,
    config: {
      url: "https://element.eleme.cn/#/zh-CN/component/input-number",
      attrs: {
        config: {
          placeholder: {
            type: "input",
            label: "输入框默认 placeholder"
          },
          min: {
            type: "number",
            label: "最小值"
          },
          max: {
            type: "number",
            label: "最大值"
          },
          step: {
            type: "number",
            label: "步长",
            attrs: {
              min: 0
            }
          },
          stepStrictly: {
            type: "switch",
            label: "是否只能输入 step 的倍数"
          },
          precision: {
            type: "number",
            label: "数值精度",
            attrs: {
              type: "number",
              min: 0
            }
          },
          size: {
            type: "radio",
            label: "计数器尺寸",
            options: [{ text: "默认", value: null }, "large", "small"]
          },
          controls: {
            type: "switch",
            label: "是否使用控制按钮"
          },
          controlsPosition: {
            type: "radio",
            label: "控制按钮位置",
            options: [{ text: "默认", value: null }, "right"]
          }
        },
        data: {}
      },
      common: {
        config: {
          default: {
            type: "number",
            label: "默认值"
          }
        }
      }
    }
  },
  {
    type: "checkbox",
    label: "复选",
    sort: 5,
    config: {
      url: "https://element.eleme.cn/#/zh-CN/component/checkbox",
      attrs: {
        config: {
          size: {
            type: "select",
            label: "多选框组尺寸",
            options: [{ text: "默认", value: null }, "medium", "small", "mini"]
          },
          min: {
            type: "number",
            label: "可被勾选的 Checkbox 的最小数量",
            attrs: {
              min: 0
            }
          },
          max: {
            type: "number",
            label: "可被勾选的 Checkbox 的最大数量",
            attrs: {
              min: 0
            }
          }
        },
        data: {}
      },
      common: {
        config: {
          default: {
            type: "checkbox",
            label: "默认值",
            prop: data => data.prop,
            optionsLinkageFields: data => data.optionsLinkageFields,
            options: data => data.options
          }
        },
        data: {
          isOptions: true,
          options: [
            { text: "选项1", value: 1 },
            { text: "选项2", value: 2 },
            { text: "选项3", value: 3 }
          ]
        }
      }
    }
  },
  {
    type: "radio",
    label: "单选",
    sort: 6,
    config: {
      url: "https://element.eleme.cn/#/zh-CN/component/radio",
      attrs: {
        config: {
          size: {
            type: "select",
            label: "单选框组尺寸",
            options: [{ text: "默认", value: null }, "medium", "small", "mini"]
          }
        },
        data: {}
      },
      common: {
        config: {
          default: {
            type: "radio",
            label: "默认值",
            prop: data => data.prop,
            optionsLinkageFields: data => data.optionsLinkageFields,
            options: data => data.options
          }
        },
        data: {
          isOptions: true,
          options: [
            { text: "选项1", value: 1 },
            { text: "选项2", value: 2 },
            { text: "选项3", value: 3 }
          ]
        }
      }
    }
  },
  {
    type: "switch",
    label: "开关",
    sort: 7,
    config: {
      url: "https://element.eleme.cn/#/zh-CN/component/switch",
      attrs: {
        config: {
          activeColor: {
            type: "color",
            label: "switch 打开时的背景色"
          },
          inactiveColor: {
            type: "color",
            label: "switch 关闭时的背景色"
          },
          width: {
            type: "input",
            label: "switch 的宽度（像素）",
            attrs: {
              min: 1,
              type: "number"
            }
          },
          activeIconClass: {
            type: "input",
            label: "switch 打开时所显示图标的类名，设置此项会忽略 active-text"
          },
          inactiveIconClass: {
            type: "input",
            label: "switch 关闭时所显示图标的类名，设置此项会忽略 inactive-text"
          },
          activeText: {
            type: "input",
            label: "switch 打开时的文字描述"
          },
          activeValue: {
            type: "data-editor",
            label: "switch 打开时的值",
            attrs: {
              types: ["boolean", "number", "string"],
              rows: 2
            }
          },
          inactiveValue: {
            type: "data-editor",
            label: "switch 关闭时的值",
            attrs: {
              types: ["boolean", "number", "string"],
              rows: 2
            }
          },
          inactiveText: {
            type: "input",
            label: "switch 关闭时的文字描述"
          },
          validateEvent: {
            type: "switch",
            label: "改变 switch 状态时是否触发表单的校验"
          }
        },
        data: {}
      },
      common: {
        config: {
          default: {
            type: "data-editor",
            label: "默认值",
            attrs: {
              types: ["boolean", "number", "string"],
              rows: 2
            }
          }
        }
      }
    }
  },
  {
    type: "date",
    label: "日期",
    sort: 8,
    config: {
      url: "https://element.eleme.cn/#/zh-CN/component/date-picker",
      attrs: {
        config: {
          type: {
            type: "select",
            label: "显示类型",
            options: ["year", "month", "date", "week", "datetime"]
          },
          placeholder: {
            type: "input",
            label: "占位内容"
          },
          format: {
            type: "input",
            label: "显示在输入框中的格式"
          },
          clearable: {
            type: "switch",
            label: "是否显示清除按钮"
          },
          editable: {
            type: "switch",
            label: "文本框可输入"
          },
          size: {
            type: "select",
            label: "输入框尺寸",
            options: [{ text: "默认", value: null }, "medium", "small", "mini"]
          },
          popperClass: {
            type: "input",
            label: "DatePicker 下拉框的类名"
          },
          prefixIcon: {
            type: "input",
            label: "自定义头部图标的类名"
          },
          clearIcon: {
            type: "input",
            label: "自定义清空图标的类名"
          },
          readonly: {
            type: "switch",
            label: "完全只读"
          }
        },
        data: {}
      },
      common: {
        config: {
          default: {
            type: "date",
            label: "默认值"
          }
        }
      }
    }
  },
  {
    type: "daterange",
    label: "日期范围",
    sort: 9,
    config: {
      url:
        "https://element.eleme.cn/#/zh-CN/component/date-picker#xuan-ze-ri-qi-fan-wei",
      attrs: {
        config: {
          type: {
            type: "select",
            label: "显示类型",
            options: ["datetimerange", "daterange", "monthrange"]
          },
          startPlaceholder: {
            type: "input",
            label: "范围选择时开始日期的占位内容"
          },
          endPlaceholder: {
            type: "input",
            label: "范围选择时结束日期的占位内容"
          },
          rangeSeparator: {
            type: "input",
            label: "选择范围时的分隔符"
          },
          format: {
            type: "input",
            label: "显示在输入框中的格式"
          },
          valueFormat: {
            type: "input",
            label: "绑定值的格式, 不指定则绑定值为 Date 对象",
            attrs: {
              clearable: true
            }
          },
          clearable: {
            type: "switch",
            label: "是否显示清除按钮"
          },
          editable: {
            type: "switch",
            label: "文本框可输入"
          },
          size: {
            type: "select",
            label: "输入框尺寸",
            options: [{ text: "默认", value: null }, "medium", "small", "mini"]
          },
          unlinkPanels: {
            type: "switch",
            label: "在范围选择器里取消两个日期面板之间的联动"
          },
          align: {
            type: "select",
            label: "对齐方式",
            options: ["left", "center", "right"]
          },
          popperClass: {
            type: "input",
            label: "DatePicker 下拉框的类名"
          },
          prefixIcon: {
            type: "input",
            label: "自定义头部图标的类名"
          },
          clearIcon: {
            type: "input",
            label: "自定义清空图标的类名"
          },
          readonly: {
            type: "switch",
            label: "完全只读"
          },
          validateEvent: {
            type: "switch",
            label: "输入时是否触发表单的校验"
          }
        },
        data: {}
      },
      common: {
        config: {
          default: {
            type: "daterange",
            label: "默认值"
          }
        }
      }
    }
  },
  {
    type: "datetime",
    label: "时间和日期",
    sort: 10,
    config: {
      url: "https://element.eleme.cn/#/zh-CN/component/datetime-picker",
      attrs: {
        config: {
          placeholder: {
            type: "input",
            label: "占位内容"
          },
          format: {
            type: "input",
            label: "显示在输入框中的格式"
          },
          clearable: {
            type: "switch",
            label: "是否显示清除按钮"
          },
          timeArrowControl: {
            type: "switch",
            label: "是否使用箭头进行时间选择"
          },
          editable: {
            type: "switch",
            label: "文本框可输入"
          },
          size: {
            type: "select",
            label: "输入框尺寸",
            options: [{ text: "默认", value: null }, "medium", "small", "mini"]
          },
          popperClass: {
            type: "input",
            label: "DateTimePicker 下拉框的类名"
          },
          prefixIcon: {
            type: "input",
            label: "自定义头部图标的类名"
          },
          clearIcon: {
            type: "input",
            label: "自定义清空图标的类名"
          },
          readonly: {
            type: "switch",
            label: "完全只读"
          }
        },
        data: {}
      },
      common: {
        config: {
          default: {
            type: "datetime",
            label: "默认值"
          }
        }
      }
    }
  },
  {
    type: "datetimerange",
    label: "日期和时间范围",
    sort: 11,
    config: {
      url:
        "https://element.eleme.cn/#/zh-CN/component/datetime-picker#ri-qi-he-shi-jian-fan-wei",
      attrs: {
        config: {
          startPlaceholder: {
            type: "input",
            label: "范围选择时开始日期的占位内容"
          },
          endPlaceholder: {
            type: "input",
            label: "范围选择时结束日期的占位内容"
          },
          rangeSeparator: {
            type: "input",
            label: "选择范围时的分隔符"
          },
          timeArrowControl: {
            type: "switch",
            label: "是否使用箭头进行时间选择"
          },
          format: {
            type: "input",
            label: "显示在输入框中的格式"
          },
          valueFormat: {
            type: "input",
            label: "绑定值的格式, 不指定则绑定值为 Date 对象",
            attrs: {
              clearable: true
            }
          },
          clearable: {
            type: "switch",
            label: "是否显示清除按钮"
          },
          editable: {
            type: "switch",
            label: "文本框可输入"
          },
          size: {
            type: "select",
            label: "输入框尺寸",
            options: [{ text: "默认", value: null }, "medium", "small", "mini"]
          },
          unlinkPanels: {
            type: "switch",
            label: "在范围选择器里取消两个日期面板之间的联动"
          },
          align: {
            type: "select",
            label: "对齐方式",
            options: ["left", "center", "right"]
          },
          popperClass: {
            type: "input",
            label: "DateTimePicker 下拉框的类名"
          },
          prefixIcon: {
            type: "input",
            label: "自定义头部图标的类名"
          },
          clearIcon: {
            type: "input",
            label: "自定义清空图标的类名"
          },
          readonly: {
            type: "switch",
            label: "完全只读"
          },
          validateEvent: {
            type: "switch",
            label: "输入时是否触发表单的校验"
          }
        },
        data: {}
      },
      common: {
        config: {
          default: {
            type: "datetimerange",
            label: "默认值"
          }
        }
      }
    }
  },
  {
    type: "time",
    label: "时间",
    sort: 12,
    config: {
      url: "https://element.eleme.cn/#/zh-CN/component/time-picker",
      attrs: {
        config: {
          placeholder: {
            type: "input",
            label: "占位内容"
          },
          clearable: {
            type: "switch",
            label: "是否显示清除按钮"
          },
          editable: {
            type: "switch",
            label: "文本框可输入"
          },
          size: {
            type: "select",
            label: "输入框尺寸",
            options: [{ text: "默认", value: null }, "medium", "small", "mini"]
          },
          popperClass: {
            type: "input",
            label: "TimePicker 下拉框的类名"
          },
          prefixIcon: {
            type: "input",
            label: "自定义头部图标的类名"
          },
          clearIcon: {
            type: "input",
            label: "自定义清空图标的类名"
          },
          readonly: {
            type: "switch",
            label: "完全只读"
          }
        },
        data: {}
      },
      common: {
        config: {
          default: {
            type: "time",
            label: "默认值"
          }
        }
      }
    }
  },
  {
    type: "time-picker",
    label: "时间Picker",
    sort: 12,
    config: {
      url:
        "https://element.eleme.cn/#/zh-CN/component/time-picker#ren-yi-shi-jian-dian",
      attrs: {
        config: {
          placeholder: {
            type: "input",
            label: "占位内容"
          },
          clearable: {
            type: "switch",
            label: "是否显示清除按钮"
          },
          editable: {
            type: "switch",
            label: "文本框可输入"
          },
          size: {
            type: "select",
            label: "输入框尺寸",
            options: [{ text: "默认", value: null }, "medium", "small", "mini"]
          },
          popperClass: {
            type: "input",
            label: "TimePicker 下拉框的类名"
          },
          prefixIcon: {
            type: "input",
            label: "自定义头部图标的类名"
          },
          clearIcon: {
            type: "input",
            label: "自定义清空图标的类名"
          },
          readonly: {
            type: "switch",
            label: "完全只读"
          }
        },
        data: {}
      },
      common: {
        config: {
          default: {
            type: "time",
            label: "默认值"
          }
        }
      }
    }
  },
  {
    type: "timerange",
    label: "时间范围",
    sort: 13,
    config: {
      url:
        "https://element.eleme.cn/#/zh-CN/component/time-picker#ren-yi-shi-jian-fan-wei",
      attrs: {
        config: {
          startPlaceholder: {
            type: "input",
            label: "范围选择时开始日期的占位内容"
          },
          endPlaceholder: {
            type: "input",
            label: "范围选择时结束日期的占位内容"
          },
          rangeSeparator: {
            type: "input",
            label: "选择范围时的分隔符"
          },
          arrowControl: {
            type: "switch",
            label: "是否使用箭头进行时间选择"
          },
          valueFormat: {
            type: "input",
            label: "绑定值的格式, 不指定则绑定值为 Date 对象",
            attrs: {
              clearable: true
            }
          },
          clearable: {
            type: "switch",
            label: "是否显示清除按钮"
          },
          editable: {
            type: "switch",
            label: "文本框可输入"
          },
          size: {
            type: "select",
            label: "输入框尺寸",
            options: [{ text: "默认", value: null }, "medium", "small", "mini"]
          },
          align: {
            type: "select",
            label: "对齐方式",
            options: ["left", "center", "right"]
          },
          popperClass: {
            type: "input",
            label: "TimePicker 下拉框的类名"
          },
          prefixIcon: {
            type: "input",
            label: "自定义头部图标的类名"
          },
          clearIcon: {
            type: "input",
            label: "自定义清空图标的类名"
          },
          readonly: {
            type: "switch",
            label: "完全只读"
          }
        },
        data: {}
      },
      common: {
        config: {
          default: {
            type: "timerange",
            label: "默认值"
          }
        }
      }
    }
  },
  {
    type: "dates",
    label: "多日期",
    sort: 14,
    config: {
      url: "https://element.eleme.cn/#/zh-CN/component/date-picker",
      attrs: {
        config: {
          placeholder: {
            type: "input",
            label: "占位内容"
          },
          format: {
            type: "input",
            label: "显示在输入框中的格式"
          },
          clearable: {
            type: "switch",
            label: "是否显示清除按钮"
          },
          editable: {
            type: "switch",
            label: "文本框可输入"
          },
          size: {
            type: "select",
            label: "输入框尺寸",
            options: [{ text: "默认", value: null }, "medium", "small", "mini"]
          },
          popperClass: {
            type: "input",
            label: "DatePicker 下拉框的类名"
          },
          prefixIcon: {
            type: "input",
            label: "自定义头部图标的类名"
          },
          clearIcon: {
            type: "input",
            label: "自定义清空图标的类名"
          },
          readonly: {
            type: "switch",
            label: "完全只读"
          }
        },
        data: {}
      },
      common: {
        config: {
          default: {
            type: "dates",
            label: "默认值"
          }
        }
      }
    }
  },
  {
    type: "week",
    label: "周",
    sort: 15,
    config: {
      url: "https://element.eleme.cn/#/zh-CN/component/date-picker",
      attrs: {
        config: {
          placeholder: {
            type: "input",
            label: "占位内容"
          },
          format: {
            type: "input",
            label: "显示在输入框中的格式"
          },
          clearable: {
            type: "switch",
            label: "是否显示清除按钮"
          },
          editable: {
            type: "switch",
            label: "文本框可输入"
          },
          size: {
            type: "select",
            label: "输入框尺寸",
            options: [{ text: "默认", value: null }, "medium", "small", "mini"]
          },
          popperClass: {
            type: "input",
            label: "DatePicker 下拉框的类名"
          },
          prefixIcon: {
            type: "input",
            label: "自定义头部图标的类名"
          },
          clearIcon: {
            type: "input",
            label: "自定义清空图标的类名"
          },
          readonly: {
            type: "switch",
            label: "完全只读"
          }
        },
        data: {}
      },
      common: {
        config: {
          default: {
            type: "week",
            label: "默认值"
          }
        }
      }
    }
  },
  {
    type: "month",
    label: "月",
    sort: 16,
    config: {
      url: "https://element.eleme.cn/#/zh-CN/component/date-picker",
      attrs: {
        config: {
          placeholder: {
            type: "input",
            label: "占位内容"
          },
          format: {
            type: "input",
            label: "显示在输入框中的格式"
          },
          clearable: {
            type: "switch",
            label: "是否显示清除按钮"
          },
          editable: {
            type: "switch",
            label: "文本框可输入"
          },
          size: {
            type: "select",
            label: "输入框尺寸",
            options: [{ text: "默认", value: null }, "medium", "small", "mini"]
          },
          popperClass: {
            type: "input",
            label: "DatePicker 下拉框的类名"
          },
          prefixIcon: {
            type: "input",
            label: "自定义头部图标的类名"
          },
          clearIcon: {
            type: "input",
            label: "自定义清空图标的类名"
          },
          readonly: {
            type: "switch",
            label: "完全只读"
          }
        },
        data: {}
      },
      common: {
        config: {
          default: {
            type: "month",
            label: "默认值"
          }
        }
      }
    }
  },
  {
    type: "monthrange",
    label: "月范围",
    sort: 17,
    config: {
      url:
        "https://element.eleme.cn/#/zh-CN/component/date-picker#xuan-ze-yue-fen-fan-wei",
      attrs: {
        config: {
          startPlaceholder: {
            type: "input",
            label: "范围选择时开始日期的占位内容"
          },
          endPlaceholder: {
            type: "input",
            label: "范围选择时结束日期的占位内容"
          },
          rangeSeparator: {
            type: "input",
            label: "选择范围时的分隔符"
          },
          format: {
            type: "input",
            label: "显示在输入框中的格式"
          },
          valueFormat: {
            type: "input",
            label: "绑定值的格式, 不指定则绑定值为 Date 对象",
            attrs: {
              clearable: true
            }
          },
          clearable: {
            type: "switch",
            label: "是否显示清除按钮"
          },
          editable: {
            type: "switch",
            label: "文本框可输入"
          },
          size: {
            type: "select",
            label: "输入框尺寸",
            options: [{ text: "默认", value: null }, "medium", "small", "mini"]
          },
          unlinkPanels: {
            type: "switch",
            label: "在范围选择器里取消两个日期面板之间的联动"
          },
          align: {
            type: "select",
            label: "对齐方式",
            options: ["left", "center", "right"]
          },
          popperClass: {
            type: "input",
            label: "DatePicker 下拉框的类名"
          },
          prefixIcon: {
            type: "input",
            label: "自定义头部图标的类名"
          },
          clearIcon: {
            type: "input",
            label: "自定义清空图标的类名"
          },
          readonly: {
            type: "switch",
            label: "完全只读"
          },
          validateEvent: {
            type: "switch",
            label: "输入时是否触发表单的校验"
          }
        },
        data: {}
      },
      common: {
        config: {
          default: {
            type: "monthrange",
            label: "默认值"
          }
        }
      }
    }
  },
  {
    type: "year",
    label: "年",
    sort: 18,
    config: {
      url: "https://element.eleme.cn/#/zh-CN/component/date-picker",
      attrs: {
        config: {
          placeholder: {
            type: "input",
            label: "占位内容"
          },
          format: {
            type: "input",
            label: "显示在输入框中的格式"
          },
          clearable: {
            type: "switch",
            label: "是否显示清除按钮"
          },
          editable: {
            type: "switch",
            label: "文本框可输入"
          },
          size: {
            type: "select",
            label: "输入框尺寸",
            options: [{ text: "默认", value: null }, "medium", "small", "mini"]
          },
          popperClass: {
            type: "input",
            label: "DatePicker 下拉框的类名"
          },
          prefixIcon: {
            type: "input",
            label: "自定义头部图标的类名"
          },
          clearIcon: {
            type: "input",
            label: "自定义清空图标的类名"
          },
          readonly: {
            type: "switch",
            label: "完全只读"
          }
        },
        data: {}
      },
      common: {
        config: {
          default: {
            type: "year",
            label: "默认值"
          }
        }
      }
    }
  },
  {
    type: "color",
    label: "颜色选择器",
    sort: 19,
    config: {
      url: "https://element.eleme.cn/#/zh-CN/component/color-picker",
      attrs: {
        config: {
          popperClass: {
            type: "input",
            label: "ColorPicker 下拉框的类名"
          },
          size: {
            type: "select",
            label: "输入框尺寸",
            options: [{ text: "默认", value: null }, "medium", "small", "mini"]
          },
          showAlpha: {
            type: "switch",
            label: "是否支持透明度选择"
          },
          colorFormat: {
            type: "select",
            label: "写入 v-model 的颜色的格式",
            options: ["hsl", "hsv", "hex", "rgb"]
          },
          predefine: {
            type: "data-editor",
            label: "预定义颜色",
            attrs: {
              types: ["array"]
            }
          }
        },
        data: {}
      },
      common: {
        config: {
          default: {
            type: "color",
            label: "默认值"
          }
        }
      }
    }
  },
  {
    type: "cascader",
    label: "级联选择器",
    sort: 20,
    config: {
      url: "https://element.eleme.cn/#/zh-CN/component/cascader",
      attrs: {
        config: {
          showAllLevels: {
            type: "switch",
            label: "输入框中是否显示选中值的完整路径"
          },
          collapseTags: {
            type: "switch",
            label: "多选模式下是否折叠Tag"
          },
          clearable: {
            type: "switch",
            label: "是否可清空"
          },
          placeholder: {
            type: "input",
            label: "输入框占位文本",
            attrs: {
              clearable: true
            }
          },
          size: {
            type: "select",
            label: "输入框尺寸",
            options: [{ text: "默认", value: null }, "medium", "small", "mini"]
          },
          separator: {
            type: "input",
            label: "选项分隔符",
            vif: data => data.showAllLevels
          },
          filterable: {
            type: "switch",
            label: "是否可搜索选项"
          },
          debounce: {
            type: "number",
            label: "搜索关键词输入的去抖延迟，毫秒",
            attrs: {
              min: 0,
              step: 100
            }
          },
          props: {
            type: "data-editor",
            label: "配置选项",
            attrs: {
              types: "object",
              rows: 9
            }
          },
          popperClass: {
            type: "input",
            label: "自定义浮层类名"
          }
        },
        data: {}
      },
      common: {
        config: {
          default: {
            type: "cascader",
            label: "默认值",
            optionsLinkageFields: data => data.optionsLinkageFields,
            options: data => data.options
          }
        },
        data: {
          isOptions: true,
          options: [
            {
              value: "zhinan",
              label: "指南",
              children: [
                {
                  value: "shejiyuanze",
                  label: "设计原则",
                  children: [
                    {
                      value: "yizhi",
                      label: "一致"
                    },
                    {
                      value: "fankui",
                      label: "反馈"
                    },
                    {
                      value: "xiaolv",
                      label: "效率"
                    },
                    {
                      value: "kekong",
                      label: "可控"
                    }
                  ]
                },
                {
                  value: "daohang",
                  label: "导航",
                  children: [
                    {
                      value: "cexiangdaohang",
                      label: "侧向导航"
                    },
                    {
                      value: "dingbudaohang",
                      label: "顶部导航"
                    }
                  ]
                }
              ]
            },
            {
              value: "zujian",
              label: "组件",
              children: [
                {
                  value: "basic",
                  label: "Basic",
                  children: [
                    {
                      value: "layout",
                      label: "Layout 布局"
                    },
                    {
                      value: "color",
                      label: "Color 色彩"
                    },
                    {
                      value: "typography",
                      label: "Typography 字体"
                    },
                    {
                      value: "icon",
                      label: "Icon 图标"
                    },
                    {
                      value: "button",
                      label: "Button 按钮"
                    }
                  ]
                },
                {
                  value: "form",
                  label: "Form",
                  children: [
                    {
                      value: "radio",
                      label: "Radio 单选框"
                    },
                    {
                      value: "checkbox",
                      label: "Checkbox 多选框"
                    },
                    {
                      value: "input",
                      label: "Input 输入框"
                    },
                    {
                      value: "input-number",
                      label: "InputNumber 计数器"
                    },
                    {
                      value: "select",
                      label: "Select 选择器"
                    },
                    {
                      value: "cascader",
                      label: "Cascader 级联选择器"
                    },
                    {
                      value: "switch",
                      label: "Switch 开关"
                    },
                    {
                      value: "slider",
                      label: "Slider 滑块"
                    },
                    {
                      value: "time-picker",
                      label: "TimePicker 时间选择器"
                    },
                    {
                      value: "date-picker",
                      label: "DatePicker 日期选择器"
                    },
                    {
                      value: "datetime-picker",
                      label: "DateTimePicker 日期时间选择器"
                    },
                    {
                      value: "upload",
                      label: "Upload 上传"
                    },
                    {
                      value: "rate",
                      label: "Rate 评分"
                    },
                    {
                      value: "form",
                      label: "Form 表单"
                    }
                  ]
                },
                {
                  value: "data",
                  label: "Data",
                  children: [
                    {
                      value: "table",
                      label: "Table 表格"
                    },
                    {
                      value: "tag",
                      label: "Tag 标签"
                    },
                    {
                      value: "progress",
                      label: "Progress 进度条"
                    },
                    {
                      value: "tree",
                      label: "Tree 树形控件"
                    },
                    {
                      value: "pagination",
                      label: "Pagination 分页"
                    },
                    {
                      value: "badge",
                      label: "Badge 标记"
                    }
                  ]
                },
                {
                  value: "notice",
                  label: "Notice",
                  children: [
                    {
                      value: "alert",
                      label: "Alert 警告"
                    },
                    {
                      value: "loading",
                      label: "Loading 加载"
                    },
                    {
                      value: "message",
                      label: "Message 消息提示"
                    },
                    {
                      value: "message-box",
                      label: "MessageBox 弹框"
                    },
                    {
                      value: "notification",
                      label: "Notification 通知"
                    }
                  ]
                },
                {
                  value: "navigation",
                  label: "Navigation",
                  children: [
                    {
                      value: "menu",
                      label: "NavMenu 导航菜单"
                    },
                    {
                      value: "tabs",
                      label: "Tabs 标签页"
                    },
                    {
                      value: "breadcrumb",
                      label: "Breadcrumb 面包屑"
                    },
                    {
                      value: "dropdown",
                      label: "Dropdown 下拉菜单"
                    },
                    {
                      value: "steps",
                      label: "Steps 步骤条"
                    }
                  ]
                },
                {
                  value: "others",
                  label: "Others",
                  children: [
                    {
                      value: "dialog",
                      label: "Dialog 对话框"
                    },
                    {
                      value: "tooltip",
                      label: "Tooltip 文字提示"
                    },
                    {
                      value: "popover",
                      label: "Popover 弹出框"
                    },
                    {
                      value: "card",
                      label: "Card 卡片"
                    },
                    {
                      value: "carousel",
                      label: "Carousel 走马灯"
                    },
                    {
                      value: "collapse",
                      label: "Collapse 折叠面板"
                    }
                  ]
                }
              ]
            },
            {
              value: "ziyuan",
              label: "资源",
              children: [
                {
                  value: "axure",
                  label: "Axure Components"
                },
                {
                  value: "sketch",
                  label: "Sketch Templates"
                },
                {
                  value: "jiaohu",
                  label: "组件交互文档"
                }
              ]
            }
          ]
        }
      }
    }
  },
  {
    type: "transfer",
    label: "穿梭框",
    sort: 21,
    config: {
      url: "https://element.eleme.cn/#/zh-CN/component/transfer",
      attrs: {
        config: {
          filterable: {
            type: "switch",
            label: "是否可搜索选项"
          },
          filterPlaceholder: {
            type: "input",
            label: "搜索框占位符",
            vif: data => data.filterable
          },
          targetOrder: {
            type: "select",
            label: "右侧列表元素的排序策略",
            options: ["original", "push", "unshift"]
          },
          titles: {
            type: "data-editor",
            label: "自定义列表标题",
            attrs: {
              types: ["array"],
              rows: 4
            }
          },
          buttonTexts: {
            type: "data-editor",
            label: "自定义按钮文案",
            attrs: {
              types: ["array"],
              rows: 4
            }
          },
          format: {
            type: "data-editor",
            label: "列表顶部勾选状态文案",
            attrs: {
              types: ["object"],
              rows: 4
            }
          },
          props: {
            type: "data-editor",
            label: "数据源的字段别名",
            attrs: {
              types: ["object"]
            }
          }
        },
        data: {}
      },
      common: {
        config: {
          default: {
            type: "select",
            label: "默认值",
            prop: data => data.prop,
            optionsLinkageFields: data => data.optionsLinkageFields,
            options: data => {
              return Array.isArray(data.options)
                ? data.options.map(item => ({
                    text: item.label,
                    value: item.key
                  }))
                : data.options;
            },
            attrs: {
              multiple: true
            }
          }
        },
        data: {
          isOptions: true,
          options: [
            { key: 1, label: "选项1" },
            { key: 2, label: "选项3" },
            { key: 3, label: "选项3" },
            { key: 4, label: "选项4" }
          ]
        }
      }
    }
  },
  {
    type: "cascader-panel",
    label: "级联面板",
    sort: 22,
    config: {
      url:
        "https://element.eleme.cn/#/zh-CN/component/cascader#ji-lian-mian-ban",
      attrs: {
        config: {
          props: {
            type: "data-editor",
            label: "配置选项",
            attrs: {
              types: ["object"],
              rows: 10
            }
          }
        },
        data: {}
      },
      common: {
        config: {
          default: {
            type: "cascader",
            label: "默认值",
            optionsLinkageFields: data => data.optionsLinkageFields,
            options: data => data.options
          }
        },
        data: {
          isOptions: true,
          options: [
            {
              value: "zhinan",
              label: "指南",
              children: [
                {
                  value: "shejiyuanze",
                  label: "设计原则",
                  children: [
                    {
                      value: "yizhi",
                      label: "一致"
                    },
                    {
                      value: "fankui",
                      label: "反馈"
                    },
                    {
                      value: "xiaolv",
                      label: "效率"
                    },
                    {
                      value: "kekong",
                      label: "可控"
                    }
                  ]
                },
                {
                  value: "daohang",
                  label: "导航",
                  children: [
                    {
                      value: "cexiangdaohang",
                      label: "侧向导航"
                    },
                    {
                      value: "dingbudaohang",
                      label: "顶部导航"
                    }
                  ]
                }
              ]
            },
            {
              value: "zujian",
              label: "组件",
              children: [
                {
                  value: "basic",
                  label: "Basic",
                  children: [
                    {
                      value: "layout",
                      label: "Layout 布局"
                    },
                    {
                      value: "color",
                      label: "Color 色彩"
                    },
                    {
                      value: "typography",
                      label: "Typography 字体"
                    },
                    {
                      value: "icon",
                      label: "Icon 图标"
                    },
                    {
                      value: "button",
                      label: "Button 按钮"
                    }
                  ]
                },
                {
                  value: "form",
                  label: "Form",
                  children: [
                    {
                      value: "radio",
                      label: "Radio 单选框"
                    },
                    {
                      value: "checkbox",
                      label: "Checkbox 多选框"
                    },
                    {
                      value: "input",
                      label: "Input 输入框"
                    },
                    {
                      value: "input-number",
                      label: "InputNumber 计数器"
                    },
                    {
                      value: "select",
                      label: "Select 选择器"
                    },
                    {
                      value: "cascader",
                      label: "Cascader 级联选择器"
                    },
                    {
                      value: "switch",
                      label: "Switch 开关"
                    },
                    {
                      value: "slider",
                      label: "Slider 滑块"
                    },
                    {
                      value: "time-picker",
                      label: "TimePicker 时间选择器"
                    },
                    {
                      value: "date-picker",
                      label: "DatePicker 日期选择器"
                    },
                    {
                      value: "datetime-picker",
                      label: "DateTimePicker 日期时间选择器"
                    },
                    {
                      value: "upload",
                      label: "Upload 上传"
                    },
                    {
                      value: "rate",
                      label: "Rate 评分"
                    },
                    {
                      value: "form",
                      label: "Form 表单"
                    }
                  ]
                },
                {
                  value: "data",
                  label: "Data",
                  children: [
                    {
                      value: "table",
                      label: "Table 表格"
                    },
                    {
                      value: "tag",
                      label: "Tag 标签"
                    },
                    {
                      value: "progress",
                      label: "Progress 进度条"
                    },
                    {
                      value: "tree",
                      label: "Tree 树形控件"
                    },
                    {
                      value: "pagination",
                      label: "Pagination 分页"
                    },
                    {
                      value: "badge",
                      label: "Badge 标记"
                    }
                  ]
                },
                {
                  value: "notice",
                  label: "Notice",
                  children: [
                    {
                      value: "alert",
                      label: "Alert 警告"
                    },
                    {
                      value: "loading",
                      label: "Loading 加载"
                    },
                    {
                      value: "message",
                      label: "Message 消息提示"
                    },
                    {
                      value: "message-box",
                      label: "MessageBox 弹框"
                    },
                    {
                      value: "notification",
                      label: "Notification 通知"
                    }
                  ]
                },
                {
                  value: "navigation",
                  label: "Navigation",
                  children: [
                    {
                      value: "menu",
                      label: "NavMenu 导航菜单"
                    },
                    {
                      value: "tabs",
                      label: "Tabs 标签页"
                    },
                    {
                      value: "breadcrumb",
                      label: "Breadcrumb 面包屑"
                    },
                    {
                      value: "dropdown",
                      label: "Dropdown 下拉菜单"
                    },
                    {
                      value: "steps",
                      label: "Steps 步骤条"
                    }
                  ]
                },
                {
                  value: "others",
                  label: "Others",
                  children: [
                    {
                      value: "dialog",
                      label: "Dialog 对话框"
                    },
                    {
                      value: "tooltip",
                      label: "Tooltip 文字提示"
                    },
                    {
                      value: "popover",
                      label: "Popover 弹出框"
                    },
                    {
                      value: "card",
                      label: "Card 卡片"
                    },
                    {
                      value: "carousel",
                      label: "Carousel 走马灯"
                    },
                    {
                      value: "collapse",
                      label: "Collapse 折叠面板"
                    }
                  ]
                }
              ]
            },
            {
              value: "ziyuan",
              label: "资源",
              children: [
                {
                  value: "axure",
                  label: "Axure Components"
                },
                {
                  value: "sketch",
                  label: "Sketch Templates"
                },
                {
                  value: "jiaohu",
                  label: "组件交互文档"
                }
              ]
            }
          ]
        }
      }
    }
  },
  {
    type: "password",
    label: "密码框",
    sort: 23,
    config: {
      url: "https://element.eleme.cn/#/zh-CN/component/input#mi-ma-kuang",
      attrs: {
        config: {
          placeholder: {
            type: "input",
            label: "输入框占位文本",
            attrs: {
              clearable: true
            }
          },
          prefixIcon: {
            type: "input",
            label: "输入框头部图标",
            attrs: {
              clearable: true
            }
          },
          suffixIcon: {
            type: "input",
            label: "输入框尾部图标",
            attrs: {
              clearable: true
            }
          },
          clearable: {
            type: "switch",
            label: "是否可清空"
          },
          minlength: {
            type: "number",
            label: "最小输入长度",
            attrs: {
              min: 0
            }
          },
          maxlength: {
            type: "number",
            label: "最大输入长度",
            attrs: {
              min: 0
            }
          },
          showWordLimit: {
            type: "switch",
            label: "是否显示输入字数统计",
            vif: data => data.minlength || data.maxlength
          },
          size: {
            type: "select",
            label: "输入框尺寸",
            options: [{ text: "默认", value: null }, "medium", "small", "mini"]
          },
          autofocus: {
            type: "switch",
            label: "原生属性，自动获取焦点"
          },
          tabindex: {
            type: "input",
            label: "输入框的tabindex",
            attrs: {
              clearable: true
            }
          },
          validateEvent: {
            type: "switch",
            label: "输入时是否触发表单的校验"
          }
        },
        data: {}
      }
    }
  },
  {
    type: "yesno",
    label: "是否",
    sort: 24,
    config: {
      url: "https://www.yuque.com/chaojie-vjiel/vbwzgu/kz163g#y1sNr",
      attrs: {
        config: {
          border: {
            type: "switch",
            label: "是否显示边框"
          },
          size: {
            type: "select",
            label: "Checkbox 的尺寸",
            options: [{ text: "默认", value: null }, "medium", "small", "mini"],
            vif: data => data.border
          },
          indeterminate: {
            type: "switch",
            label: "设置 indeterminate 状态，只负责样式控制"
          }
        },
        data: {}
      },
      common: {
        config: {
          title: {
            type: "input",
            label: "说明文本"
          },
          default: {
            type: "switch",
            label: "默认值"
          }
        },
        data: {
          title: "是否选择"
        }
      }
    }
  },
  {
    type: "slider",
    label: "滑块",
    sort: 25,
    config: {
      url: "https://element.eleme.cn/#/zh-CN/component/slider",
      attrs: {
        config: {
          min: {
            type: "number",
            label: "最小值",
            attrs: {
              min: 0
            }
          },
          max: {
            type: "number",
            label: "最大值",
            attrs: {
              min: 0
            }
          },
          step: {
            type: "number",
            label: "步长",
            attrs: {
              min: 0
            }
          },
          showInput: {
            type: "switch",
            label: "是否显示输入框，仅在非范围选择时有效"
          },
          showInputControls: {
            type: "switch",
            label: "在显示输入框的情况下，是否显示输入框的控制按钮"
          },
          inputSize: {
            type: "select",
            label: "输入框的尺寸",
            options: ["large", "medium", "small", "mini"]
          },
          showStops: {
            type: "switch",
            label: "是否显示间断点"
          },
          showTooltip: {
            type: "switch",
            label: "是否显示 tooltip"
          },
          range: {
            type: "switch",
            label: "是否为范围选择"
          },
          vertical: {
            type: "switch",
            label: "是否竖向模式"
          },
          height: {
            type: "input",
            label: "Slider 高度，竖向模式时必填"
          },
          label: {
            type: "input",
            label: "屏幕阅读器标签"
          },
          debounce: {
            type: "number",
            label: "输入时的去抖延迟，毫秒，仅在show-input等于true时有效",
            attrs: {
              min: 0,
              step: 100
            }
          },
          tooltipClass: {
            type: "input",
            label: "tooltip 的自定义类名"
          },
          marks: {
            type: "data-editor",
            label:
              "标记，key 的类型必须为 number 且取值在闭区间 [min, max] 内，每个标记可以单独设置样式",
            attrs: {
              types: ["object"],
              rows: 4
            }
          }
        },
        data: {}
      },
      common: {
        config: {
          default: {
            type: "number",
            label: "默认值"
          }
        }
      }
    }
  },
  {
    type: "radio-button",
    label: "单选按钮",
    sort: 26,
    config: {
      url: "https://element.eleme.cn/#/zh-CN/component/radio#an-niu-yang-shi",
      attrs: {
        config: {
          size: {
            type: "select",
            label: "单选框组尺寸",
            options: [{ text: "默认", value: null }, "medium", "small", "mini"]
          },
          textColor: {
            type: "color",
            label: "Radio 激活时的文本颜色"
          },
          fill: {
            type: "color",
            label: "Radio 激活时的填充色和边框色"
          }
        },
        data: {}
      },
      common: {
        config: {
          default: {
            type: "radio",
            label: "默认值",
            prop: data => data.prop,
            optionsLinkageFields: data => data.optionsLinkageFields,
            options: data => data.options
          }
        },
        data: {
          isOptions: true,
          options: [
            { text: "选项1", value: 1 },
            { text: "选项2", value: 2 },
            { text: "选项3", value: 3 }
          ]
        }
      }
    }
  },
  {
    type: "checkbox-button",
    label: "复选按钮",
    sort: 27,
    config: {
      url:
        "https://element.eleme.cn/#/zh-CN/component/checkbox#an-niu-yang-shi",
      attrs: {
        config: {
          textColor: {
            type: "color",
            label: "Checkbox 激活时的文本颜色"
          },
          fill: {
            type: "color",
            label: "Checkbox 激活时的填充色和边框色"
          },
          size: {
            type: "select",
            label: "多选框组尺寸",
            options: [{ text: "默认", value: null }, "medium", "small", "mini"]
          },
          min: {
            type: "input",
            label: "可被勾选的 Checkbox 的最小数量",
            attrs: {
              type: "number",
              min: 0
            }
          },
          max: {
            type: "input",
            label: "可被勾选的 Checkbox 的最大数量",
            attrs: {
              type: "number",
              min: 0
            }
          }
        },
        data: {}
      },
      common: {
        config: {
          default: {
            type: "checkbox",
            label: "默认值",
            prop: data => data.prop,
            optionsLinkageFields: data => data.optionsLinkageFields,
            options: data => data.options
          }
        },
        data: {
          isOptions: true,
          options: [
            { text: "选项1", value: 1 },
            { text: "选项2", value: 2 },
            { text: "选项3", value: 3 }
          ]
        }
      }
    }
  },
  {
    type: "autocomplete",
    label: "带建议的输入框",
    sort: 28,
    config: {
      url:
        "https://element.eleme.cn/#/zh-CN/component/input#dai-shu-ru-jian-yi",
      attrs: {
        config: {
          placeholder: {
            type: "input",
            label: "输入框占位文本",
            attrs: {
              clearable: true
            }
          },
          valueKey: {
            type: "input",
            label: "输入建议对象中用于显示的键名",
            attrs: {
              clearable: true
            }
          },
          prefixIcon: {
            type: "input",
            label: "输入框头部图标",
            attrs: {
              clearable: true
            }
          },
          suffixIcon: {
            type: "input",
            label: "输入框尾部图标",
            attrs: {
              clearable: true
            }
          },
          debounce: {
            type: "number",
            label: "获取输入建议的去抖延时",
            attrs: {
              min: 0,
              step: 100
            }
          },
          placement: {
            type: "select",
            label: "菜单弹出位置",
            options: [
              "top",
              "top-start",
              "top-end",
              "bottom",
              "bottom-start",
              "bottom-end"
            ]
          },
          popperClass: {
            type: "input",
            label: "Autocomplete 下拉列表的类名"
          },
          triggerOnFocus: {
            type: "switch",
            label: "是否在输入框 focus 时显示建议列表"
          },
          selectWhenUnmatched: {
            type: "switch",
            label:
              "在输入没有任何匹配建议的情况下，按下回车是否触发 select 事件"
          },
          hideLoading: {
            type: "switch",
            label: "是否隐藏远程加载时的加载图标"
          },
          popperAppendToBody: {
            type: "switch",
            label:
              "是否将下拉列表插入至 body 元素。在下拉列表的定位出现问题时，可将该属性设置为 false"
          },
          highlightFirstItem: {
            type: "switch",
            label: "是否默认突出显示远程搜索建议中的第一项"
          }
        },
        data: {}
      }
    }
  },
  {
    type: "rate",
    label: "评分组件",
    sort: 29,
    config: {
      url: "https://element.eleme.cn/#/zh-CN/component/rate",
      attrs: {
        config: {
          max: {
            type: "number",
            label: "最大分值",
            attrs: {
              min: 0
            }
          },
          allowHalf: {
            type: "switch",
            label: "是否允许半选"
          },
          lowThreshold: {
            type: "number",
            label: "低分和中等分数的界限值，值本身被划分在低分中",
            attrs: {
              min: 0
            }
          },
          highThreshold: {
            type: "number",
            label: "高分和中等分数的界限值，值本身被划分在高分中",
            attrs: {
              min: 0
            }
          },
          colors: {
            type: "data-editor",
            label: "icon 的颜色(3个元素)",
            attrs: {
              types: ["array", "object"],
              rows: 4
            }
          },
          voidColor: {
            type: "color",
            label: "未选中 icon 的颜色"
          },
          disabledVoidColor: {
            type: "color",
            label: "只读时未选中 icon 的颜色"
          },
          iconClasses: {
            type: "data-editor",
            label: "icon 的类名",
            attrs: {
              types: ["array", "object"],
              rows: 4
            }
          },
          voidIconClass: {
            type: "input",
            label: "未选中 icon 的类名"
          },
          disabledVoidIconClass: {
            type: "input",
            label: "只读时未选中 icon 的类名"
          },
          showText: {
            type: "switch",
            label:
              "是否显示辅助文字，若为真，则会从 texts 数组中选取当前分数对应的文字内容"
          },
          showScore: {
            type: "switch",
            label: "是否显示当前分数，show-score 和 show-text 不能同时为真"
          },
          textColor: {
            type: "color",
            label: "辅助文字的颜色"
          },
          texts: {
            type: "data-editor",
            label: "辅助文字数组",
            attrs: {
              types: ["array"]
            }
          },
          scoreTemplate: {
            type: "input",
            label: "分数显示模板"
          }
        },
        data: {}
      },
      common: {
        config: {
          default: {
            type: "number",
            label: "默认值"
          }
        },
        default: {
          default: 0
        }
      }
    }
  },
  {
    type: "image",
    label: "图片展示",
    sort: 30,
    config: {
      url: "https://www.yuque.com/chaojie-vjiel/vbwzgu/kz163g#ld3lx",
      attrs: {
        config: {
          fit: {
            type: "select",
            label: "确定图片如何适应容器框",
            options: ["fill", "contain", "cover", "none", "scale-down"]
          },
          lazy: {
            type: "switch",
            label: "是否开启懒加载"
          },
          scrollContainer: {
            type: "input",
            label: "开启懒加载后，监听 scroll 事件的容器",
            vif: data => data.lazy
          },
          previewSrcList: {
            type: "data-editor",
            label: "图片预览列表",
            attrs: {
              types: ["array"]
            }
          },
          zIndex: {
            type: "number",
            label: "设置图片预览的 z-index"
          }
        },
        data: {}
      },
      common: {
        config: {
          default: {
            type: "dynamic",
            label: "默认值",
            attrs: {
              columns: {
                type: "el-input",
                attrs: {
                  placeholder: "图片链接"
                }
              }
            }
          }
        },
        data: {
          default: [
            "https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg"
          ]
        }
      }
    }
  },
  {
    type: "tag",
    label: "标签",
    sort: 31,
    config: {
      url: "https://www.yuque.com/chaojie-vjiel/vbwzgu/kz163g#ZFYvW",
      attrs: {
        config: {
          placeholder: {
            type: "input",
            label: "占位符"
          },
          popperAppendToBody: {
            type: "switch",
            label:
              "是否将弹出框插入至 body 元素。在弹出框的定位出现问题时，可将该属性设置为 false"
          },
          size: {
            type: "select",
            label: "输入框尺寸",
            options: [{ text: "默认", value: null }, "medium", "small", "mini"]
          },
          clearable: {
            type: "switch",
            label: "是否可以清空选项"
          },
          collapseTags: {
            type: "switch",
            label: "多选时是否将选中值按文字的形式展示"
          },
          multipleLimit: {
            type: "number",
            label: "多选时用户最多可以选择的项目数，为 0 则不限制",
            attrs: {
              min: 0
            }
          },
          popperClass: {
            type: "input",
            label: "Select 下拉框的类名"
          },
          defaultFirstOption: {
            type: "switch",
            label: "在输入框按下回车，选择第一个匹配项"
          },
          automaticDropdown: {
            type: "switch",
            label:
              "对于不可搜索的 Select，是否在输入框获得焦点后自动弹出选项菜单"
          }
        },
        data: {}
      },
      common: {
        config: {
          default: {
            type: "dynamic",
            label: "默认值",
            attrs: {
              columns: {
                type: "el-input",
                attrs: {
                  placeholder: "默认tag"
                }
              }
            }
          }
        }
      }
    }
  },
  {
    type: "text",
    label: "静态文本",
    sort: 32,
    config: {
      url: "https://www.yuque.com/chaojie-vjiel/vbwzgu/kz163g#IGR5Q",
      common: {
        config: {
          default: {
            type: "input",
            label: "默认值"
          }
        },
        data: {
          isOptions: true,
          default: "我是一段静态文本"
        }
      }
    }
  },
  {
    type: "button",
    label: "按钮",
    sort: 33,
    config: {
      url: "https://element.eleme.cn/#/zh-CN/component/button",
      attrs: {
        config: {
          size: {
            type: "select",
            label: "尺寸",
            options: [{ text: "默认", value: null }, "medium", "small", "mini"]
          },
          type: {
            type: "select",
            label: "类型",
            options: [
              { text: "默认", value: null },
              "primary",
              "success",
              "warning",
              "danger",
              "info",
              "text"
            ]
          },
          plain: {
            type: "switch",
            label: "是否朴素按钮"
          },
          round: {
            type: "switch",
            label: "是否圆角按钮"
          },
          circle: {
            type: "switch",
            label: "是否圆形按钮"
          },
          icon: {
            type: "input",
            label: "图标类名",
            attrs: {
              clearable: true
            }
          },
          autofocus: {
            type: "switch",
            label: "是否默认聚焦"
          },
          nativeType: {
            type: "radio",
            label: "原生 type 属性",
            options: ["button", "submit", "reset"]
          }
        },
        data: {}
      },
      common: {
        config: {
          default: {
            type: "input",
            label: "按钮文本"
          }
        },
        data: {
          default: "按钮文本"
        }
      }
    }
  }
];
