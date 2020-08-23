const fuzzy = require("fuzzy");
import { objectToArr, arrToObject } from "../../../utils";

export default {
  data() {
    return {
      keyword: ""
    };
  },
  computed: {
    filteredFormDesc() {
      if (this.keyword) {
        // 将 formDesc 转为数组
        const formDescArr = objectToArr(this.formDesc, "field");
        const results = fuzzy
          .filter(this.keyword, formDescArr, {
            extract: item => item.label
          })
          .map(el => el.original);
        return arrToObject(results, "field");
      } else {
        return this.formDesc;
      }
    }
  }
};
