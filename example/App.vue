<template>
  <div>
    <app-header />
    <f-render
      :comps="comps"
      @save="handleSave"
      :loading="loading"
      height="calc(100vh - 60px)"
      :config="formConfig"
      v-model="formData"
    />
  </div>
</template>

<script>
import AppHeader from "./AppHeader";
import comps from "f-render/fixtures/comps";
import dynamic from "f-render/fixtures/extends/dynamic";

export default {
  components: {
    AppHeader
  },
  data() {
    return {
      comps: comps.concat(dynamic),
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
