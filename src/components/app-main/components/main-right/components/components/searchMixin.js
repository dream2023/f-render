import _ from "lodash";
import { filterObjBy, fuzzySearch } from "@/helpers/utils";
export default {
  data() {
    return {
      keyword: ""
    };
  },
  computed: {
    filterFormDesc() {
      if (this.keyword) {
        // 通过 label 进行过滤
        const filterFn = label => fuzzySearch(label, this.keyword);

        // 深度过滤, 当存在 children 时
        const deepFilter = obj => {
          return filterObjBy(obj, obj => {
            if (obj.children) {
              obj.children = deepFilter(obj.children);
              return true;
            } else {
              return filterFn(obj.label);
            }
          });
        };

        return deepFilter(_.cloneDeep(this.formDesc));
      } else {
        return this.formDesc;
      }
    }
  }
};
