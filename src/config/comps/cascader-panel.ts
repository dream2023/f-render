import { Config } from "@/types/config";

const config: Config = {
  url: "https://element.eleme.cn/#/zh-CN/component/cascader#ji-lian-mian-ban",
  attrs: {
    props: {
      children: {
        expandTrigger: {
          options: ["click", "hover"],
          label: "次级菜单的展开方式",
          type: "radio",
          default: "click"
        },
        multiple: {
          label: "是否多选",
          type: "switch"
        },
        checkStrictly: {
          label: "是否严格的遵守父子节点不互相关联",
          type: "switch"
        },
        emitPath: {
          label:
            "在选中节点改变时，是否返回由该节点所在的各级菜单的值所组成的数组，若设置 false，则只返回该节点的值",
          type: "switch",
          default: true
        },
        lazy: {
          label: "是否动态加载子节点，需与 lazyLoad 方法结合使用",
          type: "switch"
        },
        value: {
          label: "指定选项的值为选项对象的某个属性值",
          type: "input",
          default: "value"
        },
        label: {
          label: "指定选项标签为选项对象的某个属性值",
          type: "input",
          default: "label"
        },
        children: {
          label: "指定选项的子选项为选项对象的某个属性值",
          type: "input",
          default: "children"
        },
        disabled: {
          label: "指定选项的禁用为选项对象的某个属性值",
          type: "input",
          default: "disabled"
        },
        leaf: {
          label: "指定选项的叶子节点的标志位为选项对象的某个属性值",
          type: "input",
          default: "leaf"
        }
      }
    }
  },
  attrsData: {},
  attrsDefaultData: {
    props: {
      expandTrigger: "click",
      emitPath: true,
      value: "value",
      label: "label",
      children: "children",
      disabled: "disabled",
      leaf: "leaf"
    }
  },
  common: {
    default: {
      type: "cascader",
      label: "默认值",
      isReloadOptions: true,
      options: data => data.options
    },
    options: {
      type: "json-editor",
      label: "选项",
      tip:
        'options支持`API接口`、`数组`、`函数`、`Promise`等, 具体看<a target="_blank" href="https://www.yuque.com/chaojie-vjiel/vbwzgu/rgenav" class="el-link el-link--primary">文档</a>'
    }
  },
  commonData: {
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
  },
  commonDefaultData: {}
};

export default config;
