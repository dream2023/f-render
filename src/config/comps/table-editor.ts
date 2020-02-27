import { Config } from "@/types/config";

const config: Config = {
  url: "https://github.com/dream2023/vue-ele-form-table-editor",
  attrs: {
    columns: {
      type: "json-editor",
      label: "table 列",
      required: true
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
      type: "json-editor",
      label: "新增列的值"
    },
    rules: {
      type: "json-editor",
      label: "校检规则"
    },
    extraBtns: {
      type: "json-editor",
      label: "右侧其它按钮"
    },
    deleteBtnAttr: {
      type: "json-editor",
      label: "删除按钮属性"
    },
    tableAttrs: {
      type: "json-editor",
      label: "表格属性"
    }
  },
  attrsData: {
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
        width: 340,
        content: [
          "已缴纳: ",
          {
            type: "el-input",
            valueKey: "tuition",
            style: {
              width: "100px",
              marginRight: "10px"
            }
          },
          "未缴纳: ",
          {
            type: "el-input",
            valueKey: "unPay",
            style: {
              width: "100px"
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
  attrsDefaultData: {
    isShowDelete: true,
    deleteBtnAttr: {
      type: "text"
    },
    isShowAdd: true,
    addBtnText: "新增",
    tableAttrs: {
      border: true
    }
  },
  common: {
    default: {
      type: "json-editor",
      label: "默认值"
    }
  },
  commonData: {
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
  },
  commonDefaultData: {}
};

export default config;
