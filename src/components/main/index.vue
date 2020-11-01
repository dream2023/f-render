<script>
import MainHeader from "./main-header";
import MainContent from "./main-content";

export default {
  inject: ["frender"],
  components: {
    MainHeader,
    MainContent
  },
  props: {
    loading: Boolean
  },
  render() {
    const slots = this.frender.$scopedSlots;
    const directives = [
      {
        name: "loading",
        value: this.loading
      }
    ];
    return (
      <div>
        {slots["main-header"] ? (
          slots["main-header"]({ frender: this.frender })
        ) : (
          <main-header onSave={() => this.$emit("save")} />
        )}

        {slots["main-content"] ? (
          slots["main-content"]({ frender: this.frender })
        ) : (
          <main-content {...{ directives }} />
        )}
      </div>
    );
  }
};
</script>
