import { ref, computed, Ref } from "@vue/composition-api";
import { FormDesc } from "@/types/formList";

export default function(formDesc: Ref<FormDesc>) {
  const keyword = ref("");
  const filterFormDesc = computed(() => {
    if (keyword.value) {
      return Object.keys(formDesc.value).reduce((acc: AnyObj, key) => {
        const fieldHasKeyword = key.includes(keyword.value);
        const labelHasKeyword = formDesc.value[key].label
          ? (formDesc.value[key].label as string).includes(keyword.value)
          : false;
        if (fieldHasKeyword || labelHasKeyword) {
          acc[key] = formDesc.value[key];
        }
        return acc;
      }, {});
    } else {
      return formDesc.value;
    }
  });

  return {
    filterFormDesc,
    keyword
  };
}
