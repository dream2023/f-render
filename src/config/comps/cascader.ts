import { Config } from "@/types/config";

const config: Config = {
  url: "https://element.eleme.cn/#/zh-CN/component/cascader",
  attrs: {
    props: {
      type: "json-editor",
      label: "配置选项"
    },
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
    popperClass: {
      type: "input",
      label: "自定义浮层类名"
    }
  },
  attrsData: {},
  attrsDefaultData: {
    props: {},
    size: null,
    clearable: false,
    showAllLevels: true,
    collapseTags: false,
    separator: "/",
    filterable: false,
    debounce: 300
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
