<template>
  <div>
    <app-header />
    <f-render
      @save="handleSave"
      :loading="loading"
      height="calc(100vh - 60px)"
      :config="formConfig"
      v-model="formData"
      :options-fn="$axios.get"
    />
  </div>
</template>

<script>
import AppHeader from "./AppHeader";

export default {
  components: {
    AppHeader
  },
  data() {
    return {
      loading: false,
      formConfig: "",
      formData: {}
    };
  },
  methods: {
    handleSave(res) {
      localStorage.setItem("form-config", res);
      this.$message.success("保存成功啦~");
    }
  },
  mounted() {
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
      this.formConfig = localStorage.getItem("form-config") || "";
    }, 1000);
  }
};
</script>
