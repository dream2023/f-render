import { FormDescData, FormDesc } from "vue-ele-form";

interface FormDescListItem extends FormDescData {
  field: string;
}

type FormDescList = FormDescListItem[];

export { FormDescData, FormDesc, FormDescList, FormDescListItem };
