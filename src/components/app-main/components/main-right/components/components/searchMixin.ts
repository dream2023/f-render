import _ from "lodash-es";
import { ref, computed, Ref } from "@vue/composition-api";
import { FormDesc } from "@/types/project";
import { filterObjBy, fuzzySearch } from "@/helpers/utils";

export default function(formDesc: Ref<FormDesc>) {
  const keyword = ref("");
  const filterFormDesc = computed(() => {
    if (keyword.value) {
      // 通过 label 进行过滤
      const filterFn = (label: string) => fuzzySearch(label, keyword.value);

      // 深度过滤, 当存在 children 时
      const deepFilter = (obj: FormDesc) => {
        return filterObjBy(obj, (obj: AnyObj) => {
          if (obj.children) {
            obj.children = deepFilter(obj.children);
            return true;
          } else {
            return filterFn(obj.label);
          }
        });
      };

      return deepFilter(_.cloneDeep(formDesc.value));
    } else {
      return formDesc.value;
    }
  });

  return {
    filterFormDesc,
    keyword
  };
}
