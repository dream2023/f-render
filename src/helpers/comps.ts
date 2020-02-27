import { Comp } from "@/types/comp";

const comps: Comp[] = [
  {
    type: "input",
    label: "单行输入框"
  },
  {
    type: "textarea",
    label: "多行输入框"
  },
  {
    type: "quill-editor",
    label: "富文本编辑器",
    isExtend: true
  },
  {
    type: "select",
    label: "选择器"
  },
  {
    type: "number",
    label: "数字"
  },
  {
    type: "checkbox",
    label: "复选"
  },
  {
    type: "radio",
    label: "单选"
  },
  {
    type: "switch",
    label: "开关"
  },
  {
    type: "image-uploader",
    label: "上传图片",
    isExtend: true
  },
  {
    type: "date",
    label: "日期"
  },
  {
    type: "daterange",
    label: "日期范围"
  },
  {
    type: "datetime",
    label: "时间和日期"
  },
  {
    type: "datetimerange",
    label: "日期和时间范围"
  },
  {
    type: "time",
    label: "时间"
  },
  {
    type: "timerange",
    label: "时间范围"
  },
  {
    type: "dates",
    label: "多日期"
  },
  {
    type: "week",
    label: "周"
  },
  {
    type: "month",
    label: "月"
  },
  {
    type: "monthrange",
    label: "月范围"
  },
  {
    type: "year",
    label: "年"
  },
  {
    type: "color",
    label: "颜色选择器"
  },
  {
    type: "cascader",
    label: "级联选择器"
  },
  {
    type: "transfer",
    label: "穿梭框"
  },
  {
    type: "cascader-panel",
    label: "级联面板"
  },
  {
    type: "password",
    label: "密码框"
  },
  {
    type: "upload-file",
    label: "文件上传",
    isExtend: true
  },
  {
    type: "yesno",
    label: "是否"
  },
  {
    type: "slider",
    label: "滑块"
  },
  {
    type: "radio-button",
    label: "单选按钮"
  },
  {
    type: "checkbox-button",
    label: "复选按钮"
  },
  {
    type: "autocomplete",
    label: "带建议的输入框"
  },
  {
    type: "rate",
    label: "评分组件"
  },
  {
    type: "image",
    label: "图片展示"
  },
  {
    type: "tag",
    label: "标签"
  },
  {
    type: "text",
    label: "静态文本"
  },
  {
    type: "button",
    label: "按钮"
  },
  {
    type: "video-uploader",
    label: "上传视频",
    isExtend: true
  },
  {
    type: "tree-select",
    label: "树形下拉选择器",
    isExtend: true
  },
  {
    type: "dynamic",
    label: "动态组件",
    isExtend: true
  },
  {
    type: "table-editor",
    label: "表格内容编辑组件",
    isExtend: true
  },
  {
    type: "codemirror",
    label: "代码编辑器",
    isExtend: true
  },
  {
    type: "json-editor",
    label: "JSON编辑器",
    isExtend: true
  },
  {
    type: "markdown-editor",
    label: "markdown编辑器",
    isExtend: true
  },
  {
    type: "bmap",
    label: "地图",
    isExtend: true
  },
  {
    type: "gallery",
    label: "图片及视频展示",
    isExtend: true
  }
];

export default comps;
