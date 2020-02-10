export default {
  data () {
    return {
      // 搜索关键字
      keyword: ''
    }
  },
  computed: {
    // 根据搜过条件过滤
    filterFormDesc () {
      if (this.keyword) {
        return Object.keys(this.formDesc).reduce((acc, key) => {
          if (
            key.includes(this.keyword) ||
            this.formDesc[key].label.includes(this.keyword)
          ) {
            acc[key] = this.formDesc[key]
          }
          return acc
        }, {})
      } else {
        return this.formDesc
      }
    }
  }
}
