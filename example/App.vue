<template>
  <div>
    <app-header
      @change="pure = !pure"
      :style="{ marginBottom: pure ? '20px' : 0 }"
    />
    <f-render
      @save="handleSave"
      :loading="loading"
      height="calc(100vh - 150px)"
      :config="formConfig"
      v-model="formData"
      :pure="pure"
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
      formData: {},
      pure: false
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
