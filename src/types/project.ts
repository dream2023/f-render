import { FormDescData, FormDesc } from "vue-ele-form";

interface FormItem extends FormDescData {
  field: string;
}

type FormItemList = FormItem[];

interface Form {
  id?: string | number;
  name: string;
  formAttr: AnyObj;
  key?: string;
  formItemList: FormItem[];
}

interface Project {
  id?: string | number;
  name: string;
  key?: string;
  formList: Form[];
}

export { FormDescData, FormDesc, FormItemList, FormItem, Form, Project };
