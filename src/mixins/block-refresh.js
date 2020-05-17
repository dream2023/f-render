// 阻止页面刷新
export default {
  mounted() {
    this.blockHandler = e => {
      e.returnValue = "重新加载此网站？";
      return e;
    };
    window.addEventListener("beforeunload", this.blockHandler);
  },
  beforeDestroy() {
    window.removeEventListener("beforeunload", this.blockHandler);
  }
};
