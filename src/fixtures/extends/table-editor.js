export default {
  type: "table-editor",
  label: "表格内容编辑组件",
  config: {
    url: "https://github.com/dream2023/vue-ele-form-table-editor",
    attrs: {
      config: {
        columns: {
          type: "data-editor",
          label: "table 列",
          required: true,
          attrs: {
            types: ["array", "object"]
          }
        },
        isShowDelete: {
          type: "switch",
          label: "是否显示删除"
        },
        isShowAdd: {
          type: "switch",
          label: "是否显示新增按钮"
        },
        addBtnText: {
          type: "input",
          label: "新增按钮文本"
        },
        newColumnValue: {
          type: "data-editor",
          label: "新增列的值",
          attrs: {
            types: ["object"]
          }
        },
        rules: {
          type: "data-editor",
          label: "校检规则",
          attrs: {
            types: ["object", "array"]
          }
        },
        extraBtns: {
          type: "data-editor",
          label: "右侧其它按钮",
          attrs: {
            types: ["array"]
          }
        },
        deleteBtnAttr: {
          type: "data-editor",
          label: "删除按钮属性",
          attrs: {
            types: ["object"]
          }
        },
        tableAttrs: {
          type: "data-editor",
          label: "表格属性",
          attrs: {
            types: ["object"]
          }
        }
      },
      requiredData: {
        columns: [
          {
            // el-table-column 的属性
            type: "index",
            width: 50
          },
          {
            // el-table-column 的属性
            prop: "grade",
            label: "年级"
          },
          {
            prop: "name",
            label: "姓名",
            content: {
              type: "el-input",
              attrs: {
                placeholder: "学员姓名"
              }
            }
          },
          {
            label: "缴费",
            width: 200,
            content: [
              "已缴纳: ",
              {
                type: "el-input",
                valueKey: "tuition",
                style: {
                  width: "100px",
                  marginRight: "10px"
                }
              }
            ]
          },
          {
            prop: "dream",
            label: "梦想",
            content: {
              type: "el-select",
              options: [
                { text: "科学家", value: "scientist" },
                { text: "警察", value: "policeman" },
                "程序员"
              ]
            }
          }
        ],
        newColumnValue: {
          grade: "三年级二班"
        }
      },
      defaultData: {
        isShowDelete: true,
        deleteBtnAttr: {
          type: "text"
        },
        isShowAdd: true,
        addBtnText: "新增",
        tableAttrs: {
          border: true
        }
      }
    },
    common: {
      config: {
        default: {
          type: "data-editor",
          label: "默认值",
          attrs: {
            types: ["array"]
          }
        }
      },
      requiredData: {
        default: [
          {
            grade: "三年级二班",
            name: "小张",
            sex: 1,
            tuition: 2000,
            unPay: 100,
            dream: ""
          }
        ]
      }
    }
  }
};
