import { FormItemList } from "@/types/project";

const list: FormItemList = [
  {
    field: "name",
    type: "input",
    label: "姓名(示例)",
    layout: 12,
    required: true,
    attrs: {}
  },
  {
    field: "age",
    type: "input",
    label: "年龄(示例)",
    layout: 12,
    required: true,
    attrs: {
      type: "number",
      min: 10
    }
  },
  {
    field: "description",
    type: "quill-editor",
    label: "介绍",
    layout: 24,
    attrs: {}
  }
];

export default list;
