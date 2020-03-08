import { FormDescData, FormDesc } from "vue-ele-form";

interface FormItem extends FormDescData {
  field: string;
}

type FormItemList = FormItem[];

interface Form {
  id?: string | number;
  name: string;
  formAttr: AnyObj;
  formItemList: FormItem[];
}

interface Project {
  id?: string | number;
  name: string;
  formList: Form[];
}

export { FormDescData, FormDesc, FormItemList, FormItem, Form, Project };
